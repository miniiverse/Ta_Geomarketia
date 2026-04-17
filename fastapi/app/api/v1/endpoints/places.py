"""Places endpoints — thin controller layer.

Route handlers delegate all database logic to the CRUD module.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.crud import place as place_crud
from app.schemas.common import PaginatedResponse
from app.schemas.place import PlaceOut

router = APIRouter()


# ---------------------------------------------------------------------------
# GET /categories
# ---------------------------------------------------------------------------
@router.get(
    "/categories",
    response_model=list[str],
    summary="List all unique business categories",
)
def list_categories(db: Session = Depends(get_db)):
    """Return a sorted list of every distinct category in the dataset."""
    return place_crud.list_categories(db=db)


# ---------------------------------------------------------------------------
# GET /search
# ---------------------------------------------------------------------------
@router.get(
    "/search",
    response_model=PaginatedResponse[PlaceOut],
    summary="Search places by keyword",
)
def search_places(
    q: str = Query(
        ..., min_length=1, description="Search query (name, category, or address)"
    ),
    page: int = Query(1, ge=1),
    page_size: int = Query(
        settings.DEFAULT_PAGE_SIZE, ge=1, le=settings.MAX_PAGE_SIZE
    ),
    db: Session = Depends(get_db),
):
    """Full-text search across name, category, and address columns."""
    return place_crud.search_places(db=db, q=q, page=page, page_size=page_size)


# ---------------------------------------------------------------------------
# GET /nearby
# ---------------------------------------------------------------------------
@router.get(
    "/nearby",
    response_model=PaginatedResponse[PlaceOut],
    summary="Find places near a coordinate",
)
def nearby_places(
    lat: float = Query(..., ge=-90, le=90, description="Latitude"),
    lng: float = Query(..., ge=-180, le=180, description="Longitude"),
    radius_km: float = Query(5.0, gt=0, le=50, description="Search radius in km"),
    category: str | None = Query(None, description="Optional category filter"),
    page: int = Query(1, ge=1),
    page_size: int = Query(
        settings.DEFAULT_PAGE_SIZE, ge=1, le=settings.MAX_PAGE_SIZE
    ),
    db: Session = Depends(get_db),
):
    """Return places within *radius_km* of the given lat/lng (Haversine).

    Results are sorted by distance (nearest first).
    """
    return place_crud.nearby_places(
        db=db,
        lat=lat,
        lng=lng,
        radius_km=radius_km,
        category=category,
        page=page,
        page_size=page_size,
    )


# ---------------------------------------------------------------------------
# GET / (list all places, paginated)
# ---------------------------------------------------------------------------
@router.get(
    "",
    response_model=PaginatedResponse[PlaceOut],
    summary="List all places (paginated)",
)
def list_places(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(
        settings.DEFAULT_PAGE_SIZE,
        ge=1,
        le=settings.MAX_PAGE_SIZE,
        description="Items per page",
    ),
    category: str | None = Query(None, description="Filter by exact category"),
    min_rating: float | None = Query(
        None, ge=0, le=5, description="Minimum rating"
    ),
    db: Session = Depends(get_db),
):
    """Return a paginated list of places with optional filters."""
    return place_crud.list_places(
        db=db,
        page=page,
        page_size=page_size,
        category=category,
        min_rating=min_rating,
    )


# ---------------------------------------------------------------------------
# GET /{place_id}
# ---------------------------------------------------------------------------
@router.get(
    "/{place_id}",
    response_model=PlaceOut,
    summary="Get a single place by ID",
)
def get_place(place_id: int, db: Session = Depends(get_db)):
    """Retrieve full details for a single place."""
    place = place_crud.get_place(db=db, place_id=place_id)
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return place
