"""Shared FastAPI dependencies used across API versions."""

from typing import Generator
from fastapi import Request, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_sessionmaker_for_category


def get_db(request: Request) -> Generator[Session, None, None]:
    """FastAPI dependency that provides a database session per request."""
    category = request.path_params.get("main_category")
    if not category:
        raise HTTPException(status_code=400, detail="Missing category in path")
    
    sm = get_sessionmaker_for_category(category)
    if not sm:
        raise HTTPException(status_code=404, detail=f"Database for category '{category}' not found")
        
    db = sm()
    try:
        yield db
    finally:
        db.close()
