"""Model management endpoints: async training, status polling, version control, and DB sync.

Phase 5 changes
---------------
- ``run_training_task`` now writes all artifacts into
  ``<ARTIFACTS_DIR>/runs/<db_key>/models/`` (same layout as the notebook).
  The legacy ``fastapi/models/`` directory is no longer written to.
- Artifacts written per retrain:
    rf_location_reco_v{N}.joblib
    rf_metadata.json          (overwritten — always reflects the latest run)
    active.json               (version pointer)
    rf_shap_importance.csv    (regenerated)
    rf_confusion_matrix.png   (regenerated)
    rf_shap_summary.png       (regenerated)
- ``rollback_model`` writes ``active.json`` in the per-run models directory
  so ``run_artifacts.get_latest_model`` picks up the correct version.
- ``list_versions`` already reads from the per-run directory (Phase 2).
"""

from __future__ import annotations

import io
import os
import glob
import json
import logging
import shutil
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")   # non-interactive backend — safe in a background thread
import matplotlib.pyplot as plt
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, Request
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, f1_score
from sklearn.model_selection import GroupShuffleSplit
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.v1.endpoints.analysis import _dataset_id, get_places_df
from app.api.v1.endpoints.recommendation import FEATURE_COLS, build_features
from app.services import run_artifacts
from app.schemas.run_artifacts import (
    ClusteringMetadataOut,
    TrainingReportOut,
    ShapFeatureImportance,
    CategoryDistributionOut,
    FeatureStoreSummaryOut,
)

logger = logging.getLogger(__name__)

router = APIRouter()

# Legacy API-trained model directory (pre-Phase 5).
# Still read by list_versions for backward compatibility, but no longer
# written to.  New retrains write into runs/<db_key>/models/ instead.
_LEGACY_MODEL_DIR = os.path.join(os.getcwd(), "models")

# In-memory job registry: {db_name: {status, error, metrics, version}}
training_jobs: dict[str, dict[str, Any]] = {}


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _save_confusion_matrix_png(cm: list[list[int]], out_path: Path) -> None:
    """Render a 3×3 confusion matrix (Low/Medium/High) and save as PNG."""
    labels = ["Low", "Medium", "High"]
    arr = np.array(cm)
    fig, ax = plt.subplots(figsize=(5, 4))
    im = ax.imshow(arr, cmap="Blues", alpha=0.85)
    ax.set_xticks(range(3)); ax.set_yticks(range(3))
    ax.set_xticklabels(labels); ax.set_yticklabels(labels)
    ax.set_xlabel("Predicted"); ax.set_ylabel("Actual")
    ax.set_title("Confusion Matrix")
    for i in range(arr.shape[0]):
        for j in range(arr.shape[1]):
            ax.text(j, i, arr[i, j], ha="center", va="center", fontsize=11)
    fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    plt.tight_layout()
    plt.savefig(str(out_path), dpi=150, bbox_inches="tight")
    plt.close(fig)


def _save_shap_summary_png(shap_importance_df: pd.DataFrame, out_path: Path) -> None:
    """Render a horizontal bar chart of SHAP global importance and save as PNG."""
    df = shap_importance_df.sort_values("mean_abs_shap", ascending=True)
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.barh(df["feature"], df["mean_abs_shap"], color="#1D4E8F", alpha=0.85)
    ax.set_xlabel("Mean |SHAP value|")
    ax.set_title("SHAP Global Feature Importance")
    plt.tight_layout()
    plt.savefig(str(out_path), dpi=150, bbox_inches="tight")
    plt.close(fig)


# ---------------------------------------------------------------------------
# P5.2 — Background training task (writes into runs/<db_key>/models/)
# ---------------------------------------------------------------------------
def run_training_task(db_name: str, db_session: Session, dataset_id: str) -> None:
    """Full retraining pipeline — artifacts written to per-run directory.

    Output layout (Phase 5):
        <ARTIFACTS_DIR>/runs/<db_key>/models/
            rf_location_reco_v{N}.joblib
            rf_metadata.json          ← overwritten, always latest
            active.json               ← version pointer
        <ARTIFACTS_DIR>/runs/<db_key>/reports/
            rf_shap_importance.csv    ← regenerated
            rf_confusion_matrix.png   ← regenerated
            rf_shap_summary.png       ← regenerated
    """
    try:
        training_jobs[db_name] = {"status": "running", "error": None, "metrics": None, "version": None}

        # ── Resolve output directories ───────────────────────────────────
        models_dir: Path = run_artifacts.run_dir(db_name) / "models"
        reports_dir: Path = run_artifacts.run_dir(db_name) / "reports"
        models_dir.mkdir(parents=True, exist_ok=True)
        reports_dir.mkdir(parents=True, exist_ok=True)

        # ── 1. Fetch places (scoped to this dataset) ─────────────────────
        df = get_places_df(db_session, dataset_id)
        if df.empty or len(df) < 20:
            raise ValueError(
                f"Insufficient data to train (found {len(df)} places, need ≥ 20)."
            )

        # ── 2. Build all 8 features ──────────────────────────────────────
        df_fs = build_features(df)

        # ── 3. Proxy suitability labels (quantile-based, matches notebook) ─
        score = (
            df_fs["rating"] * 0.25
            + np.log1p(df_fs["review"]) * 0.20
            + df_fs["hotspot_score"] * 0.25
            - df_fs["same_category_density_500m"] * 0.20
        )
        q33 = float(np.percentile(score, 33))
        q66 = float(np.percentile(score, 66))
        df_fs["suitability_label"] = pd.cut(
            score,
            bins=[-np.inf, q33, q66, np.inf],
            labels=["Low", "Medium", "High"],
        )

        X = df_fs[FEATURE_COLS].fillna(0)
        y = df_fs["suitability_label"]

        # ── 4. Spatial split (1 km grid — prevents spatial leakage) ──────
        grid_size_m = 1000
        df_fs["grid_id"] = (
            (df_fs["x_utm"] // grid_size_m).astype(int).astype(str)
            + "_"
            + (df_fs["y_utm"] // grid_size_m).astype(int).astype(str)
        )
        gss = GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
        train_idx, test_idx = next(gss.split(X, y, groups=df_fs["grid_id"]))
        X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]

        # ── 5. Train Random Forest ────────────────────────────────────────
        rf = RandomForestClassifier(
            n_estimators=300,
            class_weight="balanced",
            random_state=42,
            n_jobs=-1,
        )
        rf.fit(X_train, y_train)

        # ── 6. Evaluate ───────────────────────────────────────────────────
        pred = rf.predict(X_test)
        f1_macro = float(f1_score(y_test, pred, average="macro"))
        report_dict = classification_report(y_test, pred, output_dict=True)
        cm = [
            [int(v) for v in row]
            for row in pd.crosstab(
                y_test, pd.Series(pred, index=y_test.index),
                rownames=["actual"], colnames=["predicted"]
            ).reindex(index=["Low", "Medium", "High"], columns=["Low", "Medium", "High"], fill_value=0).values
        ]

        # ── 7. Determine next version number ─────────────────────────────
        existing = sorted(models_dir.glob("rf_location_reco_v*.joblib"))
        version = len(existing) + 1
        model_path = models_dir / f"rf_location_reco_v{version}.joblib"

        # ── 8. Save joblib ────────────────────────────────────────────────
        joblib.dump(rf, str(model_path))
        logger.info(f"Saved model v{version} → {model_path}")

        # ── 9. Save rf_metadata.json (overwrite — always latest) ─────────
        meta: dict[str, Any] = {
            "notebook": "api_retrain",
            "timestamp": pd.Timestamp.now().isoformat(),
            "target_db": f"{db_name}.db",
            "run_dir": str(run_artifacts.run_dir(db_name)),
            "model_path": str(model_path),
            "features": FEATURE_COLS,
            "parameters": {
                "n_estimators": 300,
                "class_weight": "balanced",
                "random_seed": 42,
                "spatial_split": "grid_1km_group_shuffle",
            },
            "metrics": {
                "f1_macro": round(f1_macro, 4),
                "confusion_matrix": cm,
                "report": report_dict,
            },
        }
        rf_meta_path = models_dir / "rf_metadata.json"
        with rf_meta_path.open("w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2)

        # ── 10. Write active.json pointer (P5.3) ─────────────────────────
        active_ptr = models_dir / "active.json"
        with active_ptr.open("w", encoding="utf-8") as f:
            json.dump({"active_version": version}, f, indent=2)

        # ── 11. SHAP importance CSV + PNGs (P5.2) ────────────────────────
        try:
            import shap as _shap
            explainer = _shap.TreeExplainer(rf)
            sample_size = min(300, len(X_test))
            X_shap = X_test.sample(sample_size, random_state=42)
            shap_values = explainer.shap_values(X_shap)

            # Compute mean |SHAP| across classes
            if isinstance(shap_values, list):
                abs_means = [
                    pd.DataFrame(v, columns=X_shap.columns).abs().mean()
                    for v in shap_values
                ]
                shap_importance = pd.concat(abs_means, axis=1).mean(axis=1)
            else:
                arr = np.array(shap_values)
                if arr.ndim == 3:
                    shap_importance = pd.Series(
                        np.mean(np.abs(arr), axis=(0, 2)), index=X_shap.columns
                    )
                else:
                    shap_importance = pd.Series(
                        np.mean(np.abs(arr), axis=0), index=X_shap.columns
                    )

            shap_df = (
                shap_importance.reset_index()
                .rename(columns={"index": "feature", 0: "mean_abs_shap"})
                .sort_values("mean_abs_shap", ascending=False)
                .reset_index(drop=True)
            )
            shap_df.columns = ["feature", "mean_abs_shap"]

            # Save CSV
            shap_csv_path = reports_dir / "rf_shap_importance.csv"
            shap_df.to_csv(str(shap_csv_path), index=False)

            # Save summary PNG
            _save_shap_summary_png(shap_df, reports_dir / "rf_shap_summary.png")

        except Exception as shap_exc:
            logger.warning(f"SHAP generation failed (non-fatal): {shap_exc}")

        # Save confusion matrix PNG
        try:
            _save_confusion_matrix_png(cm, reports_dir / "rf_confusion_matrix.png")
        except Exception as cm_exc:
            logger.warning(f"Confusion matrix PNG failed (non-fatal): {cm_exc}")

        # ── 12. Invalidate run_artifacts caches for this db_name ─────────
        # Force the next request to reload the updated rf_metadata.json
        # and the new joblib from disk.
        stale_fs = [k for k in run_artifacts._fs_cache if k[0] == db_name]
        for k in stale_fs:
            del run_artifacts._fs_cache[k]
        stale_model = [k for k in run_artifacts._model_cache if str(model_path) in k[0]]
        for k in stale_model:
            del run_artifacts._model_cache[k]

        training_jobs[db_name] = {
            "status": "completed",
            "error": None,
            "version": version,
            "metrics": {"f1_macro": round(f1_macro, 4), "report": report_dict},
        }
        logger.info(f"Retraining done for '{db_name}' — v{version} · F1 Macro: {f1_macro:.4f}")

    except Exception as exc:
        logger.exception(f"Retraining failed for '{db_name}': {exc}")
        training_jobs[db_name] = {"status": "failed", "error": str(exc), "metrics": None, "version": None}


# ---------------------------------------------------------------------------
# POST /model/retrain
# ---------------------------------------------------------------------------
@router.post("/retrain", summary="Trigger async model retraining")
def trigger_retrain(
    request: Request,
    db_name: str,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """Start a background retraining job for the given dataset.

    Returns immediately with ``status: running``. Poll ``/model/retrain/status``
    to track progress.
    """
    current = training_jobs.get(db_name, {})
    if current.get("status") == "running":
        return {"status": "running", "message": "Training already in progress."}

    background_tasks.add_task(run_training_task, db_name, db, _dataset_id(request))
    return {"status": "running", "message": "Model retraining task triggered."}


# ---------------------------------------------------------------------------
# GET /model/retrain/status
# ---------------------------------------------------------------------------
@router.get("/retrain/status", summary="Poll current training job status")
def get_retrain_status(db_name: str):
    """Return the current training job status for the given dataset.

    Possible statuses: ``idle``, ``running``, ``completed``, ``failed``.
    On ``completed``, the response also includes ``version`` (the new
    model version number) and ``metrics`` (F1 macro + per-class report).
    """
    return training_jobs.get(
        db_name,
        {"status": "idle", "error": None, "metrics": None, "version": None},
    )


# ---------------------------------------------------------------------------
# GET /model/versions
# ---------------------------------------------------------------------------
@router.get("/versions", summary="List all saved model versions and metrics")
def list_versions(db_name: str):
    """Return all persisted model versions for the dataset, newest first.

    Scans ``<ARTIFACTS_DIR>/runs/<db_key>/models/`` for versioned joblib
    files and reads their accompanying ``rf_metadata.json``.  Falls back
    to the legacy ``fastapi/models/`` directory for any API-trained models
    that pre-date Phase 5.
    """
    versions: list[dict] = []

    # ── Per-run directory (notebook + API-trained after Phase 5) ────────
    run_models_dir = run_artifacts.run_dir(db_name) / "models"
    if run_models_dir.exists():
        for joblib_path in sorted(run_models_dir.glob("rf_location_reco_v*.joblib")):
            # Extract version number from filename
            stem = joblib_path.stem  # e.g. rf_location_reco_v2
            try:
                version_num = int(stem.rsplit("v", 1)[-1])
            except ValueError:
                continue
            meta = run_artifacts._read_json_safe(run_models_dir / "rf_metadata.json")
            versions.append({
                "version": version_num,
                "source": "run",
                "timestamp": meta.get("timestamp"),
                "f1_macro": meta.get("metrics", {}).get("f1_macro"),
                "features": meta.get("features"),
                "model_path": str(joblib_path),
            })

    # ── Legacy API-trained directory (pre-Phase 5) ───────────────────────
    if os.path.exists(_LEGACY_MODEL_DIR):
        for meta_path in sorted(glob.glob(os.path.join(_LEGACY_MODEL_DIR, f"{db_name}_rf_v*_metadata.json"))):
            try:
                with open(meta_path, "r", encoding="utf-8") as f:
                    meta = json.load(f)
                versions.append({
                    "version": meta.get("version"),
                    "source": "api_legacy",
                    "timestamp": meta.get("timestamp"),
                    "f1_macro": meta.get("metrics", {}).get("f1_macro"),
                    "features": meta.get("features"),
                    "model_path": meta.get("model_path"),
                })
            except Exception:
                continue

    # Resolve active version — check per-run active.json first
    active_version: int | None = None
    active_ptr = run_artifacts.run_dir(db_name) / "models" / "active.json"
    if active_ptr.exists():
        try:
            with active_ptr.open("r", encoding="utf-8") as f:
                active_version = json.load(f).get("active_version")
        except Exception:
            pass

    if active_version is None:
        # Fall back to legacy active pointer
        legacy_ptr = os.path.join(_LEGACY_MODEL_DIR, f"{db_name}_active.json")
        if os.path.exists(legacy_ptr):
            try:
                with open(legacy_ptr, "r", encoding="utf-8") as f:
                    active_version = json.load(f).get("active_version")
            except Exception:
                pass

    if active_version is None and versions:
        active_version = max(
            (v["version"] for v in versions if v["version"] is not None),
            default=None,
        )

    return {
        "versions": sorted(
            versions,
            key=lambda x: (x["version"] or 0),
            reverse=True,
        ),
        "active_version": active_version,
    }


# ---------------------------------------------------------------------------
# POST /model/rollback
# ---------------------------------------------------------------------------
@router.post("/rollback", summary="Activate a specific model version")
def rollback_model(
    db_name: str,
    version: int = Query(..., description="Target version to make active"),
):
    """Set a previously trained model version as the active model.

    Writes ``active.json`` in ``<ARTIFACTS_DIR>/runs/<db_key>/models/``
    so that ``run_artifacts.get_latest_model`` picks up the correct
    version on the next inference request.

    Falls back to the legacy ``fastapi/models/`` directory for versions
    that pre-date Phase 5.
    """
    # ── Look in per-run directory first (Phase 5 layout) ────────────────
    run_models_dir = run_artifacts.run_dir(db_name) / "models"
    model_path = run_models_dir / f"rf_location_reco_v{version}.joblib"

    if not model_path.exists():
        # Fall back to legacy naming convention
        legacy_model = Path(_LEGACY_MODEL_DIR) / f"{db_name}_rf_v{version}.joblib"
        if not legacy_model.exists():
            raise HTTPException(
                status_code=404,
                detail=f"Model version {version} not found in run directory or legacy directory.",
            )
        # Promote legacy model into the per-run directory so future
        # requests find it via the standard path
        run_models_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(str(legacy_model), str(model_path))
        logger.info(f"Promoted legacy model v{version} → {model_path}")

    try:
        # P5.3 — write active.json in the per-run models directory
        active_ptr = run_models_dir / "active.json"
        with active_ptr.open("w", encoding="utf-8") as f:
            json.dump({"active_version": version}, f, indent=2)

        # Evict the cached model so the next request loads the new active version
        stale = [k for k in run_artifacts._model_cache]
        for k in stale:
            del run_artifacts._model_cache[k]

        return {
            "status": "success",
            "db_name": db_name,
            "active_version": version,
            "message": f"Model rolled back to version {version}.",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Rollback failed: {exc}") from exc


# ---------------------------------------------------------------------------
# POST /model/sync-db
# ---------------------------------------------------------------------------
@router.post("/sync-db", summary="Sync cluster_id from feature store back into Postgres")
def sync_db(
    request: Request,
    db_name: str,
    db: Session = Depends(get_db),
):
    """Copy ``cluster_id`` values from the training pipeline's per-run feature
    store into the corresponding rows of the Postgres ``places`` table.

    This bridges the training repo output with the live API database so that
    the ``cluster_id`` column is available for inference without retraining.

    Feature store path (resolved from `Settings.ARTIFACTS_DIR`):
    ``<ARTIFACTS_DIR>/runs/<db_name>/data/feature_store.csv``

    Match strategy:
      1. Try the integer ``id`` column (primary key set during ingestion). The
         training pipeline preserves it through validation, so this matches
         the vast majority of rows.
      2. Fall back to a ``(name, lat≈, lng≈)`` composite key for any rows
         that don't match by id (legacy data, manual edits, etc.).
    """
    dataset_id = _dataset_id(request)

    feature_store_path = os.path.join(str(run_artifacts.run_dir(db_name)), "data", "feature_store.csv")
    if not os.path.exists(feature_store_path):
        raise HTTPException(
            status_code=404,
            detail=(
                f"Feature store not found at {feature_store_path}. "
                "Run the training pipeline (or scripts/sync_artifacts.py) first."
            ),
        )

    try:
        # ── Load only the columns we need from the feature store ────────
        fs = pd.read_csv(
            feature_store_path,
            usecols=["id", "name", "latitude", "longitude", "cluster_id"],
        )
        fs["cluster_id"] = pd.to_numeric(fs["cluster_id"], errors="coerce").astype("Int64")
        fs_id_map = (
            fs.dropna(subset=["id", "cluster_id"])
            .drop_duplicates(subset=["id"])
            .set_index("id")["cluster_id"]
            .to_dict()
        )

        fs_named = fs.copy()
        fs_named["name_key"] = fs_named["name"].astype(str).str.strip().str.lower()
        fs_named["lat_key"] = pd.to_numeric(fs_named["latitude"], errors="coerce").round(5)
        fs_named["lng_key"] = pd.to_numeric(fs_named["longitude"], errors="coerce").round(5)
        fs_name_map = (
            fs_named.dropna(subset=["cluster_id", "lat_key", "lng_key"])
            .drop_duplicates(subset=["name_key", "lat_key", "lng_key"])
            .set_index(["name_key", "lat_key", "lng_key"])["cluster_id"]
            .to_dict()
        )

        # ── Pull current places for this dataset ────────────────────────
        rows = db.execute(
            text(
                "SELECT id, place_name, latitude, longitude "
                "FROM places "
                "WHERE dataset_id = :dataset_id AND is_deleted = false"
            ),
            {"dataset_id": dataset_id},
        ).all()

        # ── Build the (place_id → cluster_id) update list ───────────────
        updates: list[dict[str, int]] = []
        matched_by_id = matched_by_name = 0
        unmatched = 0

        for row in rows:
            place_id = int(row.id)
            cluster_id = fs_id_map.get(place_id)

            if cluster_id is None or pd.isna(cluster_id):
                # Fallback: name + rounded coordinate
                name_key = (row.place_name or "").strip().lower()
                try:
                    lat_key = round(float(row.latitude), 5)
                    lng_key = round(float(row.longitude), 5)
                except (TypeError, ValueError):
                    lat_key = lng_key = None

                if lat_key is not None and lng_key is not None:
                    cluster_id = fs_name_map.get((name_key, lat_key, lng_key))
                    if cluster_id is not None and not pd.isna(cluster_id):
                        matched_by_name += 1
            else:
                matched_by_id += 1

            if cluster_id is None or pd.isna(cluster_id):
                unmatched += 1
                continue

            updates.append({"pid": place_id, "cid": int(cluster_id)})

        # ── Apply the update in a single transaction ───────────────────
        if updates:
            stmt = text(
                "UPDATE places SET cluster_id = :cid, updated_at = NOW() "
                "WHERE id = :pid AND dataset_id = :dataset_id"
            )
            for chunk_start in range(0, len(updates), 500):
                chunk = updates[chunk_start : chunk_start + 500]
                payload = [{**row, "dataset_id": dataset_id} for row in chunk]
                db.execute(stmt, payload)
            db.commit()
        else:
            db.rollback()

        return {
            "status": "success",
            "db_name": db_name,
            "matched": len(updates),
            "matched_by_id": matched_by_id,
            "matched_by_name": matched_by_name,
            "unmatched": unmatched,
            "total": len(rows),
            "message": (
                f"Synced cluster_id for {len(updates)}/{len(rows)} places "
                f"(by id: {matched_by_id}, by name+coord: {matched_by_name})."
            ),
        }

    except HTTPException:
        raise
    except Exception as exc:
        db.rollback()
        logger.exception(f"sync-db failed for {db_name}: {exc}")
        raise HTTPException(status_code=500, detail=f"Sync failed: {exc}") from exc


# ===========================================================================
# Phase 4 — Read-only artifact endpoints for the admin UI
# ===========================================================================

# ---------------------------------------------------------------------------
# GET /model/clustering-metadata
# ---------------------------------------------------------------------------
@router.get(
    "/clustering-metadata",
    response_model=ClusteringMetadataOut,
    summary="Get DBSCAN clustering metadata for this dataset",
    tags=["Model"],
)
def get_clustering_metadata(db_name: str):
    """Return the full ``clustering_metadata.json`` produced by the training
    notebook for this dataset.

    Includes DBSCAN parameters (eps, min_samples), quality metrics
    (silhouette score, Davies-Bouldin index, noise ratio), and the
    feature column list.
    """
    try:
        data = run_artifacts.clustering_metadata(db_name)
        return data
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception(f"clustering-metadata failed for '{db_name}': {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


# ---------------------------------------------------------------------------
# GET /model/training-report
# ---------------------------------------------------------------------------
@router.get(
    "/training-report",
    response_model=TrainingReportOut,
    summary="Get Random Forest training report for this dataset",
    tags=["Model"],
)
def get_training_report(db_name: str):
    """Return the full ``rf_metadata.json`` for the latest training run.

    Includes the 8-feature list, RF hyperparameters, F1 macro score,
    per-class precision/recall/F1, and the confusion matrix.
    """
    try:
        data = run_artifacts.rf_metadata(db_name)
        return data
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception(f"training-report failed for '{db_name}': {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


# ---------------------------------------------------------------------------
# GET /model/shap-importance
# ---------------------------------------------------------------------------
@router.get(
    "/shap-importance",
    response_model=list[ShapFeatureImportance],
    summary="Get SHAP global feature importance for this dataset",
    tags=["Model"],
)
def get_shap_importance(db_name: str):
    """Return the global SHAP importance table from ``rf_shap_importance.csv``.

    Rows are sorted descending by ``mean_abs_shap``.  The admin UI uses
    this to render a horizontal bar chart showing which features drive
    the suitability score most.
    """
    try:
        df = run_artifacts.shap_importance(db_name)
        return df.to_dict(orient="records")
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception(f"shap-importance failed for '{db_name}': {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


# ---------------------------------------------------------------------------
# GET /model/category-distribution
# ---------------------------------------------------------------------------
@router.get(
    "/category-distribution",
    response_model=CategoryDistributionOut,
    summary="Get category distribution for this dataset's training run",
    tags=["Model"],
)
def get_category_distribution(db_name: str):
    """Return the category distribution recorded during training.

    Merges ``category_distribution_valid.json`` (post-validation counts,
    preferred) with ``category_distribution.json`` (raw counts, fallback).

    Response contains:
    - ``top10`` — top 10 categories by count
    - ``all`` — full list sorted descending by count
    """
    try:
        return run_artifacts.category_distribution(db_name)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception(f"category-distribution failed for '{db_name}': {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc


# ---------------------------------------------------------------------------
# GET /model/reports/{name}
# ---------------------------------------------------------------------------

# Whitelisted report filenames — mirrors run_artifacts.REPORT_WHITELIST
_REPORT_WHITELIST = run_artifacts.REPORT_WHITELIST

@router.get(
    "/reports/{name}",
    summary="Serve a whitelisted training report image or CSV",
    tags=["Model"],
    responses={
        200: {"content": {"image/png": {}, "text/csv": {}}},
        404: {"description": "Report not found"},
        400: {"description": "Report name not whitelisted"},
    },
)
def get_report(db_name: str, name: str):
    """Serve a static report file produced by the training notebook.

    Whitelisted names:

    - ``clustering_result.png`` — cluster scatter plot
    - ``cluster_vs_noise.png`` — cluster vs noise bar chart
    - ``category_distribution_top10.png`` — top-10 category bar chart
    - ``rf_confusion_matrix.png`` — RF confusion matrix heatmap
    - ``rf_shap_summary.png`` — SHAP beeswarm summary
    - ``rf_shap_waterfall.png`` — SHAP waterfall for one sample
    - ``k_distance_graph.png`` — k-distance graph for EPS tuning
    - ``rf_shap_importance.csv`` — SHAP importance table (CSV)

    Any other filename returns 400 to prevent path traversal.
    """
    from fastapi.responses import FileResponse

    # Extend whitelist to include the CSV (served as download)
    extended_whitelist = _REPORT_WHITELIST | {"rf_shap_importance.csv"}

    if name not in extended_whitelist:
        raise HTTPException(
            status_code=400,
            detail=(
                f"'{name}' is not a whitelisted report name. "
                f"Allowed: {sorted(extended_whitelist)}"
            ),
        )

    try:
        # For CSV, use reports/ path directly
        if name.endswith(".csv"):
            path = run_artifacts.run_dir(db_name) / "reports" / name
            if not path.exists():
                raise FileNotFoundError(f"Report not found: {path}")
        else:
            path = run_artifacts.report_path(db_name, name)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc

    media_type = "text/csv" if name.endswith(".csv") else "image/png"
    return FileResponse(
        path=str(path),
        media_type=media_type,
        filename=name,
    )


# ---------------------------------------------------------------------------
# GET /model/feature-store-summary
# ---------------------------------------------------------------------------
@router.get(
    "/feature-store-summary",
    response_model=FeatureStoreSummaryOut,
    summary="Get a lightweight summary of the feature store (QA)",
    tags=["Model"],
)
def get_feature_store_summary(
    db_name: str,
    head_n: int = Query(5, ge=1, le=20, description="Number of sample rows to return"),
):
    """Return row count, column list, dtypes, null counts, and a sample
    of the feature store CSV.

    Intended for admin QA — not for production inference.
    """
    try:
        return run_artifacts.feature_store_summary(db_name, head_n=head_n)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception(f"feature-store-summary failed for '{db_name}': {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc
