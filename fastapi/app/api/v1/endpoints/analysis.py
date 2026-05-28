"""Analysis endpoints for KDE heatmaps, DBSCAN clustering, and competition analysis."""

from __future__ import annotations

import logging
import numpy as np
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session
from sklearn.neighbors import KernelDensity, KDTree
from sklearn.cluster import DBSCAN
from scipy.spatial import ConvexHull

from app.api.deps import get_db
from app.models.place import Place
from app.utils.geo import in_batam_bbox
from app.utils.ml_utils import project_point, unproject_point
from app.services import run_artifacts

logger = logging.getLogger(__name__)

router = APIRouter()


def _get_dbscan_defaults(db_name: str) -> tuple[float, int]:
    """Return (eps_meter, min_samples) from the per-run clustering metadata.

    Falls back to (500.0, 10) — the values used across all 8 current training
    runs — if the metadata file is missing or malformed.

    These are the parameters the notebook used when producing ``cluster_id``
    values in the feature store.  Using the same values here ensures that
    the on-demand DBSCAN in ``/clusters`` and ``/saturation`` is consistent
    with the training pipeline.
    """
    try:
        cm = run_artifacts.clustering_metadata(db_name)
        params = cm.get("params", {})
        eps = float(params.get("eps_meter", 500.0))
        ms = int(params.get("min_samples", 10))
        return eps, ms
    except Exception:
        return 500.0, 10


def get_places_df(db: Session, dataset_id: str | None = None) -> pd.DataFrame:
    """Fetch places for a given dataset as a clean pandas DataFrame.

    The returned frame includes UTM-projected coordinates (`x_utm`, `y_utm`)
    and is filtered to the Batam bbox used by the training notebook
    (see `app.utils.geo.in_batam_bbox`).

    Parameters
    ----------
    db : Session
        Active SQLAlchemy session.
    dataset_id : str | None
        Required for normal use — scopes the query to a single dataset.
        Accepts ``None`` for legacy callers but raises ``ValueError`` so
        the failure surfaces at the caller rather than silently returning
        cross-dataset rows.
    """
    if dataset_id is None:
        raise ValueError(
            "get_places_df requires a dataset_id. Pass request.state.dataset_id "
            "from your endpoint."
        )

    places = (
        db.query(Place)
        .filter(
            Place.dataset_id == dataset_id,
            Place.is_deleted == False,  # noqa: E712
        )
        .all()
    )

    data = []
    for p in places:
        try:
            lat = float(p.latitude) if p.latitude is not None else None
            lng = float(p.longitude) if p.longitude is not None else None
            if lat is None or lng is None:
                continue

            # Notebook bbox — anything outside is rejected at training time
            if not in_batam_bbox(lat, lng):
                continue

            # Project to UTM Zone 48N
            x, y = project_point(lat, lng)

            data.append({
                "id": p.id,
                "name": p.place_name or "Unnamed Place",
                "latitude": lat,
                "longitude": lng,
                "x_utm": x,
                "y_utm": y,
                "category": p.category.strip() if p.category else "Uncategorized",
                "rating": p.rating if p.rating is not None else 0.0,
                "review": p.review_count if p.review_count is not None else 0,
                "price_level": p.price_level if p.price_level is not None else 1,
            })
        except (ValueError, TypeError):
            continue

    if not data:
        return pd.DataFrame(columns=[
            "id", "name", "latitude", "longitude", "x_utm", "y_utm",
            "category", "rating", "review", "price_level"
        ])
    return pd.DataFrame(data)


def _dataset_id(request: Request) -> str:
    """Read the dataset_id resolved by `get_db`.

    Raises 400 if `get_db` did not run first — keeps the error surfaced at
    the API boundary instead of as a cryptic NoneType comparison later.
    """
    ds = getattr(request.state, "dataset_id", None)
    if ds is None:
        raise HTTPException(status_code=400, detail="No dataset context resolved")
    return str(ds)


# ---------------------------------------------------------------------------
# GET /analysis/heatmap
# ---------------------------------------------------------------------------
@router.get("/heatmap", summary="Get KDE heatmap density grid")
def get_heatmap(
    request: Request,
    db_name: str,
    category: str | None = Query(None, description="Filter by category"),
    resolution_m: int = Query(250, ge=50, le=1000, description="Grid step size in meters"),
    db: Session = Depends(get_db)
):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"grid": []}
        
    if category:
        df_filtered = df[df["category"].str.lower() == category.lower()]
    else:
        df_filtered = df
        
    if df_filtered.empty:
        return {"grid": []}
        
    # Fit KDE on UTM coordinates
    coords = df_filtered[["x_utm", "y_utm"]].values
    kde = KernelDensity(bandwidth=resolution_m * 1.5, kernel="gaussian")
    kde.fit(coords)
    
    # Define grid limits
    x_min, x_max = df["x_utm"].min(), df["x_utm"].max()
    y_min, y_max = df["y_utm"].min(), df["y_utm"].max()
    
    # Generate meshgrid
    x_grid = np.arange(x_min - resolution_m, x_max + resolution_m, resolution_m)
    y_grid = np.arange(y_min - resolution_m, y_max + resolution_m, resolution_m)
    
    if len(x_grid) == 0 or len(y_grid) == 0:
        return {"grid": []}
        
    xx, yy = np.meshgrid(x_grid, y_grid)
    grid_pts = np.vstack([xx.ravel(), yy.ravel()]).T
    
    # Prune grid points that are far from any real business (saves performance)
    tree = KDTree(coords)
    dists, _ = tree.query(grid_pts, k=1)
    dists = dists.ravel()
    active_idx = dists < (resolution_m * 3)
    active_grid = grid_pts[active_idx]
    
    if len(active_grid) == 0:
        return {"grid": []}
        
    # Evaluate KDE
    log_dens = kde.score_samples(active_grid)
    dens = np.exp(log_dens)
    
    # Normalize weights to [0.0, 1.0]
    dens_min, dens_max = dens.min(), dens.max()
    if dens_max > dens_min:
        weights = (dens - dens_min) / (dens_max - dens_min)
    else:
        weights = np.ones_like(dens)
        
    # Unproject back to Lat/Lng
    grid_out = []
    for (x, y), w in zip(active_grid, weights):
        lat, lng = unproject_point(x, y)
        grid_out.append({
            "lat": float(lat),
            "lng": float(lng),
            "weight": float(round(w, 4))
        })
        
    return {"grid": grid_out}


# ---------------------------------------------------------------------------
# GET /analysis/clusters
# ---------------------------------------------------------------------------
@router.get("/clusters", summary="Get DBSCAN clusters and convex hulls")
def get_clusters(
    request: Request,
    db_name: str,
    eps: float | None = Query(None, gt=0, description="DBSCAN epsilon in meters (default: from training metadata)"),
    min_samples: int | None = Query(None, ge=2, description="DBSCAN min samples (default: from training metadata)"),
    category: str | None = Query(None, description="Optional category filter"),
    db: Session = Depends(get_db)
):
    """Return DBSCAN clusters and convex hulls for the dataset.

    ``eps`` and ``min_samples`` default to the values recorded in the
    per-run ``clustering_metadata.json`` (currently ``eps=500``,
    ``min_samples=10`` for all 8 Batam datasets).  Pass explicit values
    to override for exploratory analysis.
    """
    # Read per-run defaults; allow query-param overrides
    default_eps, default_ms = _get_dbscan_defaults(db_name)
    eps_val = eps if eps is not None else default_eps
    ms_val = min_samples if min_samples is not None else default_ms

    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"clusters": [], "noise_ratio": 0.0}
        
    if category:
        df_filtered = df[df["category"].str.lower() == category.lower()]
    else:
        df_filtered = df
        
    if len(df_filtered) < ms_val:
        return {"clusters": [], "noise_ratio": 100.0}
        
    coords = df_filtered[["x_utm", "y_utm"]].values
    dbscan = DBSCAN(eps=eps_val, min_samples=ms_val)
    labels = dbscan.fit_predict(coords)
    
    unique_labels = set(labels)
    clusters_out = []
    
    n_noise = list(labels).count(-1)
    noise_ratio = float(n_noise / len(labels) * 100.0) if len(labels) > 0 else 0.0
    
    for label in sorted(unique_labels):
        if label == -1:
            continue
            
        cluster_mask = (labels == label)
        c_points = coords[cluster_mask]
        df_cluster = df_filtered[cluster_mask]
        
        # Calculate centroid
        centroid_x = float(np.mean(c_points[:, 0]))
        centroid_y = float(np.mean(c_points[:, 1]))
        centroid_lat, centroid_lng = unproject_point(centroid_x, centroid_y)
        
        # Convex hull in UTM
        hull_pts = []
        if len(c_points) >= 3:
            try:
                hull = ConvexHull(c_points)
                for idx in hull.vertices:
                    lat, lng = unproject_point(c_points[idx, 0], c_points[idx, 1])
                    hull_pts.append({"lat": float(lat), "lng": float(lng)})
                # Close the polygon loop
                hull_pts.append(hull_pts[0])
            except Exception:
                # Fallback to list of all points if hull calculation fails (collinear points)
                for pt in c_points:
                    lat, lng = unproject_point(pt[0], pt[1])
                    hull_pts.append({"lat": float(lat), "lng": float(lng)})
        else:
            for pt in c_points:
                lat, lng = unproject_point(pt[0], pt[1])
                hull_pts.append({"lat": float(lat), "lng": float(lng)})
                
        # Stats
        avg_rating = float(df_cluster["rating"].mean())
        dominant_cat = df_cluster["category"].value_counts().index[0] if not df_cluster.empty else "None"
        
        clusters_out.append({
            "cluster_id": int(label),
            "hull": hull_pts,
            "center": {"lat": centroid_lat, "lng": centroid_lng},
            "count": len(df_cluster),
            "dominant_category": dominant_cat,
            "avg_rating": round(avg_rating, 2)
        })
        
    return {
        "clusters": clusters_out,
        "noise_ratio": round(noise_ratio, 2),
        "params_used": {"eps": eps_val, "min_samples": ms_val},
    }


# ---------------------------------------------------------------------------
# GET /analysis/competition
# ---------------------------------------------------------------------------
@router.get("/competition", summary="Get nearby competitor breakdown")
def get_competition(
    request: Request,
    db_name: str,
    lat: float = Query(..., ge=-90, le=90),
    lng: float = Query(..., ge=-180, le=180),
    radius: float = Query(500.0, gt=0, le=5000, description="Radius in meters"),
    db: Session = Depends(get_db)
):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"total_competitors": 0, "category_breakdown": [], "competitors": []}
        
    # Project target coordinates to UTM
    target_x, target_y = project_point(lat, lng)
    
    # Calculate Euclidean distance in meters
    dists = np.sqrt((df["x_utm"] - target_x) ** 2 + (df["y_utm"] - target_y) ** 2)
    df_near = df[dists <= radius].copy()
    df_near["distance_m"] = dists[dists <= radius]
    
    if df_near.empty:
        return {"total_competitors": 0, "category_breakdown": [], "competitors": []}
        
    total_count = len(df_near)
    
    # Category breakdown
    cats = df_near["category"].value_counts()
    breakdown = []
    for cat_name, cnt in cats.items():
        sub_df = df_near[df_near["category"] == cat_name]
        breakdown.append({
            "category": str(cat_name),
            "count": int(cnt),
            "pct": float(round((cnt / total_count) * 100, 2)),
            "avg_rating": float(round(sub_df["rating"].mean(), 2))
        })
        
    # Competitors list (sorted by distance)
    competitors = []
    df_near_sorted = df_near.sort_values(by="distance_m").head(100)
    for _, row in df_near_sorted.iterrows():
        competitors.append({
            "id": int(row["id"]),
            "name": str(row["name"]),
            "latitude": float(row["latitude"]),
            "longitude": float(row["longitude"]),
            "category": str(row["category"]),
            "rating": float(row["rating"]),
            "review": int(row["review"]),
            "distance_m": float(round(row["distance_m"], 1))
        })
        
    return {
        "total_competitors": total_count,
        "category_breakdown": breakdown,
        "competitors": competitors
    }


# ---------------------------------------------------------------------------
# GET /analysis/market-gap
# ---------------------------------------------------------------------------
@router.get("/market-gap", summary="Calculate market gap (demand vs supply) density grid")
def get_market_gap(
    request: Request,
    db_name: str,
    category: str = Query(..., description="Target category to check the gap for"),
    resolution_m: int = Query(250, ge=50, le=1000),
    db: Session = Depends(get_db)
):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"grid": []}
        
    # Demand is proxied by all business activity
    df_demand = df
    # Supply is proxied by target category
    df_supply = df[df["category"].str.lower() == category.lower()]
    
    if df_demand.empty or df_supply.empty:
        return {"grid": []}
        
    # Fit KDE models
    kde_demand = KernelDensity(bandwidth=resolution_m * 1.5, kernel="gaussian")
    kde_demand.fit(df_demand[["x_utm", "y_utm"]].values)
    
    kde_supply = KernelDensity(bandwidth=resolution_m * 1.5, kernel="gaussian")
    kde_supply.fit(df_supply[["x_utm", "y_utm"]].values)
    
    # Define grid limits
    x_min, x_max = df["x_utm"].min(), df["x_utm"].max()
    y_min, y_max = df["y_utm"].min(), df["y_utm"].max()
    
    x_grid = np.arange(x_min - resolution_m, x_max + resolution_m, resolution_m)
    y_grid = np.arange(y_min - resolution_m, y_max + resolution_m, resolution_m)
    
    if len(x_grid) == 0 or len(y_grid) == 0:
        return {"grid": []}
        
    xx, yy = np.meshgrid(x_grid, y_grid)
    grid_pts = np.vstack([xx.ravel(), yy.ravel()]).T
    
    # Prune to active areas
    tree = KDTree(df_demand[["x_utm", "y_utm"]].values)
    dists, _ = tree.query(grid_pts, k=1)
    active_idx = dists.ravel() < (resolution_m * 3)
    active_grid = grid_pts[active_idx]
    
    if len(active_grid) == 0:
        return {"grid": []}
        
    # Evaluate KDE
    dens_demand = np.exp(kde_demand.score_samples(active_grid))
    dens_supply = np.exp(kde_supply.score_samples(active_grid))
    
    # Normalize to [0.0, 1.0]
    def normalize(arr):
        mn, mx = arr.min(), arr.max()
        return (arr - mn) / (mx - mn) if mx > mn else np.ones_like(arr)
        
    w_demand = normalize(dens_demand)
    w_supply = normalize(dens_supply)
    
    # Gap is high demand, low supply
    gap = np.clip(w_demand - w_supply, 0.0, 1.0)
    
    grid_out = []
    for (x, y), g in zip(active_grid, gap):
        lat, lng = unproject_point(x, y)
        grid_out.append({
            "lat": float(lat),
            "lng": float(lng),
            "gap_score": float(round(g, 4))
        })
        
    return {"grid": grid_out}


# ---------------------------------------------------------------------------
# GET /analysis/saturation
# ---------------------------------------------------------------------------
@router.get("/saturation", summary="Get market saturation status per zone")
def get_saturation(
    request: Request,
    db_name: str,
    category: str = Query(..., description="Target category"),
    eps: float | None = Query(None, gt=0, description="DBSCAN epsilon in meters (default: from training metadata)"),
    min_samples: int | None = Query(None, ge=2, description="DBSCAN min samples (default: from training metadata)"),
    db: Session = Depends(get_db)
):
    """Return Market Saturation Index per zone.

    ``eps`` and ``min_samples`` default to the per-run training values.
    """
    default_eps, default_ms = _get_dbscan_defaults(db_name)
    eps_val = eps if eps is not None else default_eps
    ms_val = min_samples if min_samples is not None else default_ms

    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"zones": []}
        
    # Run DBSCAN on all businesses to identify major commercial clusters (zones)
    coords = df[["x_utm", "y_utm"]].values
    dbscan = DBSCAN(eps=eps_val, min_samples=ms_val)
    labels = dbscan.fit_predict(coords)
    
    total_selected = len(df[df["category"].str.lower() == category.lower()])
    total_all = len(df)
    overall_ratio = total_selected / total_all if total_all > 0 else 0.0
    
    zones_out = []
    unique_labels = set(labels)
    
    for label in sorted(unique_labels):
        if label == -1:
            continue
            
        cluster_mask = (labels == label)
        c_points = coords[cluster_mask]
        df_cluster = df[cluster_mask]
        
        # Calculate centroid
        centroid_x = float(np.mean(c_points[:, 0]))
        centroid_y = float(np.mean(c_points[:, 1]))
        centroid_lat, centroid_lng = unproject_point(centroid_x, centroid_y)
        
        # Convex hull
        hull_pts = []
        if len(c_points) >= 3:
            try:
                hull = ConvexHull(c_points)
                for idx in hull.vertices:
                    lat, lng = unproject_point(c_points[idx, 0], c_points[idx, 1])
                    hull_pts.append({"lat": float(lat), "lng": float(lng)})
                hull_pts.append(hull_pts[0])
            except Exception:
                for pt in c_points:
                    lat, lng = unproject_point(pt[0], pt[1])
                    hull_pts.append({"lat": float(lat), "lng": float(lng)})
        else:
            for pt in c_points:
                lat, lng = unproject_point(pt[0], pt[1])
                hull_pts.append({"lat": float(lat), "lng": float(lng)})
                
        # Calculate MSI (Market Saturation Index)
        cluster_selected = len(df_cluster[df_cluster["category"].str.lower() == category.lower()])
        cluster_total = len(df_cluster)
        cluster_ratio = cluster_selected / cluster_total if cluster_total > 0 else 0.0
        
        msi = cluster_ratio / overall_ratio if overall_ratio > 0 else 1.0
        
        # Status classification
        if msi > 1.4:
            status = "over-saturated"
        elif msi < 0.6:
            status = "under-served"
        else:
            status = "balanced"
            
        zones_out.append({
            "zone_id": int(label),
            "hull": hull_pts,
            "center": {"lat": centroid_lat, "lng": centroid_lng},
            "total_businesses": cluster_total,
            "category_count": cluster_selected,
            "msi": float(round(msi, 2)),
            "status": status
        })
        
    return {
        "zones": zones_out,
        "params_used": {"eps": eps_val, "min_samples": ms_val},
    }


# ---------------------------------------------------------------------------
# GET /analysis/market-composition
# ---------------------------------------------------------------------------
@router.get("/market-composition", summary="Get total market composition")
def get_market_composition(request: Request, db_name: str, db: Session = Depends(get_db)):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"composition": []}
        
    total = len(df)
    counts = df["category"].value_counts()
    
    comp = []
    for cat_name, cnt in counts.items():
        comp.append({
            "category": str(cat_name),
            "count": int(cnt),
            "pct": float(round((cnt / total) * 100, 2))
        })
        
    return {"composition": comp}


# ---------------------------------------------------------------------------
# GET /analysis/dominant-category
# ---------------------------------------------------------------------------
@router.get("/dominant-category", summary="Get the dominant business category details")
def get_dominant_category(request: Request, db_name: str, db: Session = Depends(get_db)):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"dominant": None}
        
    counts = df["category"].value_counts()
    if counts.empty:
        return {"dominant": None}
        
    dom_name = counts.index[0]
    dom_count = int(counts.values[0])
    dom_pct = float(round((dom_count / len(df)) * 100, 2))
    
    dom_df = df[df["category"] == dom_name]
    avg_rating = float(round(dom_df["rating"].mean(), 2))
    total_reviews = int(dom_df["review"].sum())
    
    return {
        "dominant": {
            "category": str(dom_name),
            "count": dom_count,
            "pct": dom_pct,
            "avg_rating": avg_rating,
            "total_reviews": total_reviews
        }
    }


# ---------------------------------------------------------------------------
# GET /analysis/market-motif
# ---------------------------------------------------------------------------
@router.get("/market-motif", summary="Get natural language summary motif for the market")
def get_market_motif(request: Request, db_name: str, db: Session = Depends(get_db)):
    df = get_places_df(db, _dataset_id(request))
    if df.empty:
        return {"motif": "Empty Market"}
        
    total_businesses = len(df)
    avg_rating = float(df["rating"].mean())
    top_cats = df["category"].value_counts()
    
    if top_cats.empty:
        return {"motif": "Commercial zone with no category data"}
        
    primary_cat = top_cats.index[0]
    
    motif = f"A bustling market zone featuring {total_businesses} active businesses, with '{primary_cat}' as the dominant sector. Average customer satisfaction rating stands at a solid {avg_rating:.2f}/5."
    return {"motif": motif}
