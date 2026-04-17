"""SQLAlchemy database engine and session management."""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

class Base(DeclarativeBase):
    """Declarative base for ORM models."""
    pass

_engines = {}
_sessionmakers = {}

def get_sessionmaker_for_category(category: str):
    category = category.title()
    if category in _sessionmakers:
        return _sessionmakers[category]
        
    db_path = f"db/{category}/{category}.db"
    full_path = os.path.join(os.getcwd(), db_path)
    
    if not os.path.exists(full_path):
        return None
        
    db_url = f"sqlite:///{full_path}"
    engine = create_engine(
        db_url,
        connect_args={"check_same_thread": False},
        echo=False,
    )
    _engines[category] = engine
    sm = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    _sessionmakers[category] = sm
    return sm
