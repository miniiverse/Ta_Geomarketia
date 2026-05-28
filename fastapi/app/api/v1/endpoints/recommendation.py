"""Recommendation endpoints — feature-store-driven location scoring with SHAP.

Phase 3 changes (vs Phase 1/2)
-------------------------------
- ``recommend_location`` now sources ALL spatial features from the per-run
  ``feature_store.csv`` instead of recomputing them from raw Postgres rows.
- DBSCAN is no longer re-run at serving time.  Cluster centroids are derived
  from the feature store's ``cluster_id`` column, and the per-run ``eps_meter``
  from ``clustering_metadata.json`` is used as the noise threshold.
- Hotspot KDE is fitted on feature-store coordinates (bandwidth=500 m, matching
  ``geomarketia_train.ipynb`` Tahap 9.1).
- Density features (competitor, same-category, nearest-neighbour) are computed
  via BallTree on feature-store coordinates — identical to the notebook.
- Degenerate runs (``n_clusters == 0``, e.g. Hotel) return HTTP 422 with a
  heuristic-only fallback score so the frontend can still render something.
- ``build_features`` is kept for the ``/model/retrain`` background task which
  still needs to engineer features from raw Postgres rows.
"""

from __future__ import annotations

import glob
import logging
import numpy as np
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from sklearn.neighbors import KernelDensity, BallTree, KDTree
from sklearn.cluster import DBSCAN
from sklearn.ensemble import RandomForestClassifier
import shap

from app.api.deps import get_db
from app.utils.ml_utils import project_point, unproject_point
from app.api.v1.endpoints.analysis import _dataset_id, get_places_df
from app.services import run_artifacts

logger = logging.getLogger(__name__)

router = APIRouter()

# ---------------------------------------------------------------------------
# Feature column contract — must match training pipeline exactly (8 features).
# Order matters: the RF model was trained with this exact column order.
# Reference: geomarketia_train.ipynb Tahap 10.2
# ---------------------------------------------------------------------------
FEATURE_COLS = [
    "rating",
    "review_log",
    "hotspot_score",
    "competitor_density_500m",
    "same_category_density_500m",
    "nearest_neighbor_dist_m",
    "dist_to_cluster_centroid_m",
    "cluster_id",
]

# KDE bandwidth for hotspot score — fixed at 500 m to match the notebook.
# Reference: geomarketia_train.ipynb Tahap 9.1 (kde_bandwidth_m = 500.0)
_HOTSPOT_KDE_BANDWIDTH_M: float = 500.0

# Candidate grid step in metres.  250 m gives ~1 candidate per city block.
_GRID_STEP_M: float = 250.0

# Prune candidates farther than this from any known business.
_GRID_PRUNE_RADIUS_M: float = 750.0

# Batam bounding box in UTM Zone 48N (EPSG:32648), derived from the WGS84
# bbox in app.utils.geo (lat 1.0–1.3, lng 103.6–104.2).
# Used to clip the candidate grid so we never generate points outside Batam.
# Verified via pyproj: corners map to x≈344k–411k, y≈110k–144k.
_BATAM_UTM_X_MIN: float = 344_000.0
_BATAM_UTM_X_MAX: float = 411_500.0
_BATAM_UTM_Y_MIN: float = 110_000.0
_BATAM_UTM_Y_MAX: float = 144_500.0


# ---------------------------------------------------------------------------
# Backward-compat wrapper (used by model.py)
# ---------------------------------------------------------------------------

def get_latest_model_and_meta(
    db_name: str,
) -> tuple[RandomForestClassifier | None, dict | None]:
    """Thin wrapper — delegates to :func:`run_artifacts.get_latest_model`."""
    return run_artifacts.get_latest_model(db_name)


# ---------------------------------------------------------------------------
# P3.1a — existing_features: return the labelled feature store
# ---------------------------------------------------------------------------

def existing_features(db_name: str) -> pd.DataFrame:
    """Return the per-run feature store DataFrame for *db_name*.

    This is the single source of truth for all spatial features used during
    inference.  The DataFrame is mtime-cached by ``run_artifacts.feature_store``.

    Raises
    ------
    FileNotFoundError
        If no training run exists for *db_name*.
    """
    return run_artifacts.feature_store(db_name)


# ---------------------------------------------------------------------------
# P3.1b — score_candidate_grid: build 8-feature DataFrame for candidate points
# ---------------------------------------------------------------------------

def score_candidate_grid(
    db_name: str,
    category: str,
    step_m: float = _GRID_STEP_M,
) -> pd.DataFrame:
    """Generate a dense UTM candidate grid and compute all 8 RF features.

    All spatial features are derived from the training feature store, NOT
    from raw Postgres rows.  This guarantees that the feature distribution
    seen at serving time matches the distribution the model was trained on.

    Parameters
    ----------
    db_name:
        Dataset key — used to load the feature store and clustering metadata.
    category:
        Target business category (case-insensitive match against feature store).
    step_m:
        Grid step size in metres.  Default 250 m.

    Returns
    -------
    pd.DataFrame
        Columns: all 8 FEATURE_COLS + ``x_utm``, ``y_utm``.
        Empty DataFrame if no candidate points survive the proximity prune.

    Notes
    -----
    Hotspot KDE bandwidth is fixed at 500 m (``_HOTSPOT_KDE_BANDWIDTH_M``)
    to match ``geomarketia_train.ipynb`` Tahap 9.1.

    Cluster assignment uses centroids derived from the feature store's
    ``cluster_id`` column and the per-run ``eps_meter`` as the noise
    threshold (P3.2).
    """
    fs = existing_features(db_name)
    cm = run_artifacts.clustering_metadata(db_name)
    eps_meter: float = float(cm.get("params", {}).get("eps_meter", 500.0))

    # Filter feature-store rows to the valid Batam UTM bbox.
    # The notebook's validation gate uses WGS84 bounds; a small number of
    # rows may have UTM coordinates outside the expected range due to
    # floating-point projection edge cases.  Filtering here prevents the
    # grid from spanning millions of metres.
    fs_valid = fs[
        (fs["x_utm"] >= _BATAM_UTM_X_MIN) & (fs["x_utm"] <= _BATAM_UTM_X_MAX)
        & (fs["y_utm"] >= _BATAM_UTM_Y_MIN) & (fs["y_utm"] <= _BATAM_UTM_Y_MAX)
    ]
    if fs_valid.empty:
        logger.warning(f"No valid UTM coords in feature store for '{db_name}' — using full set")
        fs_valid = fs

    coords_all = fs_valid[["x_utm", "y_utm"]].values  # (N, 2) float64

    # ── Build candidate grid clipped to Batam UTM bbox ───────────────────
    # Use the data extent (clamped to the Batam bbox) + one step of padding.
    # This avoids the 61M-point explosion that occurs when using raw UTM
    # min/max which can span millions of metres due to outlier coordinates.
    x_min = max(coords_all[:, 0].min() - step_m, _BATAM_UTM_X_MIN)
    x_max = min(coords_all[:, 0].max() + step_m, _BATAM_UTM_X_MAX)
    y_min = max(coords_all[:, 1].min() - step_m, _BATAM_UTM_Y_MIN)
    y_max = min(coords_all[:, 1].max() + step_m, _BATAM_UTM_Y_MAX)

    x_grid = np.arange(x_min, x_max + step_m, step_m)
    y_grid = np.arange(y_min, y_max + step_m, step_m)
    xx, yy = np.meshgrid(x_grid, y_grid)
    grid_pts = np.vstack([xx.ravel(), yy.ravel()]).T  # (M, 2)

    # Prune candidates far from any known business (P3.2 proximity filter)
    tree_all = BallTree(coords_all, metric="euclidean")
    dists_prune, _ = tree_all.query(grid_pts, k=1)
    grid_pts = grid_pts[dists_prune.ravel() < _GRID_PRUNE_RADIUS_M]

    if len(grid_pts) == 0:
        return pd.DataFrame(columns=FEATURE_COLS + ["x_utm", "y_utm"])

    # ── P3.3 Hotspot KDE (bandwidth=500 m, matches notebook Tahap 9.1) ──
    kde = KernelDensity(bandwidth=_HOTSPOT_KDE_BANDWIDTH_M, kernel="gaussian")
    kde.fit(coords_all)
    hotspot_scores = np.exp(kde.score_samples(grid_pts))

    # ── P3.2 Cluster assignment from feature-store centroids ─────────────
    # Derive centroids from the feature store (not by re-running DBSCAN).
    clustered = fs[fs["cluster_id"] >= 0]
    if len(clustered) > 0:
        centroids_df = (
            clustered.groupby("cluster_id")[["x_utm", "y_utm"]]
            .mean()
            .reset_index()
        )
        centroid_coords = centroids_df[["x_utm", "y_utm"]].values
        centroid_ids = centroids_df["cluster_id"].values.astype(int)

        tree_centroids = BallTree(centroid_coords, metric="euclidean")
        c_dists, c_idx = tree_centroids.query(grid_pts, k=1)
        c_dists = c_dists.ravel()
        c_idx = c_idx.ravel()

        candidate_cluster_ids = centroid_ids[c_idx].astype(float)
        candidate_dist_centroids = c_dists.copy()

        # Apply per-run eps_meter as noise threshold (P3.2)
        noise_mask = c_dists > eps_meter
        candidate_cluster_ids[noise_mask] = -1.0
        candidate_dist_centroids[noise_mask] = float(eps_meter * 2)
    else:
        # Degenerate run — all candidates are noise
        candidate_cluster_ids = np.full(len(grid_pts), -1.0)
        candidate_dist_centroids = np.full(len(grid_pts), float(eps_meter * 2))

    # ── P3.4 Density features via BallTree on feature-store coords ───────
    # competitor_density_500m: all businesses within 500 m
    comp_dens = tree_all.query_radius(grid_pts, r=500.0, count_only=True)

    # same_category_density_500m + nearest_neighbor_dist_m
    cat_lower = category.lower()
    fs_cat = fs[fs["category"].str.lower() == cat_lower]

    if len(fs_cat) > 0:
        cat_coords = fs_cat[["x_utm", "y_utm"]].values
        tree_cat = BallTree(cat_coords, metric="euclidean")
        same_dens = tree_cat.query_radius(grid_pts, r=500.0, count_only=True)
        nn_d, _ = tree_cat.query(grid_pts, k=1)
        nn_dists_arr = nn_d.ravel()
        target_rating = float(fs_cat["rating"].median())
        target_review_log = float(fs_cat["review_log"].median())
    else:
        same_dens = np.zeros(len(grid_pts), dtype=int)
        nn_dists_arr = np.full(len(grid_pts), float(eps_meter * 2))
        target_rating = float(fs["rating"].median())
        target_review_log = float(fs["review_log"].median())

    return pd.DataFrame(
        {
            "rating": np.full(len(grid_pts), target_rating),
            "review_log": np.full(len(grid_pts), target_review_log),
            "hotspot_score": hotspot_scores,
            "competitor_density_500m": comp_dens.astype(float),
            "same_category_density_500m": same_dens.astype(float),
            "nearest_neighbor_dist_m": nn_dists_arr,
            "dist_to_cluster_centroid_m": candidate_dist_centroids,
            "cluster_id": candidate_cluster_ids,
            "x_utm": grid_pts[:, 0],
            "y_utm": grid_pts[:, 1],
        }
    )


# ---------------------------------------------------------------------------
# build_features — kept for /model/retrain (engineers from raw Postgres rows)
# ---------------------------------------------------------------------------

def build_features(df: pd.DataFrame) -> pd.DataFrame:
    """Feature engineering from raw Postgres place rows.

    Used exclusively by the ``/model/retrain`` background task.
    Inference uses :func:`score_candidate_grid` instead, which sources
    features from the pre-computed feature store.

    Produces all 8 RF features:
    rating, review_log, hotspot_score, competitor_density_500m,
    same_category_density_500m, nearest_neighbor_dist_m,
    dist_to_cluster_centroid_m, cluster_id
    """
    df = df.copy()
    coords = df[["x_utm", "y_utm"]].values

    # 1. Hotspot score (all-business KDE, bandwidth=500 m)
    kde = KernelDensity(bandwidth=_HOTSPOT_KDE_BANDWIDTH_M, kernel="gaussian")
    kde.fit(coords)
    df["hotspot_score"] = np.exp(kde.score_samples(coords))

    # 2. DBSCAN clusters (eps=500 m, min_samples=10 — notebook defaults)
    dbscan = DBSCAN(eps=500.0, min_samples=10, metric="euclidean", algorithm="ball_tree", n_jobs=-1)
    cluster_labels = dbscan.fit_predict(coords)
    df["cluster_id"] = cluster_labels.astype(float)

    centroids: dict[int, np.ndarray] = {}
    for cl in set(cluster_labels):
        if cl == -1:
            continue
        centroids[cl] = np.mean(coords[cluster_labels == cl], axis=0)

    # 3. Competitor density (all categories within 500 m)
    tree_all = BallTree(coords, metric="euclidean")
    df["competitor_density_500m"] = (
        tree_all.query_radius(coords, r=500.0, count_only=True) - 1
    )

    # 4. Per-category: nearest-neighbour dist, same-category density, centroid dist
    nn_dists: list[float] = []
    dist_centroids: list[float] = []
    same_cat_density: list[int] = []

    for idx, row in df.iterrows():
        cat = row["category"]
        df_same = df[(df["category"] == cat) & (df.index != idx)]

        if df_same.empty:
            nn_dists.append(1000.0)
            same_cat_density.append(0)
        else:
            tree_same = BallTree(df_same[["x_utm", "y_utm"]].values, metric="euclidean")
            d, _ = tree_same.query(row[["x_utm", "y_utm"]].values.reshape(1, -1), k=1)
            nn_dists.append(float(d[0][0]))
            count_arr = tree_same.query_radius(
                row[["x_utm", "y_utm"]].values.reshape(1, -1), r=500.0, count_only=True
            )
            same_cat_density.append(int(count_arr[0]))

        cl_id = int(row["cluster_id"])
        if cl_id != -1 and cl_id in centroids:
            dist_c = float(np.linalg.norm(row[["x_utm", "y_utm"]].values - centroids[cl_id]))
            dist_centroids.append(dist_c)
        else:
            dist_centroids.append(1000.0)

    df["nearest_neighbor_dist_m"] = nn_dists
    df["same_category_density_500m"] = same_cat_density
    df["dist_to_cluster_centroid_m"] = dist_centroids
    df["review_log"] = np.log1p(df["review"])

    return df


# ---------------------------------------------------------------------------
# train_fallback_model — last-resort on-the-fly training
# ---------------------------------------------------------------------------

def train_fallback_model(df: pd.DataFrame, db_name: str) -> RandomForestClassifier:
    """Train a minimal RF on the fly when no saved model exists.

    Persists the result to ``<ARTIFACTS_DIR>/runs/<db_name>/models/`` so
    subsequent requests skip retraining.
    """
    import joblib
    from sklearn.ensemble import RandomForestClassifier as _RF

    logger.warning(
        f"No saved model found for '{db_name}'. "
        "Training a fallback model — run the notebook for a proper model."
    )

    df_features = build_features(df)
    score = (
        df_features["rating"] * 0.25
        + np.log1p(df_features["review"]) * 0.20
        + df_features["hotspot_score"] * 0.25
        - df_features["same_category_density_500m"] * 0.20
    )
    q33 = float(np.percentile(score, 33)) if len(score) > 0 else 0.0
    q66 = float(np.percentile(score, 66)) if len(score) > 0 else 0.0
    labels = pd.cut(score, bins=[-np.inf, q33, q66, np.inf], labels=["Low", "Medium", "High"])
    df_features["suitability_label"] = labels

    X = df_features[FEATURE_COLS].fillna(0)
    y = df_features["suitability_label"]

    rf = _RF(n_estimators=100, class_weight="balanced", random_state=42)
    rf.fit(X, y)

    model_dir = run_artifacts.run_dir(db_name) / "models"
    model_dir.mkdir(parents=True, exist_ok=True)
    existing = sorted(glob.glob(str(model_dir / "rf_location_reco_v*.joblib")))
    version = len(existing) + 1
    model_path = model_dir / f"rf_location_reco_v{version}.joblib"
    try:
        joblib.dump(rf, str(model_path))
        logger.info(f"Fallback model saved to {model_path}")
    except Exception as exc:
        logger.error(f"Failed to save fallback model: {exc}")

    return rf


# ---------------------------------------------------------------------------
# P3.5 — heuristic fallback for degenerate runs (n_clusters == 0)
# ---------------------------------------------------------------------------

def _heuristic_score_grid(
    db_name: str,
    category: str,
    limit: int,
) -> list[dict]:
    """Score candidate points using a simple demand-minus-competition heuristic.

    Used when ``clustering_metadata.n_clusters == 0`` (e.g. Hotel dataset).
    No RF model is involved.

    Score formula:
        heuristic = hotspot_score_norm - same_category_density_norm
    where both terms are min-max normalised to [0, 1].
    """
    fs = existing_features(db_name)
    fs_valid = fs[
        (fs["x_utm"] >= _BATAM_UTM_X_MIN) & (fs["x_utm"] <= _BATAM_UTM_X_MAX)
        & (fs["y_utm"] >= _BATAM_UTM_Y_MIN) & (fs["y_utm"] <= _BATAM_UTM_Y_MAX)
    ]
    if fs_valid.empty:
        fs_valid = fs
    coords_all = fs_valid[["x_utm", "y_utm"]].values

    x_min = max(coords_all[:, 0].min() - _GRID_STEP_M, _BATAM_UTM_X_MIN)
    x_max = min(coords_all[:, 0].max() + _GRID_STEP_M, _BATAM_UTM_X_MAX)
    y_min = max(coords_all[:, 1].min() - _GRID_STEP_M, _BATAM_UTM_Y_MIN)
    y_max = min(coords_all[:, 1].max() + _GRID_STEP_M, _BATAM_UTM_Y_MAX)
    x_grid = np.arange(x_min, x_max + _GRID_STEP_M, _GRID_STEP_M)
    y_grid = np.arange(y_min, y_max + _GRID_STEP_M, _GRID_STEP_M)
    xx, yy = np.meshgrid(x_grid, y_grid)
    grid_pts = np.vstack([xx.ravel(), yy.ravel()]).T

    tree_all = BallTree(coords_all, metric="euclidean")
    dists_prune, _ = tree_all.query(grid_pts, k=1)
    grid_pts = grid_pts[dists_prune.ravel() < _GRID_PRUNE_RADIUS_M]

    if len(grid_pts) == 0:
        return []

    kde = KernelDensity(bandwidth=_HOTSPOT_KDE_BANDWIDTH_M, kernel="gaussian")
    kde.fit(coords_all)
    hotspot = np.exp(kde.score_samples(grid_pts))

    cat_lower = category.lower()
    fs_cat = fs_valid[fs_valid["category"].str.lower() == cat_lower]
    if len(fs_cat) > 0:
        tree_cat = BallTree(fs_cat[["x_utm", "y_utm"]].values, metric="euclidean")
        same_dens = tree_cat.query_radius(grid_pts, r=500.0, count_only=True).astype(float)
    else:
        same_dens = np.zeros(len(grid_pts))

    def _norm(arr: np.ndarray) -> np.ndarray:
        mn, mx = arr.min(), arr.max()
        return (arr - mn) / (mx - mn) if mx > mn else np.ones_like(arr) * 0.5

    scores = _norm(hotspot) - _norm(same_dens)
    scores = np.clip(scores, 0.0, 1.0)

    top_idx = np.argsort(scores)[::-1][:limit]
    results = []
    for rank, idx in enumerate(top_idx, start=1):
        lat, lng = unproject_point(grid_pts[idx, 0], grid_pts[idx, 1])
        results.append({
            "rank": rank,
            "lat": float(lat),
            "lng": float(lng),
            "score": float(round(scores[idx], 4)),
            "features": {
                "hotspot_score": float(round(hotspot[idx], 6)),
                "same_category_density": int(same_dens[idx]),
            },
            "shap_explanation": {},
            "note": "heuristic fallback — no DBSCAN clusters found for this dataset",
        })
    return results


# ---------------------------------------------------------------------------
# POST /recommendation/location
# ---------------------------------------------------------------------------

@router.post("/location", summary="Get top recommended business locations with SHAP explanations")
def recommend_location(
    request: Request,
    db_name: str,
    category: str = Query(..., description="Business category to find locations for"),
    limit: int = Query(5, ge=1, le=20, description="Top-N recommendations"),
    db: Session = Depends(get_db),
):
    """Score a dense candidate grid and return the top-N most suitable locations.

    Feature pipeline (Phase 3)
    --------------------------
    All spatial features are sourced from the per-run ``feature_store.csv``
    produced by the training notebook.  DBSCAN is **not** re-run at serving
    time.  Cluster centroids are derived from the feature store and the
    per-run ``eps_meter`` is used as the noise threshold.

    Degenerate runs (``n_clusters == 0``)
    --------------------------------------
    When the training run found no clusters (e.g. Hotel dataset with only
    99 spread-out locations), the endpoint returns HTTP 422 with a
    heuristic-only fallback in the response body so the frontend can still
    render a result.

    Response shape
    --------------
    Each recommendation includes:
    - ``lat`` / ``lng`` — WGS84 coordinates
    - ``score`` — probability of "High" suitability (0–1)
    - ``features`` — spatial context at that location
    - ``shap_explanation`` — per-feature SHAP values for the "High" class
    """
    # ── Guard: run artifacts must exist ─────────────────────────────────
    if not run_artifacts.has_run(db_name):
        raise HTTPException(
            status_code=404,
            detail=(
                f"No training run found for '{db_name}'. "
                "Run the training notebook and scripts/sync_artifacts.py first."
            ),
        )

    # ── Load clustering metadata ─────────────────────────────────────────
    try:
        cm = run_artifacts.clustering_metadata(db_name)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    n_clusters: int = cm.get("results", {}).get("n_clusters", 0)

    # ── P3.5 Degenerate-run short-circuit ────────────────────────────────
    if n_clusters == 0:
        logger.warning(
            f"'{db_name}' has n_clusters=0 — returning heuristic fallback."
        )
        try:
            fallback_recos = _heuristic_score_grid(db_name, category, limit)
        except Exception as exc:
            logger.exception(f"Heuristic fallback failed for '{db_name}': {exc}")
            fallback_recos = []

        # HTTP 422 signals "processed but degraded" — body still contains results
        from fastapi.responses import JSONResponse
        return JSONResponse(
            status_code=422,
            content={
                "code": "no_clusters",
                "detail": (
                    f"Dataset '{db_name}' has no DBSCAN clusters "
                    f"(noise_ratio={cm['results'].get('noise_ratio_pct', 100)}%). "
                    "Returning heuristic-only recommendations."
                ),
                "recommendations": fallback_recos,
            },
        )

    # ── Load model ───────────────────────────────────────────────────────
    model, _meta = run_artifacts.get_latest_model(db_name)
    if model is None:
        # Last resort: train on the fly from Postgres rows
        df_raw = get_places_df(db, _dataset_id(request))
        if df_raw.empty:
            raise HTTPException(status_code=400, detail="Dataset is empty in Postgres.")
        model = train_fallback_model(df_raw, db_name)

    # ── P3.1b Score candidate grid from feature store ────────────────────
    try:
        candidates_df = score_candidate_grid(db_name, category)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    if candidates_df.empty:
        return {"recommendations": []}

    # ── Predict probability of "High" suitability ────────────────────────
    classes = list(model.classes_)
    X_cand = candidates_df[FEATURE_COLS].fillna(0)

    if "High" in classes:
        high_idx = classes.index("High")
        probs = model.predict_proba(X_cand)[:, high_idx]
    else:
        probs = np.full(len(candidates_df), 0.5)

    candidates_df = candidates_df.copy()
    candidates_df["prob"] = probs
    top_candidates = candidates_df.nlargest(limit, "prob")

    # ── P3.6 SHAP explanations for top-N ────────────────────────────────
    # TreeExplainer on the candidate grid.
    # 3-D shap_values shape [n_samples × n_features × n_classes] is handled.
    explainer = shap.TreeExplainer(model)
    X_top = top_candidates[FEATURE_COLS].fillna(0)
    shap_values = explainer.shap_values(X_top)

    recos_out = []
    for rank, (i, (_, row)) in enumerate(enumerate(top_candidates.iterrows()), start=1):
        lat, lng = unproject_point(row["x_utm"], row["y_utm"])

        shap_feat: dict[str, float] = {}
        for f_idx, col in enumerate(FEATURE_COLS):
            if isinstance(shap_values, list):
                val = float(shap_values[high_idx][i, f_idx]) if "High" in classes else 0.0
            elif isinstance(shap_values, np.ndarray) and shap_values.ndim == 3:
                val = float(shap_values[i, f_idx, high_idx]) if "High" in classes else 0.0
            else:
                val = float(shap_values[i, f_idx])
            shap_feat[col] = round(val, 4)

        recos_out.append(
            {
                "rank": rank,
                "lat": float(lat),
                "lng": float(lng),
                "score": float(round(row["prob"], 4)),
                "features": {
                    "rating": float(round(row["rating"], 2)),
                    "hotspot_score": float(round(row["hotspot_score"], 6)),
                    "competitor_density": int(row["competitor_density_500m"]),
                    "same_category_density": int(row["same_category_density_500m"]),
                    "nearest_neighbor_dist_m": float(round(row["nearest_neighbor_dist_m"], 1)),
                    "dist_to_cluster_centroid_m": float(round(row["dist_to_cluster_centroid_m"], 1)),
                    "cluster_id": int(row["cluster_id"]),
                },
                "shap_explanation": shap_feat,
            }
        )

    return {"recommendations": recos_out}
