"""ETL — backfill the per-dataset Postgres tables from the legacy SQLite files.

Reads every `*.db` in `fastapi/db/`, plus `fastapi/db/custom_metadata.json`
(if present), and:

    1. Upserts a row in `public.datasets` keyed by `db_key`
       (the filename without the `.db` suffix).
    2. Inserts each `places` row into `public.places` with the matching
       `dataset_id`. Skips places already imported for that dataset using a
       deterministic key tuple of (place_name, latitude, longitude).
    3. Updates `datasets.total_places` to the live count.

Usage
-----

    # From the project root (where the .env file lives next to fastapi/):
    python -m fastapi.scripts.etl_sqlite_to_postgres --dry-run
    python -m fastapi.scripts.etl_sqlite_to_postgres

Or from inside ``fastapi/``::

    python scripts/etl_sqlite_to_postgres.py

Configuration
-------------

The script reads the Postgres connection string from
``fastapi/.env`` (preferred) or the shell environment. Supported keys, in
priority order:

    POSTGRES_URL       — preferred, doesn't collide with FastAPI's legacy SQLite-flavoured ``DATABASE_URL``.
    SUPABASE_DB_URL    — alias accepted for convenience.
    DATABASE_URL       — last-resort fallback.

A ready-to-copy template lives at ``fastapi/.env.example``.

The script is **idempotent**: running it twice is safe and only inserts
new rows. It does not touch `places` rows that already match by key.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sqlite3
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    # python-dotenv ships transitively via pydantic-settings; if it's
    # genuinely missing we degrade to "shell-env only" instead of crashing.
    def load_dotenv(*_args: Any, **_kwargs: Any) -> bool:  # type: ignore[misc]
        return False

try:
    import psycopg  # psycopg 3
    from psycopg.rows import dict_row
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "psycopg (v3) is required. Install with:\n"
        "    pip install 'psycopg[binary]>=3.2'\n"
    ) from exc


# ---------------------------------------------------------------------------
# Constants & helpers
# ---------------------------------------------------------------------------

# fastapi/scripts/etl_sqlite_to_postgres.py → fastapi/
FASTAPI_ROOT = Path(__file__).resolve().parent.parent
DB_DIR = FASTAPI_ROOT / "db"
CUSTOM_METADATA_PATH = DB_DIR / "custom_metadata.json"
ENV_FILE = FASTAPI_ROOT / ".env"

# Connection string env-var lookup order. POSTGRES_URL is preferred so the
# ETL can coexist with FastAPI's legacy SQLite-flavoured DATABASE_URL until
# PR-E swaps the API over.
DB_URL_ENV_KEYS = ("POSTGRES_URL", "SUPABASE_DB_URL", "DATABASE_URL")

# Quick lookup so backfill rows have a non-NULL province by default.
PROVINCE_BY_CITY = {
    "Batam": "Kepulauan Riau",
    "Jakarta": "DKI Jakarta",
    "Surabaya": "Jawa Timur",
    "Bandung": "Jawa Barat",
    "Medan": "Sumatera Utara",
    "Makassar": "Sulawesi Selatan",
}

# Filename layout: Country.City.Category.YYYYMMDDHHMM.db
FILENAME_RE = re.compile(
    r"^(?P<country>[^.]+)\.(?P<city>[^.]+)\.(?P<category>.+)\.(?P<stamp>\d{8,12})$"
)


@dataclass
class DatasetMeta:
    db_key: str
    project_name: str
    country: str
    province: str | None
    city: str
    category: str
    source_category: str | None
    scraped_at: datetime | None


# ---------------------------------------------------------------------------
# Filename parsing
# ---------------------------------------------------------------------------


def parse_filename(name_no_ext: str) -> DatasetMeta:
    """Parse `Indonesia.Batam.Kuliner.202406162232` into a metadata payload.

    Falls back to safe defaults when the filename does not match the
    expected layout — we never want the ETL to crash because of one
    weirdly named file.
    """
    match = FILENAME_RE.match(name_no_ext)
    if match:
        country = match.group("country")
        city = match.group("city")
        category = match.group("category")
        stamp = match.group("stamp")
    else:
        parts = name_no_ext.split(".")
        country = parts[0] if len(parts) > 0 else "Unknown"
        city = parts[1] if len(parts) > 1 else "Unknown"
        category = parts[2] if len(parts) > 2 else "Unknown"
        stamp = parts[3] if len(parts) > 3 else "202401010000"

    scraped_at: datetime | None = None
    try:
        if len(stamp) >= 12:
            scraped_at = datetime.strptime(stamp[:12], "%Y%m%d%H%M").replace(
                tzinfo=timezone.utc
            )
        elif len(stamp) >= 8:
            scraped_at = datetime.strptime(stamp[:8], "%Y%m%d").replace(
                tzinfo=timezone.utc
            )
    except ValueError:
        scraped_at = None

    province = PROVINCE_BY_CITY.get(city)

    return DatasetMeta(
        db_key=name_no_ext,
        project_name=f"{category} Dataset - {city}",
        country=country,
        province=province,
        city=city,
        category=category,
        source_category=category,
        scraped_at=scraped_at,
    )


def load_custom_metadata() -> dict[str, dict[str, Any]]:
    if not CUSTOM_METADATA_PATH.exists():
        return {}
    try:
        with CUSTOM_METADATA_PATH.open("r", encoding="utf-8") as fh:
            data = json.load(fh)
        return data if isinstance(data, dict) else {}
    except (OSError, json.JSONDecodeError) as exc:
        print(f"  ! Could not read custom_metadata.json: {exc}", file=sys.stderr)
        return {}


def apply_custom_overrides(meta: DatasetMeta, custom: dict[str, Any]) -> DatasetMeta:
    return DatasetMeta(
        db_key=meta.db_key,
        project_name=custom.get("project_name", meta.project_name),
        country=custom.get("country", meta.country),
        province=custom.get("province", meta.province),
        city=custom.get("city", meta.city),
        category=custom.get("category", meta.category),
        source_category=meta.source_category,
        scraped_at=meta.scraped_at,
    )


# ---------------------------------------------------------------------------
# SQLite reader
# ---------------------------------------------------------------------------


def coerce_float(value: Any) -> float | None:
    """The legacy SQLite `places.latitude` / `longitude` columns are TEXT.

    Some rows contain blanks or stringified locale numbers. Always coerce to
    a finite float, returning ``None`` when the value cannot be parsed.
    """
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value) if value == value else None  # NaN guard
    if isinstance(value, str):
        s = value.strip().replace(",", ".")
        if not s:
            return None
        try:
            n = float(s)
        except ValueError:
            return None
        return n if n == n else None
    return None


def coerce_int(value: Any) -> int | None:
    if value is None or value == "":
        return None
    try:
        return int(float(value))  # tolerate "4.0" strings
    except (ValueError, TypeError):
        return None


def read_places(db_path: Path) -> Iterator[dict[str, Any]]:
    conn = sqlite3.connect(db_path)
    try:
        conn.row_factory = sqlite3.Row
        cur = conn.execute("PRAGMA table_info(places)")
        cols = {row[1] for row in cur.fetchall()}
        if not {"name", "latitude", "longitude"} <= cols:
            print(
                f"  ! {db_path.name} is missing required columns "
                "(name/latitude/longitude) — skipping",
                file=sys.stderr,
            )
            return
        for row in conn.execute("SELECT * FROM places"):
            yield {k: row[k] for k in row.keys()}
    finally:
        conn.close()


# ---------------------------------------------------------------------------
# Postgres ETL
# ---------------------------------------------------------------------------

UPSERT_DATASET_SQL = """
INSERT INTO datasets (
    db_key, project_name, country, province, city, category,
    source_category, scraped_at, status, total_places
) VALUES (
    %(db_key)s, %(project_name)s, %(country)s, %(province)s, %(city)s,
    %(category)s, %(source_category)s, %(scraped_at)s, 'active', 0
)
ON CONFLICT (db_key) DO UPDATE SET
    project_name    = EXCLUDED.project_name,
    country         = EXCLUDED.country,
    province        = EXCLUDED.province,
    city            = EXCLUDED.city,
    category        = EXCLUDED.category,
    source_category = COALESCE(datasets.source_category, EXCLUDED.source_category),
    scraped_at      = COALESCE(datasets.scraped_at, EXCLUDED.scraped_at),
    updated_at      = now()
RETURNING id;
"""

EXISTING_KEYS_SQL = """
SELECT place_name, latitude, longitude
FROM places
WHERE dataset_id = %(dataset_id)s
"""

INSERT_PLACE_SQL = """
INSERT INTO places (
    dataset_id, place_name, category, latitude, longitude,
    price_level, rating, review_count, url,
    services, address, open_hours, phone,
    cluster_id,
    is_deleted, imported_at
) VALUES (
    %(dataset_id)s, %(place_name)s, %(category)s, %(latitude)s, %(longitude)s,
    %(price_level)s, %(rating)s, %(review_count)s, %(url)s,
    %(services)s, %(address)s, %(open_hours)s, %(phone)s,
    %(cluster_id)s,
    false, %(imported_at)s
)
"""

UPDATE_TOTAL_SQL = """
UPDATE datasets
SET total_places = (
    SELECT count(*) FROM places
    WHERE places.dataset_id = datasets.id
      AND places.is_deleted = false
),
    updated_at = now()
WHERE id = %(dataset_id)s
"""


def round_coord(value: float | None) -> float | None:
    """Match the duplicate-detection precision used by the import wizard."""
    if value is None:
        return None
    return round(value, 5)


def resolve_database_url() -> str | None:
    """Find the Postgres connection string in the environment or `.env`.

    Loads ``fastapi/.env`` if it exists (without overriding values already
    set in the shell), then probes the supported env-var names in order.
    """
    if ENV_FILE.exists():
        load_dotenv(ENV_FILE, override=False)

    for key in DB_URL_ENV_KEYS:
        value = os.environ.get(key)
        if value:
            return value
    return None


def run(dry_run: bool = False) -> int:
    database_url = resolve_database_url()
    if not database_url:
        print(
            "ERROR: No Postgres connection string found.\n"
            f"Set one of {', '.join(DB_URL_ENV_KEYS)} in `{ENV_FILE.name}` "
            "(see `.env.example`) or in your shell environment.",
            file=sys.stderr,
        )
        return 2

    if not DB_DIR.exists():
        print(f"ERROR: {DB_DIR} does not exist", file=sys.stderr)
        return 2

    db_files = sorted(p for p in DB_DIR.glob("*.db") if p.is_file())
    if not db_files:
        print(f"  No .db files found under {DB_DIR}")
        return 0

    custom_metadata = load_custom_metadata()
    inserted_total = 0
    skipped_total = 0

    print(f"→ Connecting to Postgres ({database_url.split('@')[-1]})")
    with psycopg.connect(database_url, autocommit=False) as conn:
        for path in db_files:
            name_no_ext = path.stem
            meta = parse_filename(name_no_ext)
            override = custom_metadata.get(name_no_ext, {})
            if isinstance(override, dict):
                meta = apply_custom_overrides(meta, override)

            print(f"\n→ {path.name}")
            print(
                f"   db_key={meta.db_key}  city={meta.city}  category={meta.category}"
            )

            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute(
                    UPSERT_DATASET_SQL,
                    {
                        "db_key": meta.db_key,
                        "project_name": meta.project_name,
                        "country": meta.country,
                        "province": meta.province,
                        "city": meta.city,
                        "category": meta.category,
                        "source_category": meta.source_category,
                        "scraped_at": meta.scraped_at,
                    },
                )
                row = cur.fetchone()
                assert row is not None
                dataset_id = row["id"]
                print(f"   dataset_id={dataset_id}")

                # Existing keys — used to skip rows already imported.
                cur.execute(EXISTING_KEYS_SQL, {"dataset_id": dataset_id})
                existing: set[tuple[str, float | None, float | None]] = {
                    (
                        (r["place_name"] or "").lower(),
                        round_coord(r["latitude"]),
                        round_coord(r["longitude"]),
                    )
                    for r in cur.fetchall()
                }

                inserted = 0
                skipped = 0
                imported_at = datetime.now(timezone.utc)

                for raw in read_places(path):
                    place_name = (raw.get("name") or "").strip() or None
                    if not place_name:
                        skipped += 1
                        continue

                    lat = coerce_float(raw.get("latitude"))
                    lng = coerce_float(raw.get("longitude"))
                    if lat is None or lng is None:
                        skipped += 1
                        continue

                    key = (place_name.lower(), round_coord(lat), round_coord(lng))
                    if key in existing:
                        skipped += 1
                        continue
                    existing.add(key)

                    cur.execute(
                        INSERT_PLACE_SQL,
                        {
                            "dataset_id": dataset_id,
                            "place_name": place_name,
                            "category": (raw.get("category") or "Unknown").strip(),
                            "latitude": lat,
                            "longitude": lng,
                            "price_level": coerce_int(raw.get("price_level")),
                            "rating": coerce_float(raw.get("rating")),
                            "review_count": coerce_int(raw.get("review")),
                            "url": (raw.get("url") or None) or None,
                            "services": raw.get("services") or None,
                            "address": raw.get("address") or None,
                            "open_hours": raw.get("open_hours") or None,
                            "phone": raw.get("phone") or None,
                            "cluster_id": coerce_int(raw.get("cluster_id")),
                            "imported_at": imported_at,
                        },
                    )
                    inserted += 1

                cur.execute(UPDATE_TOTAL_SQL, {"dataset_id": dataset_id})

            inserted_total += inserted
            skipped_total += skipped
            print(f"   inserted={inserted}  skipped={skipped}")

        if dry_run:
            print("\n→ Dry run — rolling back transaction")
            conn.rollback()
        else:
            conn.commit()
            print("\n→ Committed.")

    print(
        f"\nDone. {len(db_files)} dataset(s); "
        f"{inserted_total} place(s) inserted; {skipped_total} skipped."
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run the ETL inside a transaction that is rolled back at the end. "
        "Useful for previewing the work without writing.",
    )
    args = parser.parse_args()
    return run(dry_run=args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())
