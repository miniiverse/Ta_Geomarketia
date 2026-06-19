"""API v1 aggregation router.

Import and include all endpoint routers for version 1 of the API.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.v1.endpoints import places, analysis, recommendation, model
from app.core.database import SessionLocal
from app.models.place import Dataset
from app.services import run_artifacts
from app.schemas.run_artifacts import RunsListOut, RunSummary

v1_router = APIRouter(prefix="/api/v1")


def _get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@v1_router.get("/databases", tags=["System"])
def list_databases(db: Session = Depends(_get_session)):
    """List all available dataset db_keys (active only)."""
    rows = (
        db.query(Dataset.db_key)
        .filter(text("datasets.status = 'active'"))
        .order_by(Dataset.db_key)
        .all()
    )
    return [r[0] for r in rows]


@v1_router.get("/projects", tags=["System"])
def list_projects(db: Session = Depends(_get_session)):
    """List detailed project metadata for all active datasets."""
    rows = (
        db.query(Dataset)
        .filter(text("datasets.status = 'active'"))
        .order_by(Dataset.db_key)
        .all()
    )
    return [
        {
            "project_name": ds.project_name,
            "db_id": ds.db_key,
            "date": ds.scraped_at.strftime("%d %b %Y") if ds.scraped_at else None,
            "province": ds.province,
            "city": ds.city,
            "category": ds.category,
            "total_data": ds.total_places,
        }
        for ds in rows
    ]


v1_router.include_router(places.router, prefix="/{db_name}/places", tags=["Places"])
v1_router.include_router(analysis.router, prefix="/{db_name}/analysis", tags=["Analysis"])
v1_router.include_router(recommendation.router, prefix="/{db_name}/recommendation", tags=["Recommendation"])
v1_router.include_router(model.router, prefix="/{db_name}/model", tags=["Model"])


# ---------------------------------------------------------------------------
# GET /api/v1/runs  (P4.2)
# ---------------------------------------------------------------------------

@v1_router.get(
    "/runs",
    response_model=RunsListOut,
    tags=["System"],
    summary="List all active datasets, including their run status",
)
def list_runs(db: Session = Depends(_get_session)):
    """Return every active ``db_key`` and its model run metadata if available.

    Used by the dashboard dataset selector dropdown to show which datasets
    are available and whether they have trained models.
    """
    rows = (
        db.query(Dataset.db_key)
        .filter(text("datasets.status = 'active'"))
        .order_by(Dataset.db_key)
        .all()
    )
    db_keys = [r[0] for r in rows]
    summaries: list[RunSummary] = []

    for db_key in db_keys:
        try:
            if run_artifacts.has_run(db_key):
                cm = run_artifacts.clustering_metadata(db_key)
                rfm = run_artifacts.rf_metadata(db_key)
                params = cm.get("params", {})
                results = cm.get("results", {})
                run_models_dir = run_artifacts.run_dir(db_key) / "models"

                metrics = rfm.get("metrics", {})
                best_model_metrics = metrics.get("best_model", {}) if isinstance(metrics.get("best_model"), dict) else {}

                summaries.append(RunSummary(
                    db_key=db_key,
                    n_clusters=int(results.get("n_clusters", 0)),
                    noise_ratio_pct=float(results.get("noise_ratio_pct", 100.0)),
                    silhouette_score=results.get("silhouette_score"),
                    f1_macro=metrics.get("f1_macro"),
                    rmse=best_model_metrics.get("rmse"),
                    r2=best_model_metrics.get("r2"),
                    eps_meter=float(params.get("eps_meter", 500.0)),
                    min_samples=int(params.get("min_samples", 10)),
                    timestamp=rfm.get("timestamp"),
                    has_model=any(run_models_dir.glob("reg_location_reco_v*.joblib")) or any(run_models_dir.glob("rf_location_reco_v*.joblib")),
                    has_shap=(run_artifacts.run_dir(db_key) / "reports" / "rf_shap_importance.csv").exists(),
                ))
            else:
                # No artifacts yet, but dataset exists
                summaries.append(RunSummary(
                    db_key=db_key,
                    n_clusters=0,
                    noise_ratio_pct=100.0,
                    silhouette_score=None,
                    f1_macro=None,
                    eps_meter=0.0,
                    min_samples=0,
                    timestamp=None,
                    has_model=False,
                    has_shap=False,
                ))
        except Exception:
            # Fall back to default summary if artifacts are corrupt or incomplete
            summaries.append(RunSummary(
                db_key=db_key,
                n_clusters=0,
                noise_ratio_pct=100.0,
                silhouette_score=None,
                f1_macro=None,
                eps_meter=0.0,
                min_samples=0,
                timestamp=None,
                has_model=False,
                has_shap=False,
            ))

    return RunsListOut(runs=summaries, total=len(summaries))
