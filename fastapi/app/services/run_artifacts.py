"""Per-run artifact loader for the geomarketia-train pipeline outputs.

Every public function in this module reads from the filesystem path:

    <ARTIFACTS_DIR>/runs/<db_key>/{data,models,reports}/

where ``ARTIFACTS_DIR`` is configured via ``Settings.ARTIFACTS_DIR``
(see ``app.core.config``).  For local development this typically points
at the sibling ``geomarketia-train/content/`` checkout; for production it
should point at a synced copy produced by ``scripts/sync_artifacts.py``.

Caching strategy
----------------
Heavy files (feature_store.csv, joblib models) are cached in a module-level
dict keyed on ``(db_name, file_mtime_ns)``.  When the file changes on disk
the mtime changes, the old entry is evicted, and the new file is loaded.
Lightweight JSON/CSV files (< 100 KB) are re-read on every call — they are
fast enough that caching adds no measurable benefit.

Model resolution order (same as the original recommendation.py)
---------------------------------------------------------------
1. API-trained per-db models in ``<ARTIFACTS_DIR>/runs/<db_key>/models/``
   — checked via ``active.json`` pointer first, then latest by filename.
2. Training-repo per-db run models (same directory, different producer).
3. Legacy global models in ``<ARTIFACTS_DIR>/models/`` (pre-per-db era).
"""

from __future__ import annotations

import glob
import json
import logging
import os
from pathlib import Path
from typing import Any

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

from app.core.config import ARTIFACTS_PATH, RUNS_PATH

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

# Canonical 19-column schema produced by the training notebook (Tahap 8).
# Any feature store that deviates from this set raises a ValueError at load
# time so notebook-API drift is caught immediately.
FEATURE_STORE_REQUIRED_COLS: frozenset[str] = frozenset(
    {
        "id", "name", "category",
        "latitude", "longitude", "x_utm", "y_utm",
        "cluster_id", "dist_to_cluster_centroid_m",
        "competitor_density_500m", "competitor_density_1km",
        "same_category_density_500m", "nearest_neighbor_dist_m",
        "rating", "review_log",
    }
)

# Report images that may be served via the admin API.
# Any name not in this set is rejected to prevent path traversal.
REPORT_WHITELIST: frozenset[str] = frozenset(
    {
        "clustering_result.png",
        "cluster_vs_noise.png",
        "category_distribution_top10.png",
        "rf_confusion_matrix.png",
        "rf_shap_summary.png",
        "rf_shap_waterfall.png",
        "k_distance_graph.png",
    }
)

# ---------------------------------------------------------------------------
# Module-level caches
# ---------------------------------------------------------------------------

# feature_store cache: (db_name, mtime_ns) → pd.DataFrame
_fs_cache: dict[tuple[str, int], pd.DataFrame] = {}

# joblib model cache: (path_str, mtime_ns) → RandomForestClassifier
_model_cache: dict[tuple[str, int], RandomForestClassifier] = {}


# ---------------------------------------------------------------------------
# Path helpers
# ---------------------------------------------------------------------------

def run_dir(db_name: str) -> Path:
    """Return the per-run root directory for *db_name*.

    Does **not** assert the directory exists — callers should use
    :func:`has_run` when they need a hard guarantee.
    """
    return RUNS_PATH / db_name


def has_run(db_name: str) -> bool:
    """Return True when *db_name* has a complete training run.

    A run is considered complete when both the feature store CSV and the
    RF metadata JSON are present.
    """
    rd = run_dir(db_name)
    return (
        (rd / "data" / "feature_store.csv").exists()
        and (rd / "models" / "rf_metadata.json").exists()
    )


def list_runs() -> list[str]:
    """Return every ``db_key`` that has a complete training run, sorted."""
    if not RUNS_PATH.exists():
        return []
    return sorted(
        d.name
        for d in RUNS_PATH.iterdir()
        if d.is_dir() and has_run(d.name)
    )


def report_path(db_name: str, name: str) -> Path:
    """Return the absolute path to a whitelisted report image.

    Raises
    ------
    ValueError
        If *name* is not in :data:`REPORT_WHITELIST`.
    FileNotFoundError
        If the file does not exist on disk.
    """
    if name not in REPORT_WHITELIST:
        raise ValueError(
            f"'{name}' is not a whitelisted report name. "
            f"Allowed: {sorted(REPORT_WHITELIST)}"
        )
    p = run_dir(db_name) / "reports" / name
    if not p.exists():
        raise FileNotFoundError(f"Report not found: {p}")
    return p


# ---------------------------------------------------------------------------
# Feature store
# ---------------------------------------------------------------------------

def feature_store(db_name: str) -> pd.DataFrame:
    """Load and cache the feature store CSV for *db_name*.

    The DataFrame is cached by ``(db_name, file_mtime_ns)``.  When the
    notebook produces a new run the mtime changes and the cache is
    automatically invalidated on the next call.

    Raises
    ------
    FileNotFoundError
        If the feature store CSV does not exist.
    ValueError
        If the CSV is missing required columns (notebook-API drift guard).
    """
    path = run_dir(db_name) / "data" / "feature_store.csv"
    if not path.exists():
        raise FileNotFoundError(
            f"Feature store not found for '{db_name}': {path}. "
            "Run the training notebook or scripts/sync_artifacts.py first."
        )

    mtime = path.stat().st_mtime_ns
    cache_key = (db_name, mtime)

    if cache_key not in _fs_cache:
        # Evict any stale entry for this db_name
        stale = [k for k in _fs_cache if k[0] == db_name]
        for k in stale:
            del _fs_cache[k]

        df = pd.read_csv(path, low_memory=False)

        # Drift guard — fail loudly if the notebook changed the schema
        missing = FEATURE_STORE_REQUIRED_COLS - set(df.columns)
        if missing:
            raise ValueError(
                f"Feature store for '{db_name}' is missing required columns: "
                f"{sorted(missing)}. Re-run the training notebook."
            )

        # Normalise types that sometimes come out as object from CSV
        for col in ("cluster_id",):
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors="coerce")

        _fs_cache[cache_key] = df
        logger.debug(f"Loaded feature store for '{db_name}': {len(df)} rows")

    return _fs_cache[cache_key]


# ---------------------------------------------------------------------------
# JSON metadata files
# ---------------------------------------------------------------------------

def clustering_metadata(db_name: str) -> dict[str, Any]:
    """Return the parsed ``clustering_metadata.json`` for *db_name*.

    Raises
    ------
    FileNotFoundError
        If the file does not exist.
    """
    path = run_dir(db_name) / "models" / "clustering_metadata.json"
    if not path.exists():
        raise FileNotFoundError(
            f"clustering_metadata.json not found for '{db_name}': {path}"
        )
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def rf_metadata(db_name: str) -> dict[str, Any]:
    """Return the parsed ``rf_metadata.json`` for *db_name*.

    Raises
    ------
    FileNotFoundError
        If the file does not exist.
    """
    path = run_dir(db_name) / "models" / "rf_metadata.json"
    if not path.exists():
        raise FileNotFoundError(
            f"rf_metadata.json not found for '{db_name}': {path}"
        )
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def category_distribution(db_name: str) -> dict[str, Any]:
    """Return category distribution data for *db_name*.

    Merges two files when both are present:
    - ``category_distribution_valid.json`` — post-validation counts (preferred)
    - ``category_distribution.json`` — raw counts (fallback)

    Returns a dict with keys ``top10`` (list, max 10 entries) and ``all``
    (full list, sorted descending by count).

    Raises
    ------
    FileNotFoundError
        If neither distribution file exists.
    """
    data_dir = run_dir(db_name) / "data"
    valid_path = data_dir / "category_distribution_valid.json"
    raw_path = data_dir / "category_distribution.json"

    if valid_path.exists():
        with valid_path.open("r", encoding="utf-8") as f:
            records = json.load(f)
    elif raw_path.exists():
        with raw_path.open("r", encoding="utf-8") as f:
            records = json.load(f)
    else:
        raise FileNotFoundError(
            f"No category distribution file found for '{db_name}' in {data_dir}"
        )

    # Normalise: the notebook writes [{Kategori, Jumlah}] or [{category, valid_rows}]
    normalised: list[dict[str, Any]] = []
    for rec in records:
        cat = rec.get("Kategori") or rec.get("category") or rec.get("kategori") or "Unknown"
        count = rec.get("Jumlah") or rec.get("valid_rows") or rec.get("count") or 0
        normalised.append({"category": str(cat), "count": int(count)})

    normalised.sort(key=lambda x: x["count"], reverse=True)
    return {"top10": normalised[:10], "all": normalised}


def shap_importance(db_name: str) -> pd.DataFrame:
    """Return the SHAP global importance CSV as a DataFrame.

    Columns: ``feature``, ``mean_abs_shap`` (sorted descending).

    Raises
    ------
    FileNotFoundError
        If the CSV does not exist.
    """
    # The notebook writes this to reports/, not models/
    path = run_dir(db_name) / "reports" / "rf_shap_importance.csv"
    if not path.exists():
        raise FileNotFoundError(
            f"rf_shap_importance.csv not found for '{db_name}': {path}"
        )
    df = pd.read_csv(path)
    # Normalise column names — notebook writes 'feature' and 'mean_abs_shap'
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
    if "feature" not in df.columns or "mean_abs_shap" not in df.columns:
        # Try to infer: first col = feature, second = importance
        cols = df.columns.tolist()
        df = df.rename(columns={cols[0]: "feature", cols[1]: "mean_abs_shap"})
    return df.sort_values("mean_abs_shap", ascending=False).reset_index(drop=True)


# ---------------------------------------------------------------------------
# Model loading (P2.3 — migrated from recommendation.py)
# ---------------------------------------------------------------------------

def _load_model_cached(model_path: str) -> RandomForestClassifier:
    """Load a joblib model, using the mtime-keyed cache."""
    p = Path(model_path)
    if not p.exists():
        raise FileNotFoundError(f"Model file not found: {model_path}")
    mtime = p.stat().st_mtime_ns
    cache_key = (model_path, mtime)
    if cache_key not in _model_cache:
        stale = [k for k in _model_cache if k[0] == model_path]
        for k in stale:
            del _model_cache[k]
        _model_cache[cache_key] = joblib.load(model_path)
        logger.debug(f"Loaded model from {model_path}")
    return _model_cache[cache_key]


def get_latest_model(
    db_name: str,
) -> tuple[RandomForestClassifier | None, dict[str, Any] | None]:
    """Return the best available trained model and its metadata dict.

    Resolution order
    ----------------
    1. API-trained per-db models in ``<ARTIFACTS_DIR>/runs/<db_key>/models/``
       — ``active.json`` pointer checked first, then latest by filename.
    2. Training-repo per-db run models (same directory layout, different
       producer — the notebook).
    3. Legacy global models in ``<ARTIFACTS_DIR>/models/`` (pre-per-db era).

    Returns ``(None, None)`` when no model is found anywhere.
    """
    # ── 1 & 2: per-db run directory (API-trained and notebook-trained share
    #           the same layout under runs/<db_key>/models/) ──────────────
    run_models_dir = run_dir(db_name) / "models"
    if run_models_dir.exists():
        # Active pointer takes priority
        active_ptr = run_models_dir / "active.json"
        if active_ptr.exists():
            try:
                with active_ptr.open("r", encoding="utf-8") as f:
                    active_version = json.load(f).get("active_version")
                if active_version is not None:
                    model_path = str(run_models_dir / f"rf_location_reco_v{active_version}.joblib")
                    if Path(model_path).exists():
                        meta = _read_json_safe(run_models_dir / "rf_metadata.json")
                        return _load_model_cached(model_path), meta
            except Exception as exc:
                logger.warning(f"Could not read active.json for '{db_name}': {exc}")

        # Fall back to highest-numbered version
        candidates = sorted(
            glob.glob(str(run_models_dir / "rf_location_reco_v*.joblib"))
        )
        if candidates:
            latest = candidates[-1]
            meta = _read_json_safe(run_models_dir / "rf_metadata.json")
            try:
                return _load_model_cached(latest), meta
            except Exception as exc:
                logger.error(f"Error loading model '{latest}': {exc}")

    # ── 3. Legacy global models ──────────────────────────────────────────
    legacy_dir = ARTIFACTS_PATH / "models"
    if legacy_dir.exists():
        candidates = sorted(
            glob.glob(str(legacy_dir / "rf_location_reco_v*.joblib"))
        )
        if candidates:
            latest = candidates[-1]
            meta = _read_json_safe(legacy_dir / "rf_metadata.json")
            try:
                logger.info(f"Using legacy global model for '{db_name}': {latest}")
                return _load_model_cached(latest), meta
            except Exception as exc:
                logger.error(f"Error loading legacy model '{latest}': {exc}")

    return None, None


def _read_json_safe(path: Path) -> dict[str, Any]:
    """Read a JSON file, returning an empty dict on any error."""
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


# ---------------------------------------------------------------------------
# Feature-store summary (for admin QA endpoint)
# ---------------------------------------------------------------------------

def feature_store_summary(db_name: str, head_n: int = 5) -> dict[str, Any]:
    """Return a lightweight summary of the feature store for QA purposes."""
    df = feature_store(db_name)
    return {
        "db_name": db_name,
        "rows": len(df),
        "columns": df.columns.tolist(),
        "dtypes": {col: str(dtype) for col, dtype in df.dtypes.items()},
        "null_counts": df.isnull().sum().to_dict(),
        "head": df.head(head_n).to_dict(orient="records"),
    }
