"""Pydantic response schemas for per-run artifact endpoints (Phase 4).

All models use ``model_config = ConfigDict(extra="allow")`` so that
future additions to the training pipeline's JSON files don't break
existing clients.
"""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict


# ---------------------------------------------------------------------------
# Shared primitives
# ---------------------------------------------------------------------------

class ClusteringParams(BaseModel):
    """DBSCAN parameters used during training."""
    model_config = ConfigDict(extra="allow")

    eps_meter: float
    min_samples: int
    category_col: str = "category"
    crs_input: str = "EPSG:4326"
    crs_output: str = "EPSG:32648"


class ClusteringResults(BaseModel):
    """Quality metrics from the DBSCAN run."""
    model_config = ConfigDict(extra="allow")

    n_clusters: int
    n_noise: int
    n_clustered: int
    noise_ratio_pct: float
    silhouette_score: float | None = None
    davies_bouldin_idx: float | None = None


class ClusteringPaths(BaseModel):
    """Filesystem paths recorded in clustering_metadata.json."""
    model_config = ConfigDict(extra="allow")

    run_dir: str
    data_dir: str
    report_dir: str
    model_dir: str
    feature_store_path: str


# ---------------------------------------------------------------------------
# P4.1a — GET /model/clustering-metadata
# ---------------------------------------------------------------------------

class ClusteringMetadataOut(BaseModel):
    """Full payload of ``clustering_metadata.json``."""
    model_config = ConfigDict(extra="allow")

    notebook: str
    timestamp: str
    target_db: str
    db_files: list[str] = []
    paths: ClusteringPaths | None = None
    params: ClusteringParams
    results: ClusteringResults
    output: dict[str, Any] = {}


# ---------------------------------------------------------------------------
# P4.1b — GET /model/training-report
# ---------------------------------------------------------------------------

class RFParameters(BaseModel):
    model_config = ConfigDict(extra="allow")

    n_estimators: int = 300
    class_weight: str = "balanced"
    random_seed: int = 42
    spatial_split: str = "grid_1km_group_shuffle"


class RFMetrics(BaseModel):
    model_config = ConfigDict(extra="allow")

    f1_macro: float | None = None
    rmse: float | None = None
    r2: float | None = None
    confusion_matrix: list[list[int]] | None = None
    report: dict[str, Any] = {}
    best_model: dict[str, Any] = {}


class TrainingReportOut(BaseModel):
    """Full payload of ``rf_metadata.json``."""
    model_config = ConfigDict(extra="allow")

    notebook: str
    timestamp: str
    target_db: str
    run_dir: str
    model_path: str
    features: list[str]
    parameters: RFParameters
    metrics: RFMetrics


# ---------------------------------------------------------------------------
# P4.1c — GET /model/shap-importance
# ---------------------------------------------------------------------------

class ShapFeatureImportance(BaseModel):
    """One row from ``rf_shap_importance.csv``."""
    feature: str
    mean_abs_shap: float


# ---------------------------------------------------------------------------
# P4.1d — GET /model/category-distribution
# ---------------------------------------------------------------------------

class CategoryCount(BaseModel):
    category: str
    count: int


class CategoryDistributionOut(BaseModel):
    top10: list[CategoryCount]
    all: list[CategoryCount]


# ---------------------------------------------------------------------------
# P4.1f — GET /model/feature-store-summary
# ---------------------------------------------------------------------------

class FeatureStoreSummaryOut(BaseModel):
    model_config = ConfigDict(extra="allow")

    db_name: str
    rows: int
    columns: list[str]
    dtypes: dict[str, str]
    null_counts: dict[str, int]
    head: list[dict[str, Any]]


# ---------------------------------------------------------------------------
# P4.2 — GET /api/v1/runs
# ---------------------------------------------------------------------------

class RunSummary(BaseModel):
    """Lightweight summary of one complete training run."""
    db_key: str
    n_clusters: int
    noise_ratio_pct: float
    silhouette_score: float | None
    f1_macro: float | None
    rmse: float | None = None
    r2: float | None = None
    eps_meter: float
    min_samples: int
    timestamp: str | None
    has_model: bool
    has_shap: bool


class RunsListOut(BaseModel):
    runs: list[RunSummary]
    total: int
