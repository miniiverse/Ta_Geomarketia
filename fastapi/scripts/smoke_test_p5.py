"""Phase 5 smoke tests — verify retrain writes artifacts into runs/<db_key>/models/.

Usage (from fastapi/ directory):
    python scripts/smoke_test_p5.py

Uses Toko Komputer (271 rows) — fastest dataset to train.
"""

from __future__ import annotations

import json
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

BASE = "http://127.0.0.1:8080"
DB   = "Indonesia.Batam.Cosmetics.202410290644"

PASS = "\033[92m✓\033[0m"
FAIL = "\033[91m✗\033[0m"

errors: list[str] = []


def get(path: str, timeout: int = 30) -> tuple[int, dict]:
    url = BASE + path
    try:
        with urllib.request.urlopen(url, timeout=timeout) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def post(path: str, timeout: int = 30) -> tuple[int, dict]:
    url = BASE + path
    req = urllib.request.Request(url, method="POST", data=b"")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def check(label: str, cond: bool, detail: str = "") -> None:
    if cond:
        print(f"  {PASS} {label}")
    else:
        print(f"  {FAIL} {label}  ← {detail}")
        errors.append(label)


# ---------------------------------------------------------------------------
# Resolve artifact paths
# ---------------------------------------------------------------------------
sys.path.insert(0, ".")
try:
    from dotenv import load_dotenv
    load_dotenv(".env")
except ImportError:
    pass

from app.core.config import RUNS_PATH
run_models = RUNS_PATH / DB / "models"
run_reports = RUNS_PATH / DB / "reports"

print("=" * 60)
print("Phase 5 Smoke Tests")
print(f"Dataset : {DB}")
print(f"Models  : {run_models}")
print("=" * 60)

# ---------------------------------------------------------------------------
# TEST 1 — Snapshot state before retrain
# ---------------------------------------------------------------------------
print("\n[1] Pre-retrain state")
before_versions = sorted(run_models.glob("rf_location_reco_v*.joblib"))
before_count = len(before_versions)
print(f"  Existing model versions: {before_count}")
check("models dir exists", run_models.exists(), f"path={run_models}")

# ---------------------------------------------------------------------------
# TEST 2 — Trigger retrain
# ---------------------------------------------------------------------------
print(f"\n[2] POST /{DB}/model/retrain")
status, body = post(f"/api/v1/{DB}/model/retrain")
check("HTTP 200", status == 200, f"got {status}")
check("status == running", body.get("status") == "running", f"body={body}")

# ---------------------------------------------------------------------------
# TEST 3 — Poll until completed (max 120 s)
# ---------------------------------------------------------------------------
print(f"\n[3] Polling retrain/status (max 120 s)...")
deadline = time.time() + 120
final_status = {}
while time.time() < deadline:
    _, poll = get(f"/api/v1/{DB}/model/retrain/status")
    s = poll.get("status")
    print(f"  ... {s}", end="\r")
    if s in ("completed", "failed"):
        final_status = poll
        break
    time.sleep(3)

print()
check("status == completed", final_status.get("status") == "completed",
      f"status={final_status.get('status')}  error={final_status.get('error')}")
check("version present in status", final_status.get("version") is not None,
      f"version={final_status.get('version')}")
check("f1_macro present", final_status.get("metrics", {}).get("f1_macro") is not None,
      f"metrics={final_status.get('metrics')}")

new_version = final_status.get("version")
f1 = final_status.get("metrics", {}).get("f1_macro")
print(f"\n  New version: v{new_version}  F1 macro: {f1}")

# ---------------------------------------------------------------------------
# TEST 4 — Verify artifact layout in runs/<db_key>/models/
# ---------------------------------------------------------------------------
print(f"\n[4] Artifact layout in {run_models}")

new_joblib = run_models / f"rf_location_reco_v{new_version}.joblib"
check("P5.1 new joblib written",
      new_joblib.exists(), f"expected {new_joblib}")
check("P5.1 version incremented",
      len(list(run_models.glob('rf_location_reco_v*.joblib'))) == before_count + 1,
      f"before={before_count} after={len(list(run_models.glob('rf_location_reco_v*.joblib')))}")

rf_meta = run_models / "rf_metadata.json"
check("P5.2 rf_metadata.json written", rf_meta.exists())
if rf_meta.exists():
    with rf_meta.open() as f:
        meta = json.load(f)
    check("rf_metadata has correct features",
          meta.get("features") == [
              "rating","review_log","hotspot_score",
              "competitor_density_500m","same_category_density_500m",
              "nearest_neighbor_dist_m","dist_to_cluster_centroid_m","cluster_id"
          ], f"features={meta.get('features')}")
    check("rf_metadata has confusion_matrix",
          isinstance(meta.get("metrics", {}).get("confusion_matrix"), list),
          f"cm={meta.get('metrics', {}).get('confusion_matrix')}")
    check("rf_metadata notebook=api_retrain",
          meta.get("notebook") == "api_retrain",
          f"notebook={meta.get('notebook')}")

active_json = run_models / "active.json"
check("P5.3 active.json written", active_json.exists())
if active_json.exists():
    with active_json.open() as f:
        active = json.load(f)
    check("P5.3 active_version == new version",
          active.get("active_version") == new_version,
          f"active={active.get('active_version')} expected={new_version}")

# ---------------------------------------------------------------------------
# TEST 5 — Verify report artifacts in runs/<db_key>/reports/
# ---------------------------------------------------------------------------
print(f"\n[5] Report artifacts in {run_reports}")
check("P5.2 rf_shap_importance.csv written",
      (run_reports / "rf_shap_importance.csv").exists())
check("P5.2 rf_confusion_matrix.png written",
      (run_reports / "rf_confusion_matrix.png").exists())
check("P5.2 rf_shap_summary.png written",
      (run_reports / "rf_shap_summary.png").exists())

# ---------------------------------------------------------------------------
# TEST 6 — /model/versions reflects the new version
# ---------------------------------------------------------------------------
print(f"\n[6] GET /{DB}/model/versions")
status, body = get(f"/api/v1/{DB}/model/versions")
check("HTTP 200", status == 200, f"got {status}")
versions = body.get("versions", [])
active_v = body.get("active_version")
check("active_version == new version", active_v == new_version,
      f"active={active_v} expected={new_version}")
check("new version in list", any(v["version"] == new_version for v in versions),
      f"versions={[v['version'] for v in versions]}")
check("source == run", versions[0].get("source") == "run" if versions else False,
      f"source={versions[0].get('source') if versions else 'N/A'}")
print(f"  Versions: {[v['version'] for v in versions]}  active={active_v}")

# ---------------------------------------------------------------------------
# TEST 7 — /model/training-report reflects the new run
# ---------------------------------------------------------------------------
print(f"\n[7] GET /{DB}/model/training-report (should reflect new retrain)")
status, body = get(f"/api/v1/{DB}/model/training-report")
check("HTTP 200", status == 200, f"got {status}")
check("notebook == api_retrain",
      body.get("notebook") == "api_retrain",
      f"notebook={body.get('notebook')}")
check("f1_macro present", body.get("metrics", {}).get("f1_macro") is not None)

# ---------------------------------------------------------------------------
# TEST 8 — Rollback to previous version (if one exists)
# ---------------------------------------------------------------------------
if before_count > 0:
    prev_version = int(sorted(run_models.glob("rf_location_reco_v*.joblib"))[-2].stem.rsplit("v", 1)[-1])
    print(f"\n[8] POST /{DB}/model/rollback?version={prev_version}")
    status, body = post(f"/api/v1/{DB}/model/rollback?version={prev_version}")
    check("HTTP 200", status == 200, f"got {status}")
    check("status == success", body.get("status") == "success", f"body={body}")
    check("active_version == prev_version",
          body.get("active_version") == prev_version,
          f"active={body.get('active_version')} expected={prev_version}")

    # Verify active.json updated
    with active_json.open() as f:
        active_after = json.load(f)
    check("active.json updated to prev_version",
          active_after.get("active_version") == prev_version,
          f"active.json={active_after}")

    # Roll forward again to the new version
    post(f"/api/v1/{DB}/model/rollback?version={new_version}")
    print(f"  Rolled forward back to v{new_version}")
else:
    print(f"\n[8] Rollback skipped — no previous version to roll back to")

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
print("\n" + "=" * 60)
if errors:
    print(f"\033[91mFAILED — {len(errors)} check(s):\033[0m")
    for e in errors:
        print(f"  • {e}")
    sys.exit(1)
else:
    print("\033[92mALL CHECKS PASSED\033[0m")
    sys.exit(0)
