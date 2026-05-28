"""SQLAlchemy database engine and session management.

Single Postgres engine connected to Supabase. The legacy per-file SQLite
routing is removed — all datasets now live in one database, scoped by
`dataset_id` at the query layer.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

if not settings.POSTGRES_URL:
    raise RuntimeError(
        "POSTGRES_URL is not set. Add it to fastapi/.env "
        "(see .env.example for the expected format)."
    )

# Ensure the URL uses the psycopg (v3) driver dialect.
# Users typically set `postgresql://...` — SQLAlchemy needs `postgresql+psycopg://...`
_url = settings.POSTGRES_URL
if _url.startswith("postgresql://"):
    _url = "postgresql+psycopg://" + _url[len("postgresql://"):]
elif _url.startswith("postgres://"):
    _url = "postgresql+psycopg://" + _url[len("postgres://"):]

engine = create_engine(
    _url,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    echo=False,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Declarative base for ORM models."""
    pass
