"""Sync `cluster_id` from the per-dataset SQLite files into Postgres.

Use this after re-running the clustering pipeline against the SQLite
sources in ``fastapi/db/``. The script:

    1. Reads each ``*.db`` in ``fastapi/db/`` and looks up its
       ``datasets`` row by ``db_key`` (the filename without ``.db``).
    2. For every SQLite row, finds the matching Postgres ``places`` row
       in that dataset using a deterministic (name, round(lat, 5),
       round(lng, 5)) key — the same join key used by the ETL.
    3. Updates ``places.cluster_id`` in batches.

Match policy
------------
- The script does **not** insert or delete rows. If a SQLite row has no
  corresponding Postgres row (e.g. it was discarded during the original
  ETL because of bad coordinates), it is reported as ``unmatched`` and
  skipped. Use the regular ETL to ingest brand-new rows first.
- ``cluster_id`` may be NULL or any integer (DBSCAN convention: -1 = noise).
  Whatever the SQLite carries is what Postgres ends up with.

Usage::

    python scripts/sync_cluster_ids.py --dry-run
    python scripts/sync_cluster_ids.py
    python scripts/sync_cluster_ids.py --only Indonesia.Batam.Kuliner.202406162232
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import sys
from collections import Counter
from pathlib import Path
from typing import Any, Iterator

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    def load_dotenv(*_a, **_kw):  # type: ignore[misc]
        return False

import psycopg
from psycopg.rows import dict_row


FASTAPI_ROOT = Path(__file__).resolve().parent.parent
DB_DIR = FASTAPI_ROOT / "db"
ENV_FILE = FASTAPI_ROOT / ".env"
DB_URL_KEYS = ("POSTGRES_URL", "SUPABASE_DB_URL", "DATABASE_URL")
BATCH = 500


def resolve_db_url() -> str:
    if ENV_FILE.exists():
        load_dotenv(ENV_FILE, override=False)
    for k in DB_URL_KEYS:
        v = os.environ.get(k)
        if v:
            return v
    raise SystemExit(
        f"No Postgres URL found. Set one of {', '.join(DB_URL_KEYS)} in fastapi/.env"
    )


def coerce_float(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return float(value) if value == value else None
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
        return int(float(value))
    except (ValueError, TypeError):
        return None


def round_coord(v: float | None) -> float | None:
    return None if v is None else round(v, 5)


def coord_keys(v: float | None) -> tuple[int, ...]:
    """Return integer micro-degree keys ±1 ULP at 5 decimal places.

    Postgres ``real`` is single precision (~6–7 sig digits), so a value
    written by the ETL after ``round(x, 5)`` can read back as either
    ``x`` or ``x ± 1e-5``. Returning a small fan-out lets the index
    lookup find rows that drifted by 1 ULP.
    """
    if v is None:
        return ()
    base = round(v * 100_000)
    return (base - 1, base, base + 1)
def read_sqlite_clusters(db_path: Path) -> Iterator[tuple[str, float, float, int | None]]:
    """Yield (name, lat, lng, cluster_id) tuples for rows that have a usable key."""
    conn = sqlite3.connect(db_path)
    try:
        conn.row_factory = sqlite3.Row
        cur = conn.execute("PRAGMA table_info(places)")
        cols = {r[1] for r in cur.fetchall()}
        if "cluster_id" not in cols:
            print(
                f"  ! {db_path.name} has no cluster_id column — skipping",
                file=sys.stderr,
            )
            return
        for row in conn.execute(
            "SELECT name, latitude, longitude, cluster_id FROM places"
        ):
            name = (row["name"] or "").strip()
            if not name:
                continue
            lat = coerce_float(row["latitude"])
            lng = coerce_float(row["longitude"])
            if lat is None or lng is None:
                continue
            yield name, lat, lng, coerce_int(row["cluster_id"])
    finally:
        conn.close()


def sync(dry_run: bool, only: str | None) -> int:
    if not DB_DIR.exists():
        print(f"ERROR: {DB_DIR} does not exist", file=sys.stderr)
        return 2

    db_files = sorted(p for p in DB_DIR.glob("*.db") if p.is_file())
    if only:
        db_files = [p for p in db_files if p.stem == only]
        if not db_files:
            print(f"ERROR: no .db file matched '{only}'", file=sys.stderr)
            return 2

    if not db_files:
        print(f"  No .db files found under {DB_DIR}")
        return 0

    db_url = resolve_db_url()
    print(f"→ Connecting to {db_url.split('@')[-1]}")

    overall = Counter()
    with psycopg.connect(db_url, autocommit=False, prepare_threshold=None) as conn:
        for path in db_files:
            db_key = path.stem
            print(f"\n→ {path.name}")

            with conn.cursor(row_factory=dict_row) as cur:
                cur.execute(
                    "SELECT id, total_places FROM datasets WHERE db_key = %s",
                    (db_key,),
                )
                ds = cur.fetchone()
                if not ds:
                    print(
                        "   ! no matching dataset row in Postgres — run the ETL first",
                        file=sys.stderr,
                    )
                    overall["missing_dataset"] += 1
                    continue
                dataset_id = ds["id"]
                print(f"   dataset_id={dataset_id}")

                # Build an in-memory index of Postgres places keyed the
                # same way the ETL deduplicates them. The 11k cap on this
                # dataset makes a single scan trivial.
                cur.execute(
                    """
                    SELECT id, place_name, latitude, longitude, cluster_id
                    FROM places
                    WHERE dataset_id = %s
                    """,
                    (dataset_id,),
                )
                index: dict[tuple[str, float | None, float | None], dict[str, Any]] = {}
                for r in cur.fetchall():
                    name = (r["place_name"] or "").lower()
                    if r["latitude"] is None or r["longitude"] is None:
                        continue
                    key = (name, round_coord(r["latitude"]), round_coord(r["longitude"]))
                    index[key] = r

                updates: list[tuple[int | None, int]] = []  # (new_cluster_id, place_id)
                unmatched = 0
                unchanged = 0
                for name, lat, lng, cluster in read_sqlite_clusters(path):
                    key = (name.lower(), round_coord(lat), round_coord(lng))
                    target = index.get(key)
                    if not target:
                        unmatched += 1
                        continue
                    if target["cluster_id"] == cluster:
                        unchanged += 1
                        continue
                    updates.append((cluster, target["id"]))

                # Batch the UPDATE … executemany in chunks so we don't blow
                # past server-side limits on huge datasets.
                for i in range(0, len(updates), BATCH):
                    chunk = updates[i : i + BATCH]
                    cur.executemany(
                        "UPDATE places SET cluster_id = %s, updated_at = now() "
                        "WHERE id = %s",
                        chunk,
                    )

                print(
                    f"   updated={len(updates)}  unchanged={unchanged}  unmatched={unmatched}"
                )
                overall["updated"] += len(updates)
                overall["unchanged"] += unchanged
                overall["unmatched"] += unmatched

        if dry_run:
            print("\n→ Dry run — rolling back")
            conn.rollback()
        else:
            conn.commit()
            print("\n→ Committed.")

    print(
        f"\nSummary: {overall['updated']} updated · "
        f"{overall['unchanged']} already current · "
        f"{overall['unmatched']} not in Postgres"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--only",
        metavar="DB_KEY",
        help="Limit the run to one dataset (filename without .db).",
    )
    args = parser.parse_args()
    return sync(dry_run=args.dry_run, only=args.only)


if __name__ == "__main__":
    raise SystemExit(main())
