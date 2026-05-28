"""Shared FastAPI dependencies used across API versions."""

from typing import Generator

from fastapi import Request, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.place import Dataset


def get_db(request: Request) -> Generator[Session, None, None]:
    """Provide a database session per request.

    Also resolves the `db_name` path parameter to a `dataset_id` UUID and
    stores it on `request.state.dataset_id` so endpoint handlers and CRUD
    functions can scope their queries without repeating the lookup.
    """
    db = SessionLocal()
    try:
        db_name = request.path_params.get("db_name")
        if db_name:
            dataset = (
                db.query(Dataset)
                .filter(Dataset.db_key == db_name)
                .filter(text("datasets.status != 'archived'"))
                .first()
            )
            if not dataset:
                raise HTTPException(
                    status_code=404,
                    detail=f"Dataset '{db_name}' not found or archived",
                )
            request.state.dataset_id = dataset.id
        yield db
    finally:
        db.close()


def get_dataset_id(request: Request) -> str:
    """Extract the resolved dataset_id from request state.

    Must be used after `get_db` in the dependency chain.
    """
    dataset_id = getattr(request.state, "dataset_id", None)
    if not dataset_id:
        raise HTTPException(status_code=400, detail="No dataset context resolved")
    return str(dataset_id)
