"""CRUD operations for places — data-access layer.

All functions receive a SQLAlchemy Session and a dataset_id to scope queries.
No HTTP/FastAPI concerns belong here.
"""

from __future__ import annotations

import math

from sqlalchemy.orm import Session

from app.models.place import Place
from app.schemas.common import PaginatedResponse
from app.schemas.place import PlaceOut
from app.utils.geo import haversine_km


def _base_query(db: Session, dataset_id: str):
    """Base query scoped to a dataset, excluding soft-deleted rows."""
    return db.query(Place).filter(
        Place.dataset_id == dataset_id,
        Place.is_deleted == False,  # noqa: E712
    )


# ---------------------------------------------------------------------------
# Single record
# ---------------------------------------------------------------------------
def get_place(db: Session, place_id: int, dataset_id: str) -> Place | None:
    return (
        _base_query(db, dataset_id)
        .filter(Place.id == place_id)
        .first()
    )


# ---------------------------------------------------------------------------
# Category listing
# ---------------------------------------------------------------------------
def list_categories(db: Session, dataset_id: str) -> list[str]:
    rows = (
        _base_query(db, dataset_id)
        .with_entities(Place.category)
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
    dataset_id: str,
    page: int,
    page_size: int,
    category: str | None = None,
    min_rating: float | None = None,
) -> PaginatedResponse[PlaceOut]:
    query = _base_query(db, dataset_id)

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
        data=[PlaceOut.from_orm_place(p) for p in places],
    )


# ---------------------------------------------------------------------------
# Keyword search
# ---------------------------------------------------------------------------
def search_places(
    db: Session,
    dataset_id: str,
    q: str,
    page: int,
    page_size: int,
) -> PaginatedResponse[PlaceOut]:
    pattern = f"%{q}%"
    query = _base_query(db, dataset_id).filter(
        Place.place_name.ilike(pattern)
        | Place.category.ilike(pattern)
        | Place.address.ilike(pattern)
    )

    total = query.count()
    total_pages = math.ceil(total / page_size) if total else 0

    places = (
        query.order_by(Place.rating.desc().nullslast())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return PaginatedResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        data=[PlaceOut.from_orm_place(p) for p in places],
    )


# ---------------------------------------------------------------------------
# Nearby (geospatial) search
# ---------------------------------------------------------------------------
def nearby_places(
    db: Session,
    dataset_id: str,
    lat: float,
    lng: float,
    radius_km: float,
    category: str | None,
    page: int,
    page_size: int,
) -> PaginatedResponse[PlaceOut]:
    query = _base_query(db, dataset_id).filter(
        Place.latitude.isnot(None),
        Place.longitude.isnot(None),
    )

    if category:
        query = query.filter(Place.category == category)

    # Bounding-box pre-filter (1 degree ≈ 111 km)
    delta = radius_km / 111.0
    query = query.filter(
        Place.latitude >= lat - delta,
        Place.latitude <= lat + delta,
        Place.longitude >= lng - delta,
        Place.longitude <= lng + delta,
    )

    candidates = query.all()

    # Precise Haversine filter + distance sort
    results: list[tuple[Place, float]] = []
    for p in candidates:
        dist = haversine_km(lat, lng, p.latitude, p.longitude)
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
        data=[PlaceOut.from_orm_place(place) for place, _ in page_results],
    )
