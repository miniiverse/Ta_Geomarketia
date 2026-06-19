"""SQLAlchemy ORM model for the places table (Postgres)."""

from sqlalchemy import Boolean, Column, DateTime, Float, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.core.database import Base


class Place(Base):
    """Represents a business location, scoped to a dataset."""

    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(UUID(as_uuid=True), nullable=True, index=True)
    place_name = Column("place_name", Text, nullable=False)
    category = Column(Text, nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    price_level = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    review_count = Column("review_count", Integer, nullable=True)
    url = Column(Text, nullable=True)
    services = Column(Text, nullable=True)
    address = Column(Text, nullable=True)
    open_hours = Column("open_hours", Text, nullable=True)
    phone = Column(Text, nullable=True)
    cluster_id = Column("cluster_id", Integer, nullable=True)
    is_deleted = Column("is_deleted", Boolean, nullable=False, default=False)
    imported_at = Column("imported_at", DateTime(timezone=True), nullable=True)
    imported_by = Column("imported_by", UUID(as_uuid=True), nullable=True)
    created_at = Column("created_at", DateTime(timezone=True), nullable=True)
    updated_at = Column("updated_at", DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<Place(id={self.id}, name='{self.place_name}')>"


class Dataset(Base):
    """Represents a dataset (one per scrape cohort)."""

    __tablename__ = "datasets"

    id = Column(UUID(as_uuid=True), primary_key=True)
    db_key = Column("db_key", Text, nullable=False, unique=True)
    project_name = Column("project_name", Text, nullable=False)
    country = Column(Text, nullable=False)
    province = Column(Text, nullable=True)
    city = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    source_category = Column("source_category", Text, nullable=True)
    scraped_at = Column("scraped_at", DateTime(timezone=True), nullable=True)
    lat_min = Column("lat_min", Float, nullable=True)
    lat_max = Column("lat_max", Float, nullable=True)
    lng_min = Column("lng_min", Float, nullable=True)
    lng_max = Column("lng_max", Float, nullable=True)
    total_places = Column("total_places", Integer, nullable=False, default=0)
    status = Column("status", Text, nullable=False, default="active")
    created_at = Column("created_at", DateTime(timezone=True), nullable=True)
    updated_at = Column("updated_at", DateTime(timezone=True), nullable=True)
    archived_at = Column("archived_at", DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<Dataset(db_key='{self.db_key}')>"


class AiConfig(Base):
    """Represents the active AI configuration for a dataset."""

    __tablename__ = "ai_config"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(UUID(as_uuid=True), nullable=True, index=True)
    eps_meters = Column("eps_meters", Float, nullable=False, default=150.0)
    min_samples = Column("min_samples", Integer, nullable=False, default=10)
    radius_options = Column("radius_options", JSONB, nullable=False, default=[500, 750, 1000])
    msi_thresholds = Column("msi_thresholds", JSONB, nullable=False, default={"over_saturated": 50, "under_served": 10})
    is_active = Column("is_active", Boolean, nullable=False, default=True)
    created_at = Column("created_at", DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<AiConfig(dataset_id={self.dataset_id}, active={self.is_active})>"
