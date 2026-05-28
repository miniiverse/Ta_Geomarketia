"""Pydantic schemas for Place API request/response validation."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class PlaceOut(BaseModel):
    """Response schema for a single place.

    Field names use the legacy API shape (snake_case, matching the original
    SQLite column names) so the frontend doesn't need to change its types.
    The ORM model uses `from_attributes=True` to map from the Postgres
    column names.
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    category: str | None = None
    rating: float | None = None
    review: int | None = None
    price_level: int | None = None
    services: str | None = None
    address: str | None = None
    open_hours: str | None = None
    phone: str | None = None
    url: str | None = None
    cluster_id: int | None = None

    @classmethod
    def from_orm_place(cls, place) -> "PlaceOut":
        """Map from the Postgres ORM model to the API response shape."""
        return cls(
            id=place.id,
            name=place.place_name,
            latitude=place.latitude,
            longitude=place.longitude,
            category=place.category,
            rating=place.rating,
            review=place.review_count,
            price_level=place.price_level,
            services=place.services,
            address=place.address,
            open_hours=place.open_hours,
            phone=place.phone,
            url=place.url,
            cluster_id=place.cluster_id,
        )
