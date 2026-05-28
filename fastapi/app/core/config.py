"""Application configuration using pydantic-settings."""

from pathlib import Path

from pydantic_settings import BaseSettings

# Resolve the project root (fastapi/) relative to this file
BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings(BaseSettings):
    """Application settings.

    Values can be overridden via environment variables or a .env file.
    """

    APP_TITLE: str = "GeoMarketia"
    APP_DESCRIPTION: str = (
        "Geospatial API for business locations in Batam, Indonesia. "
        "Browse, search, and discover nearby places with AI-powered analytics."
    )
    APP_VERSION: str = "1.0.0"

    # Postgres connection string (Supabase transaction pooler, port 6543).
    # This is the single source of truth for all data access.
    POSTGRES_URL: str = ""

    # Filesystem location of per-run ML artifacts produced by the training
    # repo (`geomarketia-train`). The API expects the layout:
    #   <ARTIFACTS_DIR>/runs/<db_key>/{data,models,reports}/...
    # Default points at `<fastapi>/artifacts`. For local development the
    # value is typically overridden via `.env` to a sibling checkout, e.g.:
    #   ARTIFACTS_DIR=../geomarketia-train/content
    ARTIFACTS_DIR: str = str(BASE_DIR / "artifacts")

    # Default pagination
    DEFAULT_PAGE_SIZE: int = 50
    MAX_PAGE_SIZE: int = 100

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()


# Resolved Path objects derived from the settings above. Callers should
# import these rather than re-deriving paths from `settings.ARTIFACTS_DIR`.
# Relative paths are anchored to `BASE_DIR` (the `fastapi/` folder), not
# the process CWD, so the API works regardless of where it's launched.
def _resolve_artifacts_dir(value: str) -> Path:
    p = Path(value)
    if not p.is_absolute():
        p = (BASE_DIR / p).resolve()
    else:
        p = p.resolve()
    return p


ARTIFACTS_PATH: Path = _resolve_artifacts_dir(settings.ARTIFACTS_DIR)
RUNS_PATH: Path = ARTIFACTS_PATH / "runs"
