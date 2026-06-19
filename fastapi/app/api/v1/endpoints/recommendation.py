"""Regression-based location recommendation endpoints.

The endpoint ranks candidate grid points using the feature schema produced by
the updated geomarketia training notebook.  Older artifact names are normalized
at load time so the API can still start while datasets are being retrained.
"""

from __future__ import annotations

import glob
import logging
from typing import Any

import numpy as np
import pandas as pd
import shap
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from sklearn.cluster import DBSCAN
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import davies_bouldin_score, silhouette_score
from sklearn.neighbors import BallTree, KDTree

from app.api.deps import get_db
from app.api.v1.endpoints.analysis import _dataset_id, get_places_df
from app.services import run_artifacts
from app.utils.ml_utils import unproject_point

logger = logging.getLogger(__name__)

router = APIRouter()

FEATURE_SCHEMA_VERSION = "location_regression_v1"

FEATURE_COLS = [
    "population_density",
    "nearby_review_count_log_sum_500m",
    "nearby_review_count_log_mean_500m",
    "nearby_avg_rating_500m",
    "same_category_density_250m",
    "same_category_density_500m",
    "same_category_density_1000m",
    "nearest_same_category_distance_m",
    "competitor_saturation_index",
    "business_density_250m",
    "business_density_500m",
    "business_density_1000m",
    "nearest_business_distance_m",
    "poi_diversity_index",
    "nearest_road_distance_m",
    "road_density_500m",
    "intersection_density_500m",
    "road_access_score",
    "is_valid_land",
    "distance_to_water_body_m",
    "distance_to_forest_or_green_area_m",
    "commercial_land_ratio_500m",
    "residential_land_ratio_500m",
    "cluster_centroid_distance_m",
    "nearest_cluster_size",
    "is_noise_area",
]

REMOVED_FEATURES = {
    "hotspot_score",
    "female_ratio",
    "has_phone",
    "has_url",
    "has_open_hours",
    "price_level",
    "nearby_price_level_median_500m",
    "cluster_id",
}

COLUMN_ALIASES = {
    "kecamatan": "subdistrict",
    "distance_to_nearest_road": "nearest_road_distance_m",
    "dist_to_cluster_centroid_m": "cluster_centroid_distance_m",
    "competitor_density_500m": "business_density_500m",
    "competitor_density_1km": "business_density_1000m",
    "nearest_neighbor_dist_m": "nearest_business_distance_m",
    "review_log": "review_count_log",
}

_GRID_PRUNE_RADIUS_M = 750.0


def _normalize_artifact_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Return a copy with old artifact names mapped to the v1 English schema."""
    out = df.copy()
    for old, new in COLUMN_ALIASES.items():
        if old in out.columns and new not in out.columns:
            out[new] = out[old]
    return out


def existing_features(db_name: str) -> pd.DataFrame:
    return _normalize_artifact_columns(run_artifacts.feature_store(db_name))


def _safe_numeric(series: pd.Series | float | int, default: float = 0.0) -> pd.Series:
    if isinstance(series, pd.Series):
        return pd.to_numeric(series, errors="coerce").fillna(default)
    return pd.Series([series]).astype(float)


def _minmax(series: pd.Series) -> pd.Series:
    s = pd.to_numeric(series, errors="coerce").fillna(0.0)
    mn = float(s.min())
    mx = float(s.max())
    if mx <= mn:
        return pd.Series(np.zeros(len(s)), index=s.index)
    return (s - mn) / (mx - mn)


def _band_from_score(score: float, thresholds: dict[str, float] | None = None) -> str:
    if thresholds:
        low_max = float(thresholds.get("low_max", 0.4))
        medium_max = float(thresholds.get("medium_max", 0.7))
    else:
        low_max = 0.4
        medium_max = 0.7
    if score <= low_max:
        return "Low"
    if score <= medium_max:
        return "Medium"
    return "High"


def _feature_list_from_meta(meta: dict[str, Any] | None) -> list[str]:
    if not meta:
        return FEATURE_COLS
    raw_features = meta.get("features") or meta.get("feature_columns") or FEATURE_COLS
    normalized = [COLUMN_ALIASES.get(f, f) for f in raw_features]
    return [f for f in normalized if f not in REMOVED_FEATURES] or FEATURE_COLS


def _prepare_model_matrix(df: pd.DataFrame, feature_cols: list[str]) -> pd.DataFrame:
    out = df.copy()
    for col in feature_cols:
        if col not in out.columns:
            out[col] = 0.0
    return out[feature_cols].replace([np.inf, -np.inf], np.nan).fillna(0.0)


def _score_with_model(model: Any, X: pd.DataFrame) -> np.ndarray:
    """Score regression models and legacy classifiers on a 0..1 scale."""
    if hasattr(model, "predict_proba") and hasattr(model, "classes_"):
        classes = list(model.classes_)
        if "High" in classes:
            scores = model.predict_proba(X)[:, classes.index("High")]
        else:
            scores = np.full(len(X), 0.5)
    else:
        scores = np.asarray(model.predict(X), dtype=float)
    return np.clip(scores, 0.0, 1.0)


def _tree_shap(model: Any, X: pd.DataFrame) -> dict[int, dict[str, float]]:
    if X.empty:
        return {}
    try:
        explainer = shap.TreeExplainer(model)
        values = explainer.shap_values(X)
    except Exception as exc:
        logger.warning("SHAP explanation skipped: %s", exc)
        return {i: {} for i in range(len(X))}

    arr = np.asarray(values)
    if isinstance(values, list):
        arr = np.asarray(values[-1])
    if arr.ndim == 3:
        arr = arr[:, :, -1]

    explanations: dict[int, dict[str, float]] = {}
    for row_idx in range(len(X)):
        explanations[row_idx] = {
            col: round(float(arr[row_idx, col_idx]), 4)
            for col_idx, col in enumerate(X.columns)
        }
    return explanations


def _add_density_and_quality_features(
    candidates: pd.DataFrame,
    fs: pd.DataFrame,
    category: str,
) -> pd.DataFrame:
    out = candidates.copy()
    grid_pts = out[["x_utm", "y_utm"]].values
    coords_all = fs[["x_utm", "y_utm"]].values
    tree_all = BallTree(coords_all, metric="euclidean")

    for radius in (250.0, 500.0, 1000.0):
        out[f"business_density_{int(radius)}m"] = tree_all.query_radius(
            grid_pts, r=radius, count_only=True
        ).astype(float)

    nn_all, _ = tree_all.query(grid_pts, k=1)
    out["nearest_business_distance_m"] = nn_all.ravel()

    fs_cat = fs[fs["category"].astype(str).str.lower() == category.lower()]
    if len(fs_cat) > 0:
        cat_coords = fs_cat[["x_utm", "y_utm"]].values
        tree_cat = BallTree(cat_coords, metric="euclidean")
        for radius in (250.0, 500.0, 1000.0):
            out[f"same_category_density_{int(radius)}m"] = tree_cat.query_radius(
                grid_pts, r=radius, count_only=True
            ).astype(float)
        nn_cat, _ = tree_cat.query(grid_pts, k=1)
        out["nearest_same_category_distance_m"] = nn_cat.ravel()
    else:
        for radius in (250, 500, 1000):
            out[f"same_category_density_{radius}m"] = 0.0
        out["nearest_same_category_distance_m"] = out["nearest_business_distance_m"]

    area_500_km2 = np.pi * (0.5**2)
    out["competitor_saturation_index"] = out["same_category_density_500m"] / area_500_km2

    review_col = "review_count_log" if "review_count_log" in fs.columns else "review_log"
    reviews = _safe_numeric(fs[review_col], 0.0) if review_col in fs.columns else pd.Series(np.zeros(len(fs)))
    ratings = _safe_numeric(fs["rating"], 0.0) if "rating" in fs.columns else pd.Series(np.zeros(len(fs)))

    nearby_idx = tree_all.query_radius(grid_pts, r=500.0)
    review_sum = []
    review_mean = []
    rating_mean = []
    diversity = []
    categories = fs["category"].astype(str) if "category" in fs.columns else pd.Series(["unknown"] * len(fs))
    for idxs in nearby_idx:
        if len(idxs) == 0:
            review_sum.append(0.0)
            review_mean.append(0.0)
            rating_mean.append(0.0)
            diversity.append(0.0)
            continue
        review_vals = reviews.iloc[idxs]
        rating_vals = ratings.iloc[idxs]
        cat_counts = categories.iloc[idxs].value_counts(normalize=True)
        entropy = float(-(cat_counts * np.log(cat_counts + 1e-12)).sum())
        review_sum.append(float(review_vals.sum()))
        review_mean.append(float(review_vals.mean()))
        rating_mean.append(float(rating_vals.mean()))
        diversity.append(entropy)
    out["nearby_review_count_log_sum_500m"] = review_sum
    out["nearby_review_count_log_mean_500m"] = review_mean
    out["nearby_avg_rating_500m"] = rating_mean
    out["poi_diversity_index"] = diversity
    return out


def _add_cluster_features(candidates: pd.DataFrame, fs: pd.DataFrame, eps_meter: float) -> pd.DataFrame:
    out = candidates.copy()
    grid_pts = out[["x_utm", "y_utm"]].values
    if "cluster_id" not in fs.columns:
        out["cluster_centroid_distance_m"] = eps_meter * 2
        out["nearest_cluster_size"] = 0.0
        out["is_noise_area"] = 1.0
        return out

    clustered = fs[pd.to_numeric(fs["cluster_id"], errors="coerce").fillna(-1) >= 0]
    if clustered.empty:
        out["cluster_centroid_distance_m"] = eps_meter * 2
        out["nearest_cluster_size"] = 0.0
        out["is_noise_area"] = 1.0
        return out

    centroids = clustered.groupby("cluster_id")[["x_utm", "y_utm"]].mean().reset_index()
    sizes = clustered.groupby("cluster_id").size().to_dict()
    tree = BallTree(centroids[["x_utm", "y_utm"]].values, metric="euclidean")
    dists, idxs = tree.query(grid_pts, k=1)
    nearest_ids = centroids["cluster_id"].iloc[idxs.ravel()].values
    out["cluster_centroid_distance_m"] = dists.ravel()
    out["nearest_cluster_size"] = [float(sizes.get(cid, 0)) for cid in nearest_ids]
    out["is_noise_area"] = (out["cluster_centroid_distance_m"] > eps_meter).astype(float)
    return out


def _add_accessibility_defaults(candidates: pd.DataFrame) -> pd.DataFrame:
    out = candidates.copy()
    if "nearest_road_distance_m" not in out.columns:
        out["nearest_road_distance_m"] = 0.0
    out["road_density_500m"] = out.get("road_density_500m", 0.0)
    out["intersection_density_500m"] = out.get("intersection_density_500m", 0.0)
    road_norm = 1.0 - _minmax(out["nearest_road_distance_m"])
    road_density_norm = _minmax(pd.Series(out["road_density_500m"], index=out.index))
    out["road_access_score"] = (0.7 * road_norm + 0.3 * road_density_norm).clip(0, 1)
    return out


def _add_land_defaults(candidates: pd.DataFrame) -> pd.DataFrame:
    out = candidates.copy()
    defaults = {
        "is_valid_land": 1.0,
        "distance_to_water_body_m": 0.0,
        "distance_to_forest_or_green_area_m": 0.0,
        "commercial_land_ratio_500m": 0.0,
        "residential_land_ratio_500m": 0.0,
    }
    for col, value in defaults.items():
        if col not in out.columns:
            out[col] = value
    return out


def score_candidate_grid(
    db_name: str,
    category: str,
    subdistrict: str | None = None,
) -> pd.DataFrame:
    fs = existing_features(db_name)
    cm = run_artifacts.clustering_metadata(db_name)
    eps_meter = float(cm.get("params", {}).get("eps_meter", 500.0))

    grid_path = run_artifacts.run_dir(db_name) / "data" / "base_candidate_grid.parquet"
    if not grid_path.exists():
        logger.error("Missing base candidate grid for %s", db_name)
        return pd.DataFrame(columns=FEATURE_COLS + ["x_utm", "y_utm"])

    grid = _normalize_artifact_columns(pd.read_parquet(grid_path))
    if subdistrict and "subdistrict" in grid.columns:
        wanted = subdistrict.lower().replace(" ", "")
        grid = grid[grid["subdistrict"].astype(str).str.lower().str.replace(" ", "") == wanted].copy()

    if grid.empty:
        return pd.DataFrame(columns=FEATURE_COLS + ["x_utm", "y_utm"])

    coords_all = fs[["x_utm", "y_utm"]].values
    tree_all = BallTree(coords_all, metric="euclidean")
    dists, _ = tree_all.query(grid[["x_utm", "y_utm"]].values, k=1)
    grid = grid[dists.ravel() < _GRID_PRUNE_RADIUS_M].copy()
    if grid.empty:
        return pd.DataFrame(columns=FEATURE_COLS + ["x_utm", "y_utm"])

    grid = _add_density_and_quality_features(grid, fs, category)
    grid = _add_cluster_features(grid, fs, eps_meter)
    grid = _add_accessibility_defaults(grid)
    grid = _add_land_defaults(grid)
    for col in FEATURE_COLS:
        if col not in grid.columns:
            grid[col] = 0.0
    return grid


def build_features(df: pd.DataFrame, eps: float = 500.0, min_samples: int = 10) -> tuple[pd.DataFrame, dict]:
    """Compatibility feature builder used by the retrain endpoint."""
    df = _normalize_artifact_columns(df.copy())
    coords = df[["x_utm", "y_utm"]].values
    dbscan = DBSCAN(eps=eps, min_samples=min_samples, metric="euclidean", algorithm="ball_tree", n_jobs=-1)
    labels = dbscan.fit_predict(coords)
    df["cluster_id"] = labels.astype(float)
    unique_labels = set(labels)
    n_clusters = len(unique_labels) - (1 if -1 in unique_labels else 0)
    n_noise = list(labels).count(-1)
    if n_clusters >= 2:
        sil_score = float(silhouette_score(coords, labels))
        db_score = float(davies_bouldin_score(coords, labels))
    else:
        sil_score = 0.0
        db_score = 0.0
    metrics = {
        "n_clusters": n_clusters,
        "n_noise": n_noise,
        "n_clustered": len(labels) - n_noise,
        "noise_ratio_pct": round(n_noise / len(labels) * 100.0, 2) if len(labels) else 0.0,
        "silhouette_score": round(sil_score, 4),
        "davies_bouldin_idx": round(db_score, 4),
    }
    df = _add_density_and_quality_features(df, df, str(df["category"].iloc[0]) if "category" in df else "")
    df = _add_cluster_features(df, df, eps)
    df = _add_accessibility_defaults(df)
    df = _add_land_defaults(df)
    if "review" in df.columns and "review_count_log" not in df.columns:
        df["review_count_log"] = np.log1p(pd.to_numeric(df["review"], errors="coerce").fillna(0))
    return df, metrics


def train_fallback_model(df: pd.DataFrame, db_name: str) -> RandomForestRegressor:
    import joblib

    logger.warning("No saved model found for '%s'. Training fallback regressor.", db_name)
    features, _ = build_features(df)
    target = (
        0.65 * _minmax(features.get("nearby_review_count_log_sum_500m", pd.Series(np.zeros(len(features)))))
        + 0.35 * _minmax(features.get("nearby_avg_rating_500m", pd.Series(np.zeros(len(features)))))
    ).clip(0, 1)
    X = _prepare_model_matrix(features, FEATURE_COLS)
    model = RandomForestRegressor(n_estimators=200, random_state=42, n_jobs=-1)
    model.fit(X, target)

    model_dir = run_artifacts.run_dir(db_name) / "models"
    model_dir.mkdir(parents=True, exist_ok=True)
    existing = sorted(glob.glob(str(model_dir / "reg_location_reco_v*.joblib")))
    version = len(existing) + 1
    model_path = model_dir / f"reg_location_reco_v{version}.joblib"
    try:
        joblib.dump(model, str(model_path))
    except Exception as exc:
        logger.error("Failed to save fallback model: %s", exc)
    return model


def _heuristic_score_grid(db_name: str, category: str, limit: int) -> list[dict]:
    candidates = score_candidate_grid(db_name, category)
    if candidates.empty:
        return []
    demand = _minmax(candidates["population_density"]) * 0.35
    activity = _minmax(candidates["business_density_500m"]) * 0.25
    road = candidates["road_access_score"] * 0.20
    competition = (1.0 - _minmax(candidates["competitor_saturation_index"])) * 0.20
    candidates = candidates.copy()
    candidates["score"] = (demand + activity + road + competition).clip(0, 1)
    cm = run_artifacts.clustering_metadata(db_name)
    epsg_code = cm.get("params", {}).get("crs_output", "EPSG:32648")
    out = []
    for rank, (_, row) in enumerate(candidates.nlargest(limit, "score").iterrows(), start=1):
        lat, lng = unproject_point(row["x_utm"], row["y_utm"], epsg_code=epsg_code)
        score = float(round(row["score"], 4))
        out.append({
            "rank": rank,
            "lat": float(lat),
            "lng": float(lng),
            "score": score,
            "suitability_band": _band_from_score(score),
            "features": _response_features(row),
            "shap_explanation": {},
            "note": "heuristic fallback - no usable regression model found",
        })
    return out


def _response_features(row: pd.Series) -> dict[str, float | int]:
    return {
        "population_density": float(row.get("population_density", 0.0)),
        "business_density_500m": int(round(float(row.get("business_density_500m", 0.0)))),
        "same_category_density_500m": int(round(float(row.get("same_category_density_500m", 0.0)))),
        "nearest_same_category_distance_m": float(round(row.get("nearest_same_category_distance_m", 0.0), 1)),
        "competitor_saturation_index": float(round(row.get("competitor_saturation_index", 0.0), 3)),
        "nearest_road_distance_m": float(round(row.get("nearest_road_distance_m", 0.0), 1)),
        "road_access_score": float(round(row.get("road_access_score", 0.0), 3)),
        "is_valid_land": int(round(float(row.get("is_valid_land", 1.0)))),
        "cluster_centroid_distance_m": float(round(row.get("cluster_centroid_distance_m", 0.0), 1)),
        "nearest_cluster_size": int(round(float(row.get("nearest_cluster_size", 0.0)))),
        "is_noise_area": int(round(float(row.get("is_noise_area", 0.0)))),
    }


@router.post("/location", summary="Get ranked business location recommendations")
def recommend_location(
    request: Request,
    db_name: str,
    category: str = Query(..., description="Business category to find locations for"),
    limit: int = Query(5, ge=1, le=20, description="Top-N recommendations"),
    subdistrict: str | None = Query(None, description="Optional subdistrict filter"),
    kecamatan: str | None = Query(None, description="Deprecated alias for subdistrict"),
    db: Session = Depends(get_db),
):
    if not run_artifacts.has_run(db_name):
        raise HTTPException(
            status_code=404,
            detail=f"No training run found for '{db_name}'. Run the training pipeline first.",
        )

    cm = run_artifacts.clustering_metadata(db_name)
    chosen_subdistrict = subdistrict or kecamatan
    candidates = score_candidate_grid(db_name, category, subdistrict=chosen_subdistrict)
    if candidates.empty:
        return {"recommendations": []}

    model, meta = run_artifacts.get_latest_model(db_name)
    if model is None:
        df_raw = get_places_df(db, _dataset_id(request))
        if df_raw.empty:
            return {"recommendations": _heuristic_score_grid(db_name, category, limit)}
        model = train_fallback_model(df_raw, db_name)
        meta = {"features": FEATURE_COLS}

    model_features = _feature_list_from_meta(meta)
    X = _prepare_model_matrix(candidates, model_features)
    try:
        scores = _score_with_model(model, X)
    except Exception as exc:
        logger.exception("Model scoring failed for '%s': %s", db_name, exc)
        return {"recommendations": _heuristic_score_grid(db_name, category, limit)}

    candidates = candidates.copy()
    candidates["score"] = scores
    thresholds = (meta or {}).get("suitability_band_thresholds")
    top = candidates.nlargest(limit, "score")
    X_top = _prepare_model_matrix(top, model_features)
    shap_by_row = _tree_shap(model, X_top)

    feature_importances = {}
    if hasattr(model, "feature_importances_"):
        fi = model.feature_importances_
        feature_importances = {
            col: float(fi[idx])
            for idx, col in enumerate(model_features)
        }

    epsg_code = cm.get("params", {}).get("crs_output", "EPSG:32648")
    out = []
    for idx, (rank, (_, row)) in enumerate(enumerate(top.iterrows(), start=1)):
        lat, lng = unproject_point(row["x_utm"], row["y_utm"], epsg_code=epsg_code)
        score = float(round(row["score"], 4))
        out.append({
            "rank": rank,
            "lat": float(lat),
            "lng": float(lng),
            "score": score,
            "suitability_band": _band_from_score(score, thresholds),
            "features": _response_features(row),
            "shap_explanation": shap_by_row.get(idx, {}),
            "feature_importance": feature_importances,
        })
    return {"recommendations": out}
