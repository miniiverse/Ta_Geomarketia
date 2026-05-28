# FastAPI Inference API — Alignment Plan with Per-DB Training

> **Owner:** Backend (FastAPI)
> **Companion training repo:** `c:\Users\DANN\Documents\project\geomarketia-train`
> **Status:** Phase 1 ✅ · Phase 2 ✅ · Phase 3 ✅ · Phase 4 ✅ · Phase 5 ✅ · Phase 6 🔲 · Last updated 2026-05-28
> **Related docs:** [sprint_progress_report.md](../frontend/plan/sprint_progress_report.md), training repo [`prd.md`](../../geomarketia-train/prd.md), [`geomarket.md`](../../geomarketia-train/geomarket.md)

---

## 0 · TL;DR

The training pipeline now runs **one SQLite per run** and writes all artifacts under `content/runs/<db_key>/{data,models,reports}/`. The FastAPI inference layer has not caught up:

1. `get_places_df()` in `analysis.py` returns **every place from Postgres** — there is no `dataset_id` filter, so a `/api/v1/Indonesia.Batam.Hotel.../analysis/heatmap` call analyses all 8 datasets together.
2. ML hyperparameters (DBSCAN `eps`, `min_samples`, KDE bandwidth, candidate grid step, neighbour radii) are **hardcoded** in the endpoints. The notebook records the actual values used per run in `clustering_metadata.json` — those are what should drive serving.
3. `recommendation.py:build_features()` **recomputes** the 8-feature vector from raw places on every call. The training repo already wrote a labelled `feature_store.csv` per run; serving should consume it.
4. `model.py:sync-db` is **broken**: it still imports `_sessionmakers, _engines` from the old SQLite multi-DB router (those names no longer exist after the Postgres migration) and writes to `fastapi/db/*.db` files that are no longer the source of truth.
5. There is no API surface for the per-run reports the training pipeline produces (confusion matrix, SHAP importance, category distribution, k-distance graph). The admin Model and Logs pages need these to stop using dummy data.

This plan resolves all five issues, locks the inference path to the artifacts the notebook produces, and adds the read-only endpoints the admin UI needs.

---

## 1 · System Map (current state)

```
┌──────────────────────────┐        ┌──────────────────────────────────┐
│  geomarketia-train       │        │  geomarket/fastapi               │
│  (Jupyter notebook)      │        │  (FastAPI inference API)         │
│                          │        │                                  │
│  per-db training run     │        │  /api/v1/{db_name}/...           │
│      │                   │        │       │                          │
│      ▼                   │        │       ▼                          │
│  content/runs/<db_key>/  │  ◀───  │  reads artifacts (TODO)          │
│   ├ data/                │        │   - feature_store.csv            │
│   │   ├ feature_store.csv│        │   - clustering_metadata.json     │
│   │   ├ category_*.json  │        │   - rf_metadata.json             │
│   │   └ db_with_cluster/ │        │   - rf_*.joblib                  │
│   ├ models/              │        │   - rf_shap_importance.csv       │
│   │   ├ clustering_meta… │        │                                  │
│   │   ├ rf_location_…    │        │  Postgres (Supabase)             │
│   │   └ rf_metadata.json │        │   - datasets (db_key → id)       │
│   └ reports/             │        │   - places (dataset_id, …,       │
│       ├ *.png            │        │              cluster_id)         │
│       └ rf_shap_…csv     │        │                                  │
└──────────────────────────┘        └──────────────────────────────────┘
```

**Resolution rule (must hold for every endpoint):**

```
db_name (URL path)
   ─► Dataset.db_key           (resolved in app/api/deps.py:get_db)
   ─► Dataset.id (UUID)        (cached on request.state.dataset_id)
   ─► Place.dataset_id          (filter for every query)
   ─► content/runs/<db_name>/   (filesystem prefix for all run artifacts)
```

---

## 2 · Training Pipeline Recap

The notebook (`geomarketia_train.ipynb`) executes 10 stages per run. Inference must reproduce stages 5, 6, and 10's behaviour exactly when scoring new candidate points.

| Stage | Output | What inference depends on |
|---|---|---|
| 1–4 | Validation gate, rejected rows | — |
| 5 (Preprocessing) | UTM coords (`x_utm`, `y_utm`), `review_log`, normalised category | Same coordinate transform must be used for candidate points |
| 6 (DBSCAN) | `cluster_id`, centroids, density features | Need `eps_meter` & `min_samples` from `clustering_metadata.json`; need centroid coordinates to assign `cluster_id` to new points |
| 7 (Visualisations) | `*.png`, `category_distribution_top10.png` | Surfaced read-only via admin endpoints |
| 8 (Feature store export) | `data/feature_store.csv` (19 columns) | **Primary inference data source** — labelled per-place spatial features |
| 9 (Quality gate) | passes/fails recorded in `clustering_metadata.json` | Inference should refuse to score if `n_clusters == 0` (e.g. Hotel run produced 0 clusters / 100% noise) |
| 10 (RF training) | `rf_location_reco_v*.joblib`, `rf_metadata.json`, `rf_shap_importance.csv`, `rf_confusion_matrix.png`, `rf_shap_*.png` | Latest model = highest version unless an active pointer is set |

### 2.1 Feature contract (the 19 columns of `feature_store.csv`)

```
id, name, category, source_category, source_file, source_table,
latitude, longitude, x_utm, y_utm,
cluster_id, dist_to_cluster_centroid_m,
competitor_density_500m, competitor_density_1km, same_category_density_500m,
nearest_neighbor_dist_m,
rating, review_log, price_level
```

The Random Forest is trained on **8 of these**:

```
rating, review_log, hotspot_score,
competitor_density_500m, same_category_density_500m,
nearest_neighbor_dist_m, dist_to_cluster_centroid_m, cluster_id
```

`hotspot_score` is computed inside RF training (Stage 10) via a KDE with `bandwidth=500m` and **is not** in `feature_store.csv`. It must be recomputed at serving time from `feature_store.csv` coordinates — this is the only feature inference reproduces from scratch.

### 2.2 What varies per `db_key`

`clustering_metadata.json` differs per run. Two real examples:

| Field | Kuliner | Hotel |
|---|---|---|
| `eps_meter` | 500 | 500 |
| `min_samples` | 10 | 10 |
| `n_clusters` | 26 | 0 |
| `n_noise` | 631 | 99 |
| `noise_ratio_pct` | 15.0 | 100.0 |
| `silhouette_score` | 0.4396 | null |
| `davies_bouldin_idx` | 0.3735 | null |

The Hotel run is a **degenerate case** — DBSCAN found no clusters because the dataset has 99 hotels spread across Batam. Inference must short-circuit gracefully (`/recommendation/location` should return a heuristic-only fallback or 422 with a clear message).

`rf_metadata.json` records the model file path, the 8-feature list (canonical order), F1 macro, classification report, and confusion matrix per run.

---

## 3 · Gap Analysis

### 3.1 Critical bugs (must fix in Phase 1)

| # | File | Problem | Impact |
|---|---|---|---|
| C1 | `app/api/v1/endpoints/analysis.py:get_places_df` | No `dataset_id` filter | All `/analysis/*` endpoints return cross-dataset results regardless of `db_name` |
| C2 | `app/api/v1/endpoints/model.py:sync-db` | Imports `_sessionmakers, _engines` (do not exist), writes to `fastapi/db/*.db` (gone) | Endpoint raises `ImportError` on call; admin import wizard's commit step fires this and silently fails |
| C3 | `app/api/v1/endpoints/recommendation.py:get_places_df` (re-imported) | Same as C1 | Recommendations score candidates against the union of all datasets |
| C4 | `app/api/v1/endpoints/analysis.py` Batam bbox | `0.7 ≤ lat ≤ 1.5, 103.5 ≤ lng ≤ 104.5` | Wider than the training repo (`1.0–1.3, 103.6–104.2`); admits coastal noise points the notebook rejected |
| C5 | `app/api/v1/endpoints/recommendation.py:build_features` | DBSCAN re-run on every call with `eps=150, min_samples=10` | Produces `cluster_id` values inconsistent with the trained model's expectation; model was trained on `eps=500` per run |

### 3.2 Fidelity gaps (Phase 2–3)

| # | Topic | Current | Should be |
|---|---|---|---|
| F1 | Hyperparameters | Hardcoded in endpoint signatures | Read from `runs/<db_key>/models/clustering_metadata.json` (`eps_meter`, `min_samples`); query params override only |
| F2 | Feature store | Recomputed every request from raw places | Loaded from `runs/<db_key>/data/feature_store.csv` and cached |
| F3 | Cluster assignment for candidate grid | Re-runs DBSCAN on raw places | Uses centroids derived from the training feature store; new candidates get the nearest centroid (or `-1` if > `eps`) |
| F4 | Hotspot KDE bandwidth | Hardcoded `500.0` | Already correct (matches notebook) — keep constant, document why |
| F5 | Model resolution order | API-trained → per-db run → legacy global | OK for now; legacy path becomes orphaned once API training writes into `runs/<db_key>/models/` (Phase 5) |
| F6 | `cluster_id` in Postgres | Synced via the broken `sync-db` endpoint | Sync-db rewritten to copy `cluster_id` from `feature_store.csv` into `places` (Postgres `UPDATE`) |

### 3.3 Missing read endpoints for the admin UI (Phase 4)

The admin pages (`/admin/model`, `/admin/logs`, `/admin/config`) currently render dummy data. To replace it, the inference API needs to expose the run artifacts:

- DBSCAN metadata (eps, min_samples, n_clusters, noise ratio, silhouette, DB index)
- RF metadata (features, hyperparameters, F1, accuracy, per-class report, confusion matrix)
- SHAP global importance (CSV → JSON array)
- Category distribution (top-10 + full)
- Static report images (PNG via `FileResponse`)

---

## 4 · API Surface (target)

> All paths are prefixed by `/api/v1/{db_name}` unless marked otherwise. `{db_name}` resolves to a `Dataset` row.

### 4.1 Existing — keep as-is (after fixes)

| Method | Path | Notes |
|---|---|---|
| GET | `/places` … `/places/nearby` | Already correct (CRUD layer scopes by `dataset_id`) |
| GET | `/analysis/heatmap` | Fix `dataset_id` filter; bandwidth stays `resolution_m * 1.5` |
| GET | `/analysis/clusters` | Read default `eps`/`min_samples` from clustering metadata; allow override |
| GET | `/analysis/competition` | Already correct shape — fix `dataset_id` filter |
| GET | `/analysis/market-gap` | Same |
| GET | `/analysis/saturation` | Same |
| GET | `/analysis/market-composition` | Same |
| GET | `/analysis/dominant-category` | Same |
| GET | `/analysis/market-motif` | Same |
| POST | `/recommendation/location` | Use feature store + cached model |
| POST | `/model/retrain` | Write artifacts into `runs/<db_key>/` instead of `fastapi/models/` (Phase 5) |
| GET | `/model/retrain/status` | OK |
| GET | `/model/versions` | Read from `runs/<db_key>/models/` |
| POST | `/model/rollback` | Rewrite active pointer in `runs/<db_key>/models/` |
| POST | `/model/sync-db` | Rewrite to update Postgres `places.cluster_id` from per-run feature store |

### 4.2 New endpoints (Phase 4)

| Method | Path | Returns |
|---|---|---|
| GET | `/model/clustering-metadata` | Full `clustering_metadata.json` payload |
| GET | `/model/training-report` | Latest `rf_metadata.json` (features, parameters, metrics, confusion_matrix) |
| GET | `/model/shap-importance` | `[{feature, mean_abs_shap}, …]` from `rf_shap_importance.csv` |
| GET | `/model/category-distribution` | `{ top10: [...], all: [...] }` from `category_distribution*.json` |
| GET | `/model/reports/{name}` | `FileResponse` for PNGs in `runs/<db_key>/reports/` (whitelisted names only) |
| GET | `/model/feature-store-summary` | Row count, column dtypes, head N — for QA only |
| GET | `/system/runs` | (Top-level, no `db_name`) lists every `db_key` that has both a feature store and an `rf_metadata.json` |

### 4.3 Out of scope for this iteration

- Heatmap caching layer (Redis) — stays out until Phase 6
- JWT forwarding from Next.js — frontend's responsibility
- Async sync-db job queue — sync-db remains synchronous and idempotent

---

## 5 · Phased Implementation

Each phase is independently shippable. Tick a box when complete.

### Phase 1 — Critical fixes ✅ Complete · 2026-05-28

- [x] **P1.1** *(2026-05-28)* Add `Place.dataset_id` filter to `analysis.py:get_places_df`. Accepts `dataset_id: str` arg; raises `ValueError` (surfaced as 500) if called without one. All 9 analysis endpoints now pass `_dataset_id(request)`.
  - *Files:* `app/api/v1/endpoints/analysis.py`
- [x] **P1.2** *(2026-05-28)* Tighten bbox to notebook range (`1.0 ≤ lat ≤ 1.3`, `103.6 ≤ lng ≤ 104.2`). Added `BATAM_LAT_MIN/MAX`, `BATAM_LNG_MIN/MAX`, `in_batam_bbox()` to `app/utils/geo.py`. Removed the old inline `0.7 / 1.5 / 103.5 / 104.5` literals.
  - *Files:* `app/utils/geo.py`, `app/api/v1/endpoints/analysis.py`
- [x] **P1.3** *(2026-05-28)* Rewrote `sync-db` for Postgres. Removed dead `sqlite3`, `_sessionmakers`, `_engines` imports. New implementation: loads feature store CSV, matches by integer `id` first, falls back to `(name, lat≈, lng≈)` composite key, then batches `UPDATE places SET cluster_id = :cid` in 500-row chunks inside a single transaction.
  - *Files:* `app/api/v1/endpoints/model.py`
  - *Smoke test result:* Kuliner 4158/4570 matched (≈91%); Hotel 97/99 matched. Both by name+coord fallback (Postgres serial ids differ from SQLite ids — noted as future improvement).
- [x] **P1.4** *(2026-05-28)* `recommendation.py` now imports `get_places_df` and `_dataset_id` from `analysis.py` (single source of truth). Removed the duplicate local import of `Place`. `recommend_location` passes `_dataset_id(request)` into `get_places_df`.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P1.5** *(2026-05-28)* Smoke tests passed:
  - `GET /api/v1/Indonesia.Batam.Hotel.…/analysis/heatmap` → 1108 grid points, Hotel-domain categories only (no Kuliner leakage).
  - `GET /api/v1/Indonesia.Batam.Hotel.…/analysis/market-composition` → Hotel, Lodging, Guest house, Condominium complex… ✓
  - `GET /api/v1/Bogus.Nonexistent/analysis/heatmap` → 404 from `get_db` ✓
  - `POST /api/v1/Indonesia.Batam.Kuliner.…/model/sync-db` → `{"matched":4158,"total":4570}` ✓
  - `GET /api/v1/Indonesia.Batam.Kuliner.…/places` → `cluster_id: 0` populated on rows ✓
- [x] **P1.6** *(2026-05-28)* Added `Settings.ARTIFACTS_DIR` to `app/core/config.py`. Relative paths resolve from `BASE_DIR` (`fastapi/`), not process CWD. Exported `ARTIFACTS_PATH` and `RUNS_PATH` module-level constants. Replaced the six-`..` path hack in `recommendation.py` and `model.py` with `RUNS_PATH`. Added `artifacts/` to `fastapi/.gitignore`. Set `ARTIFACTS_DIR=../../geomarketia-train/content` in `.env` for local dev.
  - *Files:* `app/core/config.py`, `app/api/v1/endpoints/recommendation.py`, `app/api/v1/endpoints/model.py`, `fastapi/.gitignore`, `fastapi/.env`, `fastapi/.env.example`
  - *Verified:* `RUNS_PATH` resolves to `C:\Users\DANN\Documents\project\geomarketia-train\content\runs` and `exists: True`.

**Deliverable met:** every `/analysis/*` and `/recommendation/*` call is scoped to its `db_name`. `sync-db` succeeds against Postgres. Six-`..` path hack gone.

---

### Phase 2 — Run-artifact loader (read-only foundation) ✅ Complete · 2026-05-28

- [x] **P2.1** *(2026-05-28)* New module `app/services/run_artifacts.py` with full public API:
  `run_dir`, `has_run`, `list_runs`, `feature_store`, `clustering_metadata`, `rf_metadata`,
  `category_distribution`, `shap_importance`, `get_latest_model`, `report_path`, `feature_store_summary`.
  Also added `app/services/__init__.py`.
  - *Files:* `app/services/__init__.py`, `app/services/run_artifacts.py`
- [x] **P2.2** *(2026-05-28)* Module-level dict caches keyed on `(db_name, file_mtime_ns)` for
  `feature_store` (heavy CSV) and joblib models. Stale entries for the same `db_name` are evicted
  automatically when the file changes. Lightweight JSON files are re-read on every call.
  - *Files:* `app/services/run_artifacts.py` (`_fs_cache`, `_model_cache`)
- [x] **P2.3** *(2026-05-28)* Migrated all path-resolution and model-loading logic out of
  `recommendation.py:get_latest_model_and_meta` into `run_artifacts.get_latest_model`. The old
  function is now a one-line wrapper for backward compatibility. `model.py` also updated to use
  `run_artifacts.run_dir` for the feature store path in `sync-db`, and `list_versions` now scans
  `runs/<db_key>/models/` (per-run) plus the legacy `fastapi/models/` directory.
  - *Files:* `app/api/v1/endpoints/recommendation.py`, `app/api/v1/endpoints/model.py`
- [x] **P2.4** *(2026-05-28)* Functional tests passed in Python REPL:
  - `list_runs()` → 8 db_keys ✓
  - Kuliner: `feature_store` 4206 rows × 19 cols, `clustering_metadata` n_clusters=26 eps=500,
    `rf_metadata` f1_macro=0.9655, `category_distribution` top10=10/all=212,
    `shap_importance` 8 features (top: `same_category_density_500m`),
    `get_latest_model` → `RandomForestClassifier` ✓
  - Hotel (degenerate): `has_run=True`, `n_clusters=0`, `noise_ratio=100%`,
    `get_latest_model` → `RandomForestClassifier` (model still exists despite 0 clusters) ✓
  - Live server: `GET /model/versions` returns `"source":"run"` with correct F1 and feature list ✓
- [x] **P2.5** *(2026-05-28)* Added `scripts/sync_artifacts.py`. CLI supports `--db <key>`,
  `--all`, `--source`, `--dest`, `--dry-run`. Copies 15 whitelisted files per run (CSV, JSON,
  joblib, PNGs). Dry-run verified: 15 files identified for Kuliner, 0 skipped.
  - *Files:* `scripts/sync_artifacts.py`

### Phase 3 — Inference uses the feature store ✅ Complete · 2026-05-28

- [x] **P3.1** *(2026-05-28)* Refactored into two functions:
  - `existing_features(db_name)` — thin wrapper over `run_artifacts.feature_store(db_name)`, the single source of truth for all spatial features.
  - `score_candidate_grid(db_name, category, step_m=250)` — generates a UTM candidate grid clipped to the Batam UTM bbox (`x: 344k–411k`, `y: 110k–144k`), filters feature-store rows to the same bbox to remove outlier coordinates, then computes all 8 RF features from the feature store.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P3.2** *(2026-05-28)* Cluster assignment for candidate points uses centroids derived from `feature_store.groupby("cluster_id")[["x_utm","y_utm"]].mean()`. Per-run `eps_meter` from `clustering_metadata.json` is used as the noise threshold (not a hardcoded 750 m). No DBSCAN re-run at serving time.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P3.3** *(2026-05-28)* Hotspot KDE fitted on feature-store coordinates with `bandwidth=500 m` (`_HOTSPOT_KDE_BANDWIDTH_M`). Constant documented with reference to `geomarketia_train.ipynb` Tahap 9.1.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P3.4** *(2026-05-28)* All density features (`competitor_density_500m`, `same_category_density_500m`, `nearest_neighbor_dist_m`) computed via `BallTree` on feature-store coordinates — identical to the notebook's Tahap 5.4.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P3.5** *(2026-05-28)* Degenerate-run handling: if `clustering_metadata.n_clusters == 0`, endpoint returns HTTP 422 with `code: "no_clusters"`, `detail` (includes `noise_ratio_pct`), and `recommendations` list from `_heuristic_score_grid` (hotspot − same-category density, min-max normalised). SHAP is empty dict for heuristic results.
  - *Files:* `app/api/v1/endpoints/recommendation.py`
- [x] **P3.6** *(2026-05-28)* SHAP `TreeExplainer` runs only on the top-N candidates (not the full grid). 3-D `shap_values` indexing `[i, f, class_idx]` preserved. Verified 8 SHAP keys per recommendation.
  - *Files:* `app/api/v1/endpoints/recommendation.py`

**Bug fixed during testing:** `np.arange(x_min, x_max, step)` over raw UTM coordinates produced 61M grid points (Batam UTM x-values are ~370k–393k, not 0–23k). Fixed by clamping grid extent to `_BATAM_UTM_X/Y_MIN/MAX` constants and filtering feature-store outliers before building BallTrees.

**Data note:** Kuliner dataset contains a small number of "Hotel" rows from scraping noise. This is a data quality issue in the source SQLite, not a code bug. The dataset filter is working correctly — Hotel categories do not appear in Kuliner's top-5.

**Deliverable met:** `POST /recommendation/location?category=restaurant` for Kuliner returns deterministic top-5 coordinates sourced from the feature store (verified: second call returns identical lat). Hotel returns HTTP 422 + heuristic fallback with valid Batam coordinates.

---

### Phase 4 — New read-only endpoints for admin pages ✅ Complete · 2026-05-28

- [x] **P4.1** *(2026-05-28)* Extended `app/api/v1/endpoints/model.py` with 6 new GET endpoints:
  - `GET /model/clustering-metadata` → `run_artifacts.clustering_metadata(db_name)` — returns full `clustering_metadata.json` (eps, min_samples, n_clusters, silhouette, DB index, noise ratio).
  - `GET /model/training-report` → `run_artifacts.rf_metadata(db_name)` — returns full `rf_metadata.json` (8-feature list, RF params, F1 macro, per-class report, confusion matrix).
  - `GET /model/shap-importance` → `run_artifacts.shap_importance(db_name)` — returns `[{feature, mean_abs_shap}]` sorted descending. Top feature for Kuliner: `same_category_density_500m` (0.2263).
  - `GET /model/category-distribution` → `run_artifacts.category_distribution(db_name)` — returns `{top10, all}`. Kuliner: 212 categories, top is Restaurant (1290 rows).
  - `GET /model/reports/{name}` → `FileResponse` for whitelisted PNGs + `rf_shap_importance.csv`. Non-whitelisted names return 400; path-traversal attempts blocked.
  - `GET /model/feature-store-summary?head_n=N` → `{rows, columns, dtypes, null_counts, head}`. Kuliner: 4206 rows × 19 cols, 0 nulls.
  - *Files:* `app/api/v1/endpoints/model.py`
- [x] **P4.2** *(2026-05-28)* Added `GET /api/v1/runs` to `router.py`. Returns `{runs: [RunSummary], total: 8}`. Each entry includes `db_key`, `n_clusters`, `noise_ratio_pct`, `silhouette_score`, `f1_macro`, `eps_meter`, `min_samples`, `timestamp`, `has_model`, `has_shap`. Skips runs with corrupt/incomplete artifacts gracefully.
  - *Files:* `app/api/v1/router.py`
- [x] **P4.3** *(2026-05-28)* New `app/schemas/run_artifacts.py` with 9 typed Pydantic models: `ClusteringMetadataOut`, `TrainingReportOut`, `ShapFeatureImportance`, `CategoryDistributionOut`, `FeatureStoreSummaryOut`, `RunsListOut`, `RunSummary`, plus nested `ClusteringParams`, `ClusteringResults`. All use `extra="allow"` so future notebook additions don't break clients. Exported from `app/schemas/__init__.py`.
  - *Files:* `app/schemas/run_artifacts.py`, `app/schemas/__init__.py`

**Smoke test results (all pass):**
```
GET /api/v1/runs                                → 200 · 8 runs · all has_model=True has_shap=True
GET /{Kuliner}/model/clustering-metadata        → 200 · eps=500 n_clusters=26 silhouette=0.4396
GET /{Kuliner}/model/training-report            → 200 · f1=0.9655 · 8 features · 3×3 confusion matrix
GET /{Kuliner}/model/shap-importance            → 200 · 8 features · top: same_category_density_500m=0.2263
GET /{Kuliner}/model/category-distribution      → 200 · top10=10 all=212 · top: Restaurant=1290
GET /{Kuliner}/model/feature-store-summary      → 200 · 4206 rows × 19 cols · 0 nulls
GET /{Kuliner}/model/reports/clustering_result.png → 200 · 151410 bytes
GET /{Kuliner}/model/reports/rf_shap_importance.csv → 200 · 322 bytes
GET /{Kuliner}/model/reports/evil.sh            → 400 (whitelist rejection) ✓
GET /{Kuliner}/model/reports/../../etc/passwd   → 404 (path normalised by HTTP layer) ✓
GET /{Hotel}/model/clustering-metadata          → 200 · n_clusters=0 noise=100% ✓
GET /Bogus.Dataset/model/clustering-metadata    → 404 ✓
```

---

### Phase 5 — API-side training writes into `runs/<db_key>/` ✅ Complete · 2026-05-28

- [x] **P5.1** *(2026-05-28)* `MODEL_DIR` constant removed. `run_training_task` now resolves the output directory as `run_artifacts.run_dir(db_name) / "models"` (and `/ "reports"` for PNGs). The legacy `fastapi/models/` path is kept as `_LEGACY_MODEL_DIR` for `list_versions` backward compatibility only — nothing new is written there.
  - *Files:* `app/api/v1/endpoints/model.py`
- [x] **P5.2** *(2026-05-28)* Retrain now writes all artifacts into the per-run directory:
  - `rf_location_reco_v{N}.joblib` — new versioned model
  - `rf_metadata.json` — overwritten with `notebook: "api_retrain"`, full confusion matrix, 8-feature list
  - `active.json` — version pointer
  - `rf_shap_importance.csv` — regenerated from 300-sample SHAP TreeExplainer
  - `rf_confusion_matrix.png` — regenerated 3×3 heatmap
  - `rf_shap_summary.png` — regenerated horizontal bar chart
  - Added `matplotlib` to `requirements.txt` and installed in venv.
  - *Files:* `app/api/v1/endpoints/model.py`, `requirements.txt`
- [x] **P5.3** *(2026-05-28)* `rollback_model` writes `active.json` in `runs/<db_key>/models/`. Falls back to legacy directory for pre-Phase 5 versions and promotes them into the per-run layout. Evicts the model cache so the next inference request loads the rolled-back version immediately.
  - *Files:* `app/api/v1/endpoints/model.py`
- [x] **P5.4** *(2026-05-28)* Same as P5.1 — `MODEL_DIR` replaced with `run_artifacts.run_dir(db_name) / "models"` throughout. Notebook-trained and API-trained runs share one layout; `list_versions` doesn't need to know who produced a given file.
  - *Files:* `app/api/v1/endpoints/model.py`

**Smoke test results (Cosmetics dataset, 579 rows — all 22 checks pass):**
```
[1] Pre-retrain: 2 existing versions
[2] POST /model/retrain          → 200 status=running ✓
[3] Poll to completion           → completed v3 F1=0.9086 ✓
[4] Artifact layout:
    rf_location_reco_v3.joblib   → written ✓
    version incremented 2→3      → ✓
    rf_metadata.json             → notebook=api_retrain, 8 features, confusion_matrix ✓
    active.json                  → active_version=3 ✓
[5] Reports:
    rf_shap_importance.csv       → written ✓
    rf_confusion_matrix.png      → written ✓
    rf_shap_summary.png          → written ✓
[6] GET /model/versions          → [3,2,1] active=3 source=run ✓
[7] GET /model/training-report   → notebook=api_retrain f1_macro present ✓
[8] Rollback to v2               → active.json updated, cache evicted ✓
    Roll forward to v3           → ✓
```

**Re-verified 2026-05-28 (28/28 checks pass · v4):**
```
[3] completed v4 · F1=0.9086
[4] rf_location_reco_v4.joblib written · version 3→4 · rf_metadata correct · active.json=4
[5] all 3 report files written
[6] versions=[4,3,2,1] active=4 source=run
[7] training-report notebook=api_retrain
[8] rollback v3 → active.json updated · rolled forward to v4
```

**Also completed during Phase 5 planning:**
- `fastapi/artifacts/runs/` populated with 103 lightweight files (5 MB CSV/JSON/PNG) via `sync_artifacts.py --all`
- `fastapi/artifacts/.gitignore` added — excludes `*.joblib` and `*.db`, allows committing CSV/JSON/PNG
- `fastapi/.gitignore` updated — tracks `artifacts/` directory but excludes binary files
- Route dependency map documented: all `/analysis/*` routes work with Postgres only; `/recommendation/*` and `/model/sync-db` need artifacts

---

### Phase 6 — Hardening (post-MVP, optional) 🔲 Not started

- [ ] **P6.1** Light caching of feature store DataFrames keyed on file `mtime`.
- [ ] **P6.2** Lock retraining per `db_name` with `asyncio.Lock` (currently a dict-based race exists in `training_jobs`).
- [ ] **P6.3** Pre-warm cache on startup for the 8 known `db_key`s.
- [ ] **P6.4** Optional Redis cache for KDE grids (only if endpoint latency exceeds the 5 s NFR target).
- [ ] **P6.5** Logging — replace `print` and stray `logger.info` with structured records (already partially done).
- [ ] **P6.6** Swap the filesystem `run_artifacts` loader for an object-storage backend (Supabase Storage, S3, or MinIO) once the API has a deployment target. The public function signatures stay identical; only the implementation reads from a bucket and caches under `/tmp/artifacts/<db_key>/` keyed on object `etag`.

---

## 6 · Inference Workflow (target)

```
Request: POST /api/v1/{db_name}/recommendation/location?category=padang
   │
   ▼
get_db (deps.py) ─► resolves db_name → Dataset.id (UUID), stores on request.state
   │
   ▼
recommendation.py:recommend_location
   │
   ├─► run_artifacts.has_run(db_name)            # 404 if missing
   ├─► run_artifacts.clustering_metadata(db_name) # eps_meter, min_samples, n_clusters
   ├─► run_artifacts.feature_store(db_name)       # 19-column DataFrame (cached)
   ├─► run_artifacts.rf_metadata(db_name)         # confirms FEATURE_COLS order
   ├─► get_latest_model(db_name)                  # joblib (cached)
   │
   ├─► IF n_clusters == 0:
   │      return heuristic-only fallback (422 + fallback body)
   │
   ├─► score_candidate_grid(feature_store, eps_meter, category, step_m=250)
   │      ├─ KDE hotspot from feature store
   │      ├─ centroids from feature store cluster_id
   │      ├─ BallTree densities from feature store
   │      └─ assemble 8-feature DataFrame for each candidate
   │
   ├─► model.predict_proba()[:, high_idx]
   ├─► top-N by score
   ├─► shap.TreeExplainer(model).shap_values(top_N)
   │
   ▼
return {recommendations: [...]}
```

---

## 7 · Endpoint-by-endpoint Status After This Plan

| Endpoint | Phase | Notes |
|---|---|---|
| `GET /api/v1/databases` | – | OK |
| `GET /api/v1/projects` | – | OK |
| `GET /api/v1/runs` | P4 | New |
| `GET /{db}/places/*` | – | OK |
| `GET /{db}/analysis/heatmap` | P1 | Add dataset filter |
| `GET /{db}/analysis/clusters` | P1, P2 | Defaults from clustering metadata |
| `GET /{db}/analysis/competition` | P1 | Add dataset filter |
| `GET /{db}/analysis/market-gap` | P1 | Add dataset filter |
| `GET /{db}/analysis/saturation` | P1, P2 | Defaults from clustering metadata |
| `GET /{db}/analysis/market-composition` | P1 | Add dataset filter |
| `GET /{db}/analysis/dominant-category` | P1 | Add dataset filter |
| `GET /{db}/analysis/market-motif` | P1 | Add dataset filter |
| `POST /{db}/recommendation/location` | P1, P2, P3 | Feature-store-driven |
| `POST /{db}/model/retrain` | P5 | Writes into `runs/<db>/models/` |
| `GET /{db}/model/retrain/status` | – | OK |
| `GET /{db}/model/versions` | P2, P5 | Reads from `runs/<db>/models/` |
| `POST /{db}/model/rollback` | P5 | Per-run active pointer |
| `POST /{db}/model/sync-db` | P1 | Rewritten for Postgres |
| `GET /{db}/model/clustering-metadata` | P4 | New |
| `GET /{db}/model/training-report` | P4 | New |
| `GET /{db}/model/shap-importance` | P4 | New |
| `GET /{db}/model/category-distribution` | P4 | New |
| `GET /{db}/model/reports/{name}` | P4 | New |
| `GET /{db}/model/feature-store-summary` | P4 | New |

---

## 8 · Artifact Storage Strategy

`geomarketia-train` and `geomarket` are **separate repositories** with different lifecycles — the training repo is a notebook playground, the API repo serves predictions. The current `recommendation.py` hardcodes a six-level `os.path.join(__file__, "..", …, "geomarketia-train", "content", "runs")` which only works because both repos happen to be siblings on the developer's machine.

### 8.1 Sizing snapshot (2026-05-28)

```
geomarketia-train/content/runs/   ≈ 99 MB · 132 files · 8 runs
   - .joblib (RF models)          ≈ 30 MB / healthy run
   - .csv  (feature_store, SHAP)  < 1 MB / run
   - .json (metadata, dist)       < 50 KB / run
   - .png  (reports)              < 0.5 MB / run
   - .db   (db_with_cluster)      ≈ 1–3 MB / run

geomarketia-train/content/models/ ≈ 448 MB (legacy, 26 versions)
```

The runs grow ~10 MB per retrain. Committing them to git is already painful (Kuliner alone has two 15 MB joblibs); doing it inside the API repo would be worse.

### 8.2 Decision: do **not** vendor the runs into the API repo

Three reasons:

1. **Lifecycle decoupling.** A retraining cycle by the data scientist must not require an API commit, and an API hotfix must not have to ignore 100 MB of binary diffs.
2. **Git is the wrong store for joblibs.** Repository size doubles every quarter at the current cadence.
3. **The six-`..` path hack is fragile.** It silently breaks the moment anyone clones either repo to a non-sibling location.

### 8.3 Target shape — `ARTIFACTS_DIR` indirection

Introduce a single configuration setting and route every artifact read through it:

```
fastapi/
├── artifacts/                     ← gitignored (default ARTIFACTS_DIR)
│   └── runs/
│       └── <db_key>/
│           ├── data/{feature_store.csv, category_distribution*.json}
│           ├── models/{clustering_metadata.json, rf_metadata.json,
│           │          rf_location_reco_v*.joblib, active.json}
│           └── reports/*.png, rf_shap_importance.csv
├── scripts/
│   └── sync_artifacts.py          ← copies one run from the training repo
└── app/core/config.py             ← adds ARTIFACTS_DIR setting
```

`Settings.ARTIFACTS_DIR` defaults to `<fastapi>/artifacts` and is overridable via `.env`:

```
# .env
ARTIFACTS_DIR=../geomarketia-train/content    # local dev shortcut
```

`run_artifacts.RUNS_ROOT` becomes `Path(settings.ARTIFACTS_DIR) / "runs"`. The notebook stays untouched — its outputs still land at `geomarketia-train/content/runs/<db_key>/`. A short sync script copies one run into the API's `artifacts/` folder when promoting a model:

```bash
# from fastapi/
python scripts/sync_artifacts.py --db Indonesia.Batam.Kuliner.202406162232
```

The script reads from `../../geomarketia-train/content/runs/<db_key>/` (or any path passed via `--source`) and copies only what the API actually needs (CSV, JSON, joblib, whitelisted PNGs) into `artifacts/runs/<db_key>/`.

### 8.4 Future migration to object storage (Phase 6+)

When the API leaves the developer laptop, swap the filesystem loader for a Supabase-Storage-backed one. The function signatures in `run_artifacts.py` do not change:

```
artifacts/<bucket>/runs/<db_key>/data/feature_store.csv      ← object path
artifacts/<bucket>/runs/<db_key>/models/rf_location_reco_v3.joblib
…
```

The loader downloads-on-demand into a local cache directory keyed by object `etag`. Multiple API replicas just work. This is the correct production answer but is **out of scope until Phase 6** — premature now.

### 8.5 Action items added to the plan

- **Phase 1 (P1.6, new):** add `ARTIFACTS_DIR` to `Settings` and route the existing `_TRAIN_REPO_RUNS` / `_TRAIN_REPO_LEGACY_MODELS` constants through it. Default keeps the current sibling-path behaviour so nothing breaks locally.
- **Phase 2 (P2.5, new):** write `scripts/sync_artifacts.py`. Document the data-scientist workflow ("run notebook → run sync script → call `/model/sync-db`") in the API `README.md`.
- **Phase 5 (P5.4, new):** API-side training writes into `Path(settings.ARTIFACTS_DIR) / "runs" / db_name / "models"` so the data scientist's runs and the API's runs share one layout.
- **Phase 6 (P6.6, new):** swap filesystem loader for object-storage loader. Concrete only when deployment target is chosen.

---

## 9 · Open Questions

1. **How to communicate "no clusters" to the frontend?** Plan picks 422 with `code: "no_clusters"` and a heuristic fallback in the body. Confirm with frontend team that 422 + body works for their Recharts panel.
2. **Should retrain be async (BackgroundTasks) or queued (Celery/RQ)?** Currently uses `BackgroundTasks` and an in-memory dict — fine for a single instance, breaks across replicas. Out of scope here, flag for future.
3. **`cluster_sync_summary.json`** at `content/runs/cluster_sync_summary.json` is generated by the training repo's `add_cluster_id_to_dbs.py`, not by the API. Should `/model/sync-db` regenerate this summary? Proposal: yes, write it after each successful sync, mirroring the script's format so the admin UI sees a consistent shape regardless of trigger.
4. **Sync script ownership.** Does `scripts/sync_artifacts.py` belong in this repo (API consumes the artifact) or in the training repo (training produces it)? Current proposal: this repo, because the *consumer* defines the artifact contract. Revisit if the data scientist prefers to push.

---

## 10 · Risks

- **Notebook-API drift.** Any change to feature engineering in the notebook silently breaks inference. Mitigation: pin the column list and dtypes in `run_artifacts.feature_store()` and assert at load time.
- **Stale caches.** LRU cache on (db_name, mtime) handles file edits but not deletions. Add a manual cache-clear endpoint behind admin auth in Phase 6.
- **Schema drift in `feature_store.csv`.** Notebook v1 has 19 columns. If a future run adds/removes columns, the assert-at-load will catch it.
- **Postgres places vs feature-store rows.** A row may be in Postgres but not in the feature store (e.g., admin imported new places after training). Inference treats the feature store as ground truth for spatial features; recommend retraining when the diff exceeds a threshold (logged warning, no auto-trigger).

---

## 11 · Progress Log

| Date | Phase | Item | Detail |
|---|---|---|---|
| 2026-05-28 | Plan | Drafted | Initial plan created covering Phases 1–6, gap analysis, artifact storage strategy |
| 2026-05-28 | §8 | Artifact storage decision | Decided to keep training repo separate; introduced `ARTIFACTS_DIR` indirection; documented sync-script and future object-storage migration path |
| 2026-05-28 | P1.1 | `dataset_id` filter | `get_places_df(db, dataset_id)` added; all 9 analysis endpoints pass `_dataset_id(request)` |
| 2026-05-28 | P1.2 | Batam bbox tightened | `in_batam_bbox()` + constants added to `app/utils/geo.py`; old `0.7/1.5/103.5/104.5` literals removed |
| 2026-05-28 | P1.3 | `sync-db` rewritten | Removed dead `sqlite3`/`_sessionmakers`/`_engines`; new Postgres `UPDATE` with id-first + name+coord fallback, 500-row batches |
| 2026-05-28 | P1.4 | Single `get_places_df` source | `recommendation.py` imports from `analysis.py`; duplicate `Place` import removed |
| 2026-05-28 | P1.5 | Smoke tests | Hotel heatmap scoped correctly; Kuliner sync 4158/4570; Hotel sync 97/99; `cluster_id` populated in Postgres; 404 on unknown dataset |
| 2026-05-28 | P1.6 | `ARTIFACTS_DIR` config | `Settings.ARTIFACTS_DIR` + `ARTIFACTS_PATH`/`RUNS_PATH` in `config.py`; six-`..` hack removed; `artifacts/` gitignored; `.env` set to `../../geomarketia-train/content` |
| 2026-05-28 | P2.1 | `run_artifacts.py` created | New `app/services/run_artifacts.py` with 10 public functions: `run_dir`, `has_run`, `list_runs`, `feature_store`, `clustering_metadata`, `rf_metadata`, `category_distribution`, `shap_importance`, `get_latest_model`, `report_path`, `feature_store_summary` |
| 2026-05-28 | P2.2 | mtime-keyed caching | `_fs_cache` and `_model_cache` dicts keyed on `(path, mtime_ns)`; stale entries auto-evicted; drift guard asserts 15 required columns on load |
| 2026-05-28 | P2.3 | Model loading migrated | `recommendation.py:get_latest_model_and_meta` → thin wrapper over `run_artifacts.get_latest_model`; `model.py:list_versions` now scans `runs/<db_key>/models/` + legacy dir; `sync-db` uses `run_artifacts.run_dir` |
| 2026-05-28 | P2.4 | Functional tests | All 8 loaders verified for Kuliner (healthy) and Hotel (degenerate); live `/model/versions` returns `source:run` with correct F1=0.9655 |
| 2026-05-28 | P2.5 | `sync_artifacts.py` | `scripts/sync_artifacts.py` with `--db/--all/--source/--dest/--dry-run`; dry-run verified 15 files for Kuliner |
| 2026-05-28 | P3.1 | `score_candidate_grid` | New function sources all 8 features from feature store; grid clipped to Batam UTM bbox (344k–411k, 110k–144k) to prevent 61M-point explosion |
| 2026-05-28 | P3.2 | Centroid-based cluster assignment | Centroids from `feature_store.groupby("cluster_id").mean()`; per-run `eps_meter` as noise threshold |
| 2026-05-28 | P3.3 | Hotspot KDE | `bandwidth=500 m` on feature-store coords; constant `_HOTSPOT_KDE_BANDWIDTH_M` documented with notebook reference |
| 2026-05-28 | P3.4 | BallTree densities | `competitor_density_500m`, `same_category_density_500m`, `nearest_neighbor_dist_m` all from feature-store BallTrees |
| 2026-05-28 | P3.5 | Degenerate-run 422 | Hotel returns HTTP 422 + `code:no_clusters` + heuristic fallback (hotspot − same-cat density, normalised) |
| 2026-05-28 | P3.6 | SHAP on top-N only | `TreeExplainer` runs on top-N slice only; 8 SHAP keys verified per recommendation |
| 2026-05-28 | P3 smoke | All 25 checks pass | Kuliner: score=0.8133, deterministic; Hotel: 422 + heuristic lat=1.13991 lng=104.02150 score=0.7434 |
| 2026-05-28 | F1 fix | DBSCAN defaults from metadata | `/clusters` and `/saturation` now read `eps`/`min_samples` from `clustering_metadata.json` via `_get_dbscan_defaults(db_name)`. Query params remain as overrides. All 8 runs use `eps=500, min_samples=10`. Old hardcoded `eps=150` produced 0 clusters for Kuliner restaurant; correct `eps=500` produces 18. Response now includes `params_used` field. |
| 2026-05-28 | P4.1 | 6 new model read endpoints | `clustering-metadata`, `training-report`, `shap-importance`, `category-distribution`, `reports/{name}`, `feature-store-summary` — all returning live data from run artifacts |
| 2026-05-28 | P4.2 | `GET /api/v1/runs` | Lists all 8 complete runs with quality metrics (n_clusters, noise%, F1, has_model, has_shap) |
| 2026-05-28 | P4.3 | Pydantic schemas | `app/schemas/run_artifacts.py` with 9 typed models; exported from `__init__.py` |
| 2026-05-28 | P4 smoke | All checks pass | 12/12 endpoint checks pass; whitelist rejects `evil.sh` (400); path-traversal blocked (404); Hotel degenerate run returns correct n_clusters=0 |
| 2026-05-28 | P5.1 | `MODEL_DIR` removed | `run_training_task` writes to `run_artifacts.run_dir(db_name)/models/`; legacy `_LEGACY_MODEL_DIR` kept for `list_versions` backward compat only |
| 2026-05-28 | P5.2 | Full artifact output | Retrain writes joblib, `rf_metadata.json`, `active.json`, `rf_shap_importance.csv`, `rf_confusion_matrix.png`, `rf_shap_summary.png` into per-run dirs |
| 2026-05-28 | P5.3 | Rollback per-run | `rollback_model` writes `active.json` in `runs/<db>/models/`; evicts model cache; promotes legacy models if needed |
| 2026-05-28 | P5.4 | Unified layout | Notebook-trained and API-trained runs share identical directory layout |
| 2026-05-28 | P5 smoke | 28/28 checks pass | Cosmetics v4 · F1=0.9086 · all artifacts written · rollback/forward verified |
| 2026-05-28 | Artifacts | Team handoff | `artifacts/runs/` populated (103 files, 5 MB CSV/JSON/PNG); `artifacts/.gitignore` excludes joblibs; route dependency map documented |

