"""CRUD operations for places — data-access layer.

All functions receive a SQLAlchemy Session and return model instances or
plain data.  No HTTP/FastAPI concerns belong here.
"""

from __future__ import annotations

import math

from sqlalchemy import Float as SQLFloat
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.models.place import Place
from app.schemas.common import PaginatedResponse
from app.schemas.place import PlaceOut
from app.utils.geo import haversine_km


# ---------------------------------------------------------------------------
# Single record
# ---------------------------------------------------------------------------
def get_place(db: Session, place_id: int) -> Place | None:
    """Return a single Place by primary key, or ``None``."""
    return db.query(Place).filter(Place.id == place_id).first()


# ---------------------------------------------------------------------------
# Category listing
# ---------------------------------------------------------------------------
def list_categories(db: Session) -> list[str]:
    """Return a sorted list of every distinct category in the dataset."""
    rows = (
        db.query(Place.category)
        .filter(Place.category.isnot(None), Place.category != "")
        .distinct()
        .order_by(Place.category)
        .all()
    )
    return [r[0] for r in rows]


# ---------------------------------------------------------------------------
# Paginated list
# ---------------------------------------------------------------------------
def list_places(
    db: Session,
    page: int,
    page_size: int,
    category: str | None = None,
    min_rating: float | None = None,
) -> PaginatedResponse[PlaceOut]:
    """Return a paginated list of places with optional filters."""
    query = db.query(Place)

    if category:
        query = query.filter(Place.category == category)
    if min_rating is not None:
        query = query.filter(Place.rating >= min_rating)

    total = query.count()
    total_pages = math.ceil(total / page_size) if total else 0

    places = (
        query.order_by(Place.id)
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        data=[PlaceOut.model_validate(p) for p in places],
    )


# ---------------------------------------------------------------------------
# Keyword search
# ---------------------------------------------------------------------------
def search_places(
    db: Session,
    q: str,
    page: int,
    page_size: int,
) -> PaginatedResponse[PlaceOut]:
    """Full-text search across name, category, and address columns."""
    pattern = f"%{q}%"
    query = db.query(Place).filter(
        or_(
            Place.name.ilike(pattern),
            Place.category.ilike(pattern),
            Place.address.ilike(pattern),
        )
    )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total else 0

    places = (
        query.order_by(Place.rating.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        data=[PlaceOut.model_validate(p) for p in places],
    )


# ---------------------------------------------------------------------------
# Nearby (geospatial) search
# ---------------------------------------------------------------------------
def nearby_places(
    db: Session,
    lat: float,
    lng: float,
    radius_km: float,
    category: str | None,
    page: int,
    page_size: int,
) -> PaginatedResponse[PlaceOut]:
    """Return places within *radius_km* of the given lat/lng (Haversine).

    Results are sorted by distance (nearest first).
    """
    query = db.query(Place).filter(
        Place.latitude.isnot(None),
        Place.longitude.isnot(None),
        Place.latitude != "",
        Place.longitude != "",
    )

    if category:
        query = query.filter(Place.category == category)

    # Bounding-box pre-filter (1 degree ≈ 111 km)
    delta = radius_km / 111.0
    query = query.filter(
        func.cast(Place.latitude, SQLFloat) >= lat - delta,
        func.cast(Place.latitude, SQLFloat) <= lat + delta,
        func.cast(Place.longitude, SQLFloat) >= lng - delta,
        func.cast(Place.longitude, SQLFloat) <= lng + delta,
    )

    candidates = query.all()

    # Precise Haversine filter + distance sort
    results: list[tuple[Place, float]] = []
    for p in candidates:
        try:
            p_lat, p_lng = float(p.latitude), float(p.longitude)  # type: ignore[arg-type]
        except (TypeError, ValueError):
            continue
        dist = haversine_km(lat, lng, p_lat, p_lng)
        if dist <= radius_km:
            results.append((p, dist))

    results.sort(key=lambda x: x[1])

    total = len(results)
    total_pages = math.ceil(total / page_size) if total else 0
    page_results = results[(page - 1) * page_size : page * page_size]

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        data=[PlaceOut.model_validate(place) for place, _ in page_results],
    )
