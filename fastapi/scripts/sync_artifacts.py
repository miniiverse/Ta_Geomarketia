"""sync_artifacts.py — copy per-run training artifacts into the API's artifact store.

Usage
-----
Run from the ``fastapi/`` directory:

    python scripts/sync_artifacts.py --db Indonesia.Batam.Kuliner.202406162232
    python scripts/sync_artifacts.py --db Indonesia.Batam.Kuliner.202406162232 --source /custom/path
    python scripts/sync_artifacts.py --all          # sync every run that exists in the source
    python scripts/sync_artifacts.py --all --active-only
    python scripts/sync_artifacts.py --all --dry-run

Workflow
--------
1. Data scientist runs the training notebook in ``geomarketia-train/``.
2. Run this script to copy the artifacts the API needs into
   ``<ARTIFACTS_DIR>/runs/<db_key>/``.
3. Call ``POST /api/v1/<db_key>/model/sync-db`` to write ``cluster_id``
   values from the feature store into Postgres.

What gets copied
----------------
Only the files the API actually reads are copied — large intermediate files
(``rejected_rows.csv``, ``db_with_cluster/*.db``) are intentionally excluded.

    data/
        feature_store.csv
        base_candidate_grid.parquet
        category_distribution.json
        category_distribution_valid.json   (if present)
    models/
        clustering_metadata.json
        regression_metadata.json
        rf_metadata.json
        active.json
        reg_location_reco_v*.joblib         (all versions)
        rf_location_reco_v*.joblib          (legacy versions)
    reports/
        clustering_result.png
        clustering_map.png
        clustering_top_clusters.png
        cluster_vs_noise.png
        category_distribution_top10.png
        model_comparison.csv
        model_comparison.png
        reg_shap_importance.csv
        reg_shap_summary.png
        rf_confusion_matrix.png
        rf_shap_summary.png
        rf_shap_waterfall.png
        rf_shap_importance.csv
        k_distance_graph.png               (if present)
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Resolve project root so the script works from any CWD
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
FASTAPI_DIR = SCRIPT_DIR.parent

# Add fastapi/ to sys.path so we can import app.core.config
sys.path.insert(0, str(FASTAPI_DIR))

# Load .env before importing settings
try:
    from dotenv import load_dotenv
    load_dotenv(FASTAPI_DIR / ".env")
except ImportError:
    pass  # python-dotenv not installed — rely on real env vars

from app.core.config import RUNS_PATH  # noqa: E402  (after sys.path setup)

# ---------------------------------------------------------------------------
# Files to copy per sub-directory
# ---------------------------------------------------------------------------
DATA_FILES = [
    "feature_store.csv",
    "base_candidate_grid.parquet",
    "category_distribution.json",
    "category_distribution_valid.json",
]

MODEL_FILES = [
    "clustering_metadata.json",
    "regression_metadata.json",
    "rf_metadata.json",
    "active.json",
]
# All versioned regression and legacy RF joblib files are copied dynamically.

REPORT_FILES = [
    "clustering_result.png",
    "clustering_map.png",
    "clustering_top_clusters.png",
    "cluster_vs_noise.png",
    "category_distribution_top10.png",
    "model_comparison.csv",
    "model_comparison.png",
    "reg_shap_importance.csv",
    "reg_shap_summary.png",
    "rf_confusion_matrix.png",
    "rf_shap_summary.png",
    "rf_shap_waterfall.png",
    "rf_shap_importance.csv",
    "k_distance_graph.png",
]


# ---------------------------------------------------------------------------
# Core copy logic
# ---------------------------------------------------------------------------

def _copy_file(src: Path, dst: Path, dry_run: bool) -> bool:
    """Copy *src* to *dst*, creating parent dirs as needed.

    Returns True if the file was copied (or would be in dry-run mode).
    """
    if not src.exists():
        return False
    if dry_run:
        print(f"  [dry-run] would copy: {src.name}")
        return True
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    return True


def _versioned_model_files(models_dir: Path, active_only: bool) -> list[Path]:
    """Return model files to sync, preferring the active pointer when requested."""
    if not models_dir.exists():
        return []

    if active_only:
        active_path = models_dir / "active.json"
        if active_path.exists():
            try:
                active_version = json.loads(active_path.read_text(encoding="utf-8")).get("active_version")
                if active_version is not None:
                    for family in ("reg", "rf"):
                        candidate = models_dir / f"{family}_location_reco_v{active_version}.joblib"
                        if candidate.exists():
                            return [candidate]
            except (OSError, ValueError, TypeError):
                pass

        regression = sorted(models_dir.glob("reg_location_reco_v*.joblib"))
        legacy = sorted(models_dir.glob("rf_location_reco_v*.joblib"))
        candidates = regression or legacy
        return candidates[-1:] if candidates else []

    files: list[Path] = []
    for pattern in ("reg_location_reco_v*.joblib", "rf_location_reco_v*.joblib"):
        files.extend(sorted(models_dir.glob(pattern)))
    return files


def sync_run(
    db_key: str,
    source_root: Path,
    dest_root: Path,
    dry_run: bool,
    active_only: bool = False,
) -> dict:
    """Sync one run from *source_root*/<db_key>/ to *dest_root*/<db_key>/."""
    src_run = source_root / db_key
    dst_run = dest_root / db_key

    if not src_run.exists():
        return {"db_key": db_key, "status": "error", "error": f"Source not found: {src_run}"}

    stats = {"copied": 0, "skipped": 0, "errors": []}

    # ── data/ ────────────────────────────────────────────────────────────
    for fname in DATA_FILES:
        ok = _copy_file(src_run / "data" / fname, dst_run / "data" / fname, dry_run)
        if ok:
            stats["copied"] += 1
        else:
            stats["skipped"] += 1

    # ── models/ — fixed files ────────────────────────────────────────────
    for fname in MODEL_FILES:
        ok = _copy_file(src_run / "models" / fname, dst_run / "models" / fname, dry_run)
        if ok:
            stats["copied"] += 1
        else:
            stats["skipped"] += 1

    # ── models/ — active-only or all versioned joblib files ─────────────
    src_models = src_run / "models"
    for joblib_file in _versioned_model_files(src_models, active_only=active_only):
        ok = _copy_file(joblib_file, dst_run / "models" / joblib_file.name, dry_run)
        if ok:
            stats["copied"] += 1
        else:
            stats["skipped"] += 1

    # Reports support admin/QA endpoints but are not required for inference.
    if not active_only:
        for fname in REPORT_FILES:
            ok = _copy_file(src_run / "reports" / fname, dst_run / "reports" / fname, dry_run)
            if ok:
                stats["copied"] += 1
            else:
                stats["skipped"] += 1

    return {
        "db_key": db_key,
        "status": "dry-run" if dry_run else "success",
        "copied": stats["copied"],
        "skipped": stats["skipped"],
        "dest": str(dst_run),
    }


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Sync per-run training artifacts from the training repo into the API artifact store.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--db",
        metavar="DB_KEY",
        help="Single db_key to sync (e.g. Indonesia.Batam.Kuliner.202406162232)",
    )
    group.add_argument(
        "--all",
        action="store_true",
        help="Sync every run directory found in the source root",
    )
    parser.add_argument(
        "--source",
        metavar="PATH",
        default=None,
        help=(
            "Source root containing runs/<db_key>/ directories. "
            "Defaults to <ARTIFACTS_DIR> (resolved from Settings.ARTIFACTS_DIR). "
            "Override to point at a different training repo checkout."
        ),
    )
    parser.add_argument(
        "--dest",
        metavar="PATH",
        default=None,
        help=(
            "Destination root. Defaults to <ARTIFACTS_DIR>/runs/ "
            "(same as the API reads from). Only override for testing."
        ),
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be copied without actually copying anything.",
    )
    parser.add_argument(
        "--active-only",
        action="store_true",
        help="Copy only the model selected by active.json for each database.",
    )
    args = parser.parse_args()

    # Resolve source and destination
    from app.core.config import ARTIFACTS_PATH

    source_root: Path = Path(args.source).resolve() if args.source else ARTIFACTS_PATH
    dest_root: Path = Path(args.dest).resolve() if args.dest else RUNS_PATH

    source_runs = source_root / "runs"
    if not source_runs.exists():
        print(f"ERROR: Source runs directory not found: {source_runs}", file=sys.stderr)
        sys.exit(1)

    # Determine which db_keys to process
    if args.db:
        db_keys = [args.db]
    else:
        db_keys = sorted(d.name for d in source_runs.iterdir() if d.is_dir())
        if not db_keys:
            print(f"No run directories found in {source_runs}", file=sys.stderr)
            sys.exit(1)

    print(f"Source : {source_runs}")
    print(f"Dest   : {dest_root}")
    print(f"Runs   : {len(db_keys)}")
    if args.dry_run:
        print("Mode   : DRY RUN (nothing will be written)\n")
    else:
        print()

    total_copied = total_skipped = 0
    for db_key in db_keys:
        print(f"-- {db_key}")
        result = sync_run(
            db_key,
            source_runs,
            dest_root,
            dry_run=args.dry_run,
            active_only=args.active_only,
        )
        if result["status"] == "error":
            print(f"   ERROR: {result['error']}")
        else:
            print(f"   copied={result['copied']}  skipped={result['skipped']}  -> {result['dest']}")
            total_copied += result["copied"]
            total_skipped += result["skipped"]

    print(f"\nDone. Total copied={total_copied}  skipped={total_skipped}")
    if not args.dry_run:
        print("\nNext step: POST /api/v1/<db_key>/model/sync-db to write cluster_id into Postgres.")


if __name__ == "__main__":
    main()
