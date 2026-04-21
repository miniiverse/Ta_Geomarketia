"""Shared Pydantic schemas used across multiple domains."""

from __future__ import annotations

from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response wrapper."""

    total: int
    page: int
    page_size: int
    total_pages: int
    data: list[T]
