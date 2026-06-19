# FastAPI Model Inference

The API serves one active model per database key. A request selects both the
Postgres dataset and its matching artifact directory:

```text
POST /api/v1/{db_key}/recommendation/location
artifacts/runs/{db_key}/
```

## Required artifact structure

Only these files are required for normal recommendation inference:

```text
artifacts/
└── runs/
    └── <db_key>/
        ├── data/
        │   ├── feature_store.csv
        │   └── base_candidate_grid.parquet
        └── models/
            ├── clustering_metadata.json
            ├── regression_metadata.json
            ├── active.json
            └── reg_location_reco_vN.joblib
```

Artifact responsibilities:

- `feature_store.csv`: existing POIs and engineered spatial context.
- `base_candidate_grid.parquet`: candidate coordinates to score.
- `clustering_metadata.json`: DBSCAN parameters and output CRS.
- `regression_metadata.json`: feature order, thresholds, schema, and metrics.
- `active.json`: identifies the active model version.
- `reg_location_reco_vN.joblib`: fitted regression model.

`reports/`, SHAP CSV files, plots, category-distribution files, rejected rows,
and clustered database copies are not required for inference. Report
directories are intentionally ignored by Git.

## Inference flow

```text
Client POST /api/v1/<db_key>/recommendation/location
  -> Resolve <db_key> to dataset_id in Postgres
  -> Validate artifacts/runs/<db_key>/
  -> Load feature_store.csv and base_candidate_grid.parquet
  -> Filter candidate grid by optional subdistrict
  -> Build category-specific spatial features
  -> Read active.json and regression_metadata.json
  -> Load the active reg_location_reco_vN.joblib
  -> Align candidate columns to the metadata feature order
  -> Run model.predict()
  -> Rank by score and assign Low/Medium/High band
  -> Convert UTM coordinates to latitude/longitude
  -> Return recommendations, features, SHAP explanation, and importance
```

The model is cached by file path and modification time. Updating the active
model file or pointer causes the next request to resolve the current version.
If model scoring fails, the endpoint falls back to heuristic scoring.

## Local setup

From `fastapi/`:

```powershell
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Set these values in `.env`:

```dotenv
POSTGRES_URL=postgresql+psycopg://...
ARTIFACTS_DIR=./artifacts
```

`ARTIFACTS_DIR` must contain `runs/<db_key>/`.

Open `http://127.0.0.1:8080/docs` for the interactive API documentation.

## Run inference

```powershell
$db = "Indonesia.Batam.Kuliner.202406162232"
$uri = "http://127.0.0.1:8080/api/v1/$db/recommendation/location?category=Restaurant&limit=5"
Invoke-RestMethod -Method Post -Uri $uri
```

Optional query parameters:

- `limit`: 1-20, default 5.
- `subdistrict`: restrict candidate locations to one subdistrict.

Each recommendation contains rank, latitude, longitude, score,
`suitability_band`, input features, SHAP explanation, and model feature
importance.

For reliable loading, teammates should install the committed
`requirements.txt`. Retraining and serving should use matching scikit-learn,
Joblib, XGBoost, and LightGBM versions.
