"""Shared FastAPI dependencies used across API versions."""

from typing import Generator
from fastapi import Request, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_sessionmaker_for_db


def get_db(request: Request) -> Generator[Session, None, None]:
    """FastAPI dependency that provides a database session per request."""
    db_name = request.path_params.get("db_name")
    if not db_name:
        raise HTTPException(status_code=400, detail="Missing db_name in path")
    
    sm = get_sessionmaker_for_db(db_name)
    if not sm:
        raise HTTPException(status_code=404, detail=f"Database '{db_name}' not found")
        
    db = sm()
    try:
        yield db
    finally:
        db.close()
