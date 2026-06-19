"""Sync trained ``cluster_id`` values into Supabase Postgres.

The source of truth is each dataset's current feature store:

    <ARTIFACTS_DIR>/runs/<db_key>/data/feature_store.csv

Rows are matched inside the corresponding dataset using a deterministic
``(case-folded name, latitude rounded to 5 decimals, longitude rounded to
5 decimals)`` key. Feature-store row IDs are intentionally not used because
they originate in per-dataset SQLite databases while Postgres IDs are global.

Only non-null cluster IDs from the feature store are written. Existing values
for places absent from the feature store are left unchanged.

Usage:

    python scripts/sync_cluster_ids.py --dry-run
    python scripts/sync_cluster_ids.py
    python scripts/sync_cluster_ids.py --only Indonesia.Bali.Restaurant.202409221411
"""

from __future__ import annotations

import argparse
import csv
import os
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover

    def load_dotenv(*_args: Any, **_kwargs: Any) -> bool:
        return False

import psycopg
from psycopg.rows import dict_row


FASTAPI_ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = FASTAPI_ROOT / ".env"
DB_URL_KEYS = ("POSTGRES_URL", "SUPABASE_DB_URL", "DATABASE_URL")
BATCH_SIZE = 500
COORDINATE_DECIMALS = 5

PlaceKey = tuple[str, int, int]


def load_environment() -> None:
    if ENV_FILE.exists():
        load_dotenv(ENV_FILE, override=False)


def resolve_db_url() -> str:
    for key in DB_URL_KEYS:
        value = os.environ.get(key)
        if value:
            return value
    raise SystemExit(
        f"No Postgres URL found. Set one of {', '.join(DB_URL_KEYS)} in "
        f"{ENV_FILE}."
    )


def resolve_runs_dir(value: str | None) -> Path:
    configured = value or os.environ.get("ARTIFACTS_DIR") or "artifacts"
    artifacts_dir = Path(configured).expanduser()
    if not artifacts_dir.is_absolute():
        artifacts_dir = FASTAPI_ROOT / artifacts_dir
    return artifacts_dir.resolve() / "runs"


def coerce_float(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, (int, float)):
        number = float(value)
        return number if number == number else None
    text = str(value).strip().replace(",", ".")
    if not text:
        return None
    try:
        number = float(text)
    except ValueError:
        return None
    return number if number == number else None


def coerce_int(value: Any) -> int | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    try:
        return int(float(text))
    except (TypeError, ValueError):
        return None


def place_key(name: Any, latitude: Any, longitude: Any) -> PlaceKey | None:
    normalized_name = str(name or "").strip().casefold()
    lat = coerce_float(latitude)
    lng = coerce_float(longitude)
    if not normalized_name or lat is None or lng is None:
        return None
    scale = 10**COORDINATE_DECIMALS
    return (
        normalized_name,
        round(lat * scale),
        round(lng * scale),
    )


def load_feature_clusters(
    feature_store_path: Path,
) -> tuple[dict[PlaceKey, int], Counter[str]]:
    cluster_sets: dict[PlaceKey, set[int]] = defaultdict(set)
    stats: Counter[str] = Counter()

    with feature_store_path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        required = {"name", "latitude", "longitude", "cluster_id"}
        missing = required - set(reader.fieldnames or ())
        if missing:
            raise ValueError(
                f"{feature_store_path} is missing columns: {', '.join(sorted(missing))}"
            )

        for row in reader:
            stats["source_rows"] += 1
            cluster_id = coerce_int(row.get("cluster_id"))
            key = place_key(
                row.get("name"),
                row.get("latitude"),
                row.get("longitude"),
            )
            if cluster_id is None:
                stats["null_cluster"] += 1
                continue
            if key is None:
                stats["invalid_key"] += 1
                continue
            cluster_sets[key].add(cluster_id)
            stats["valid_rows"] += 1

    clusters: dict[PlaceKey, int] = {}
    for key, values in cluster_sets.items():
        if len(values) != 1:
            stats["conflicting_keys"] += 1
            continue
        clusters[key] = next(iter(values))

    stats["source_keys"] = len(cluster_sets)
    stats["usable_keys"] = len(clusters)
    stats["duplicate_rows"] = stats["valid_rows"] - stats["source_keys"]
    return clusters, stats


def sync(
    *,
    dry_run: bool,
    only: str | None,
    runs_dir: Path,
) -> int:
    if not runs_dir.is_dir():
        print(f"ERROR: artifacts runs directory does not exist: {runs_dir}", file=sys.stderr)
        return 2

    db_url = resolve_db_url()
    print(f"Connecting to {db_url.split('@')[-1]}")
    print(f"Feature stores: {runs_dir}")

    overall: Counter[str] = Counter()
    with psycopg.connect(
        db_url,
        autocommit=False,
        prepare_threshold=None,
        row_factory=dict_row,
    ) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, db_key FROM datasets ORDER BY db_key")
            datasets = cur.fetchall()

            if only:
                datasets = [row for row in datasets if row["db_key"] == only]
                if not datasets:
                    print(f"ERROR: no Supabase dataset matched '{only}'", file=sys.stderr)
                    return 2

            for dataset in datasets:
                db_key = dataset["db_key"]
                dataset_id = dataset["id"]
                feature_store_path = runs_dir / db_key / "data" / "feature_store.csv"
                print(f"\n{db_key}")

                if not feature_store_path.is_file():
                    print("  skipped: feature_store.csv not found")
                    overall["missing_artifact"] += 1
                    continue

                clusters, source_stats = load_feature_clusters(feature_store_path)

                cur.execute(
                    """
                    SELECT id, place_name, latitude, longitude, cluster_id
                    FROM places
                    WHERE dataset_id = %s
                      AND is_deleted = false
                    """,
                    (dataset_id,),
                )
                places = cur.fetchall()
                target_index: dict[PlaceKey, list[dict[str, Any]]] = defaultdict(list)
                for place in places:
                    key = place_key(
                        place["place_name"],
                        place["latitude"],
                        place["longitude"],
                    )
                    if key is not None:
                        target_index[key].append(place)

                updates: list[tuple[int, int, Any]] = []
                unchanged = 0
                unmatched = 0
                ambiguous = 0

                for key, cluster_id in clusters.items():
                    candidates = target_index.get(key, ())
                    if not candidates:
                        unmatched += 1
                        continue
                    if len(candidates) != 1:
                        ambiguous += 1
                        continue

                    target = candidates[0]
                    if target["cluster_id"] == cluster_id:
                        unchanged += 1
                        continue
                    updates.append((cluster_id, target["id"], dataset_id))

                for start in range(0, len(updates), BATCH_SIZE):
                    cur.executemany(
                        """
                        UPDATE places
                        SET cluster_id = %s,
                            updated_at = NOW()
                        WHERE id = %s
                          AND dataset_id = %s
                          AND is_deleted = false
                        """,
                        updates[start : start + BATCH_SIZE],
                    )

                print(
                    "  "
                    f"artifact_rows={source_stats['source_rows']} "
                    f"usable_keys={source_stats['usable_keys']} "
                    f"updated={len(updates)} "
                    f"unchanged={unchanged} "
                    f"unmatched={unmatched} "
                    f"ambiguous={ambiguous} "
                    f"conflicting_keys={source_stats['conflicting_keys']}"
                )
                overall["datasets_synced"] += 1
                overall["updated"] += len(updates)
                overall["unchanged"] += unchanged
                overall["unmatched"] += unmatched
                overall["ambiguous"] += ambiguous
                overall["conflicting_keys"] += source_stats["conflicting_keys"]

        if dry_run:
            conn.rollback()
            print("\nDry run complete; all updates were rolled back.")
        else:
            conn.commit()
            print("\nCommitted.")

    print(
        "\nSummary: "
        f"{overall['datasets_synced']} datasets synced, "
        f"{overall['updated']} updated, "
        f"{overall['unchanged']} already current, "
        f"{overall['unmatched']} unmatched, "
        f"{overall['ambiguous']} ambiguous, "
        f"{overall['conflicting_keys']} conflicting source keys, "
        f"{overall['missing_artifact']} missing artifacts"
    )
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Execute all matching and updates, then roll back the transaction.",
    )
    parser.add_argument(
        "--only",
        metavar="DB_KEY",
        help="Limit the run to one Supabase dataset.",
    )
    parser.add_argument(
        "--artifacts-dir",
        help="Override ARTIFACTS_DIR from fastapi/.env.",
    )
    args = parser.parse_args()

    load_environment()
    return sync(
        dry_run=args.dry_run,
        only=args.only,
        runs_dir=resolve_runs_dir(args.artifacts_dir),
    )


if __name__ == "__main__":
    raise SystemExit(main())
