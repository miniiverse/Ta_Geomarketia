"""API v1 aggregation router.

Import and include all endpoint routers for version 1 of the API.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import places

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(places.router, prefix="/{main_category}/places", tags=["Places"])
