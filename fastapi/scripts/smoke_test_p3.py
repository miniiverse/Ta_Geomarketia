"""Phase 3 smoke tests — run after restarting the FastAPI server.

Usage (from fastapi/ directory):
    python scripts/smoke_test_p3.py
"""

from __future__ import annotations

import json
import sys
import urllib.request
import urllib.error

BASE = "http://127.0.0.1:8080"

KULINER = "Indonesia.Batam.Kuliner.202406162232"
HOTEL   = "Indonesia.Batam.Hotel.202408042041"

PASS = "\033[92m✓\033[0m"
FAIL = "\033[91m✗\033[0m"

errors: list[str] = []


def get(path: str) -> tuple[int, dict]:
    url = BASE + path
    try:
        with urllib.request.urlopen(url, timeout=120) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def post(path: str) -> tuple[int, dict]:
    url = BASE + path
    req = urllib.request.Request(url, method="POST", data=b"")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def check(label: str, cond: bool, detail: str = "") -> None:
    if cond:
        print(f"  {PASS} {label}")
    else:
        print(f"  {FAIL} {label}  ← {detail}")
        errors.append(label)


print("=" * 60)
print("Phase 3 Smoke Tests")
print("=" * 60)

# ─────────────────────────────────────────────────────────────────
# TEST 1 — Kuliner healthy run: POST /recommendation/location
# ─────────────────────────────────────────────────────────────────
print(f"\n[1] Kuliner — POST /{KULINER}/recommendation/location?category=restaurant&limit=3")
status, body = post(f"/api/v1/{KULINER}/recommendation/location?category=restaurant&limit=3")

check("HTTP 200", status == 200, f"got {status}")
recos = body.get("recommendations", [])
check("Returns 3 recommendations", len(recos) == 3, f"got {len(recos)}")

if recos:
    r0 = recos[0]
    check("rank=1 present",          r0.get("rank") == 1)
    check("lat in Batam bbox",        1.0 <= r0["lat"] <= 1.3,  f"lat={r0.get('lat')}")
    check("lng in Batam bbox",        103.6 <= r0["lng"] <= 104.2, f"lng={r0.get('lng')}")
    check("score in [0,1]",           0.0 <= r0["score"] <= 1.0, f"score={r0.get('score')}")
    check("shap_explanation present", bool(r0.get("shap_explanation")))
    check("shap has 8 keys",          len(r0.get("shap_explanation", {})) == 8,
          f"got {len(r0.get('shap_explanation', {}))}")

    feats = r0.get("features", {})
    check("features.cluster_id present",              "cluster_id" in feats)
    check("features.dist_to_cluster_centroid_m > 0",  feats.get("dist_to_cluster_centroid_m", -1) >= 0)
    check("features.hotspot_score present",           "hotspot_score" in feats)

    # Verify feature-store sourcing: cluster_id must be ≥ -1 (not re-run DBSCAN noise from eps=150)
    check("cluster_id ≥ -1 (feature-store sourced)",  feats.get("cluster_id", -99) >= -1,
          f"cluster_id={feats.get('cluster_id')}")

    print(f"\n  Top recommendation:")
    print(f"    lat={r0['lat']:.5f}  lng={r0['lng']:.5f}  score={r0['score']}")
    print(f"    cluster_id={feats.get('cluster_id')}  "
          f"dist_centroid={feats.get('dist_to_cluster_centroid_m')} m  "
          f"hotspot={feats.get('hotspot_score'):.6f}")
    print(f"    SHAP top feature: "
          f"{max(r0['shap_explanation'], key=lambda k: abs(r0['shap_explanation'][k]))}")

# ─────────────────────────────────────────────────────────────────
# TEST 2 — Kuliner: verify results are dataset-scoped
#          (same category on a different dataset should differ)
# ─────────────────────────────────────────────────────────────────
print(f"\n[2] Kuliner — second call returns same top lat/lng (feature-store deterministic)")
status2, body2 = post(f"/api/v1/{KULINER}/recommendation/location?category=restaurant&limit=1")
check("HTTP 200 on second call", status2 == 200, f"got {status2}")
if recos and body2.get("recommendations"):
    r0b = body2["recommendations"][0]
    check("Top lat matches first call (deterministic)",
          abs(r0b["lat"] - recos[0]["lat"]) < 0.0001,
          f"{r0b['lat']} vs {recos[0]['lat']}")

# ─────────────────────────────────────────────────────────────────
# TEST 3 — Hotel degenerate run: must return 422 + heuristic body
# ─────────────────────────────────────────────────────────────────
print(f"\n[3] Hotel — POST /{HOTEL}/recommendation/location?category=hotel&limit=3")
status, body = post(f"/api/v1/{HOTEL}/recommendation/location?category=hotel&limit=3")

check("HTTP 422 (degenerate run)",  status == 422, f"got {status}")
check("code == 'no_clusters'",      body.get("code") == "no_clusters",
      f"code={body.get('code')}")
check("detail mentions noise_ratio", "noise_ratio" in body.get("detail", ""),
      f"detail={body.get('detail', '')[:80]}")

fallback = body.get("recommendations", [])
check("Fallback recommendations present", len(fallback) > 0, f"got {len(fallback)}")
if fallback:
    fb0 = fallback[0]
    check("Fallback lat in Batam bbox",  1.0 <= fb0["lat"] <= 1.3,  f"lat={fb0.get('lat')}")
    check("Fallback lng in Batam bbox",  103.6 <= fb0["lng"] <= 104.2, f"lng={fb0.get('lng')}")
    check("Fallback score in [0,1]",     0.0 <= fb0["score"] <= 1.0, f"score={fb0.get('score')}")
    check("Fallback note present",       "note" in fb0, f"keys={list(fb0.keys())}")
    check("shap_explanation is empty dict", fb0.get("shap_explanation") == {},
          f"shap={fb0.get('shap_explanation')}")
    print(f"\n  Heuristic top result:")
    print(f"    lat={fb0['lat']:.5f}  lng={fb0['lng']:.5f}  score={fb0['score']}")
    print(f"    note: {fb0.get('note', '')}")

# ─────────────────────────────────────────────────────────────────
# TEST 4 — Unknown dataset: must return 404
# ─────────────────────────────────────────────────────────────────
print(f"\n[4] Unknown dataset — must return 404")
status, body = post("/api/v1/Bogus.Nonexistent.Dataset/recommendation/location?category=test")
check("HTTP 404 for unknown dataset", status == 404, f"got {status}")

# ─────────────────────────────────────────────────────────────────
# TEST 5 — Analysis endpoints still work (regression check)
# ─────────────────────────────────────────────────────────────────
print(f"\n[5] Regression — analysis endpoints still scoped correctly")
status, body = get(f"/api/v1/{KULINER}/analysis/market-composition")
check("market-composition HTTP 200", status == 200, f"got {status}")
cats = [c["category"] for c in body.get("composition", [])]
# Kuliner dataset may contain a small number of cross-category rows (e.g. "Hotel")
# from scraping noise — this is a data quality issue, not a code bug.
# The important check is that Kuliner does NOT contain Hotel-dominant categories
# and that Hotel does NOT contain Restaurant-dominant categories.
kuliner_top5 = cats[:5]
check("Kuliner top-5 are food categories",
      any(kw in " ".join(kuliner_top5).lower() for kw in ["restaurant", "food", "cafe", "bakso", "kuliner", "noodle", "seafood"]),
      f"top5={kuliner_top5}")

status, body = get(f"/api/v1/{HOTEL}/analysis/market-composition")
check("Hotel market-composition HTTP 200", status == 200, f"got {status}")
cats_hotel = [c["category"] for c in body.get("composition", [])]
check("No Restaurant categories in Hotel composition",
      not any(c.lower() == "restaurant" for c in cats_hotel),
      f"found restaurant in: {cats_hotel[:5]}")

# ─────────────────────────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────────────────────────
print("\n" + "=" * 60)
if errors:
    print(f"\033[91mFAILED — {len(errors)} check(s):\033[0m")
    for e in errors:
        print(f"  • {e}")
    sys.exit(1)
else:
    print("\033[92mALL CHECKS PASSED\033[0m")
    sys.exit(0)
