"""Places endpoints — thin controller layer.

Route handlers delegate all database logic to the CRUD module.
The `db_name` path parameter is resolved to a `dataset_id` by the
`get_db` dependency (stored on `request.state.dataset_id`).
"""

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.crud import place as place_crud
from app.schemas.common import PaginatedResponse
from app.schemas.place import PlaceOut

router = APIRouter()


def _dataset_id(request: Request) -> str:
    return str(request.state.dataset_id)


@router.get(
    "/categories",
    response_model=list[str],
    summary="List all unique business categories",
)
def list_categories(request: Request, db_name: str, db: Session = Depends(get_db)):
    return place_crud.list_categories(db=db, dataset_id=_dataset_id(request))


@router.get(
    "/search",
    response_model=PaginatedResponse[PlaceOut],
    summary="Search places by keyword",
)
def search_places(
    request: Request,
    db_name: str,
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    page_size: int = Query(settings.DEFAULT_PAGE_SIZE, ge=1, le=settings.MAX_PAGE_SIZE),
    db: Session = Depends(get_db),
):
    return place_crud.search_places(
        db=db, dataset_id=_dataset_id(request), q=q, page=page, page_size=page_size
    )


@router.get(
    "/nearby",
    response_model=PaginatedResponse[PlaceOut],
    summary="Find places near a coordinate",
)
def nearby_places(
    request: Request,
    db_name: str,
    lat: float = Query(..., ge=-90, le=90),
    lng: float = Query(..., ge=-180, le=180),
    radius_km: float = Query(5.0, gt=0, le=50),
    category: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(settings.DEFAULT_PAGE_SIZE, ge=1, le=settings.MAX_PAGE_SIZE),
    db: Session = Depends(get_db),
):
    return place_crud.nearby_places(
        db=db,
        dataset_id=_dataset_id(request),
        lat=lat,
        lng=lng,
        radius_km=radius_km,
        category=category,
        page=page,
        page_size=page_size,
    )


@router.get(
    "",
    response_model=PaginatedResponse[PlaceOut],
    summary="List all places (paginated)",
)
def list_places(
    request: Request,
    db_name: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(settings.DEFAULT_PAGE_SIZE, ge=1, le=settings.MAX_PAGE_SIZE),
    category: str | None = Query(None),
    min_rating: float | None = Query(None, ge=0, le=5),
    db: Session = Depends(get_db),
):
    return place_crud.list_places(
        db=db,
        dataset_id=_dataset_id(request),
        page=page,
        page_size=page_size,
        category=category,
        min_rating=min_rating,
    )


@router.get(
    "/{place_id}",
    response_model=PlaceOut,
    summary="Get a single place by ID",
)
def get_place(request: Request, db_name: str, place_id: int, db: Session = Depends(get_db)):
    place = place_crud.get_place(db=db, place_id=place_id, dataset_id=_dataset_id(request))
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return PlaceOut.from_orm_place(place)
