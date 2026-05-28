"""Shared pytest fixtures for the FastAPI test suite."""

from __future__ import annotations

import os
import sqlite3
import tempfile
from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.database import Base, _sessionmakers, _engines
from app.main import app
from app.api.deps import get_db


# ---------------------------------------------------------------------------
# Minimal SQLite fixture DB
# ---------------------------------------------------------------------------
SAMPLE_PLACES = [
    # (name, rating, review, category, latitude, longitude)
    ("Warung Makan A", 4.5, 120, "Kuliner", "1.1234", "104.0123"),
    ("Warung Makan B", 3.8, 45, "Kuliner", "1.1240", "104.0130"),
    ("Warung Makan C", 4.2, 200, "Kuliner", "1.1250", "104.0140"),
    ("Hotel Batam", 4.0, 300, "Hotel", "1.1300", "104.0200"),
    ("Apotek Sehat", 4.7, 80, "Kesehatan", "1.1260", "104.0150"),
    ("Toko Baju", 3.5, 30, "Retail", "1.1270", "104.0160"),
    ("Restoran Padang", 4.6, 500, "Kuliner", "1.1280", "104.0170"),
    ("Cafe Kopi", 4.3, 150, "Kuliner", "1.1290", "104.0180"),
    ("Bakso Pak Budi", 4.1, 90, "Kuliner", "1.1300", "104.0190"),
    ("Nasi Goreng 88", 4.4, 110, "Kuliner", "1.1310", "104.0200"),
    ("Soto Ayam Lamongan", 4.2, 75, "Kuliner", "1.1320", "104.0210"),
    ("Mie Ayam Pak Joko", 3.9, 60, "Kuliner", "1.1330", "104.0220"),
    ("Rumah Makan Minang", 4.5, 180, "Kuliner", "1.1340", "104.0230"),
    ("Depot Seafood", 4.0, 95, "Kuliner", "1.1350", "104.0240"),
    ("Warung Sate", 4.3, 130, "Kuliner", "1.1360", "104.0250"),
    ("Klinik Pratama", 4.6, 200, "Kesehatan", "1.1370", "104.0260"),
    ("Apotek Kimia Farma", 4.4, 150, "Kesehatan", "1.1380", "104.0270"),
    ("Hotel Grand", 4.8, 400, "Hotel", "1.1390", "104.0280"),
    ("Hotel Melati", 3.7, 50, "Hotel", "1.1400", "104.0290"),
    ("Toko Elektronik", 4.0, 70, "Retail", "1.1410", "104.0300"),
    ("Toko Bangunan Maju", 3.8, 40, "Retail", "1.1420", "104.0310"),
    ("PT Maju Bersama", 4.1, 20, "PT", "1.1430", "104.0320"),
    ("SD Negeri 1", 4.5, 100, "School", "1.1440", "104.0330"),
    ("SMP Negeri 2", 4.3, 80, "School", "1.1450", "104.0340"),
    ("Kosmetik Cantik", 4.2, 60, "Cosmetics", "1.1460", "104.0350"),
]


@pytest.fixture(scope="session")
def tmp_db_path() -> Generator[str, None, None]:
    """Create a temporary SQLite database with sample places data."""
    with tempfile.TemporaryDirectory() as tmpdir:
        db_path = os.path.join(tmpdir, "test_db.db")
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                rating REAL,
                review INTEGER,
                price_level INTEGER,
                category TEXT,
                services TEXT,
                address TEXT,
                open_hours TEXT,
                phone TEXT,
                latitude TEXT,
                longitude TEXT,
                url TEXT,
                cluster TEXT DEFAULT '0'
            )
            """
        )
        cur.executemany(
            "INSERT INTO places (name, rating, review, category, latitude, longitude) VALUES (?,?,?,?,?,?)",
            SAMPLE_PLACES,
        )
        conn.commit()
        conn.close()
        yield db_path


@pytest.fixture(scope="session")
def db_name(tmp_db_path: str) -> str:
    """Register the temp DB in the session cache and return its logical name."""
    name = "test_db"
    engine = create_engine(
        f"sqlite:///{tmp_db_path}",
        connect_args={"check_same_thread": False},
    )
    sm = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    _engines[name] = engine
    _sessionmakers[name] = sm
    return name


@pytest.fixture()
def client(db_name: str) -> Generator[TestClient, None, None]:
    """TestClient with the get_db dependency overridden to use the temp DB."""

    def override_get_db():
        sm = _sessionmakers[db_name]
        db: Session = sm()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
