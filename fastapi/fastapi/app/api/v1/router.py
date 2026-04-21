"""API v1 aggregation router.

Import and include all endpoint routers for version 1 of the API.
"""

import os
from fastapi import APIRouter

from app.api.v1.endpoints import places

v1_router = APIRouter(prefix="/api/v1")

@v1_router.get("/databases", tags=["System"])
def list_databases():
    """List all available database filenames in the db folder (without .db)."""
    db_dir = os.path.join(os.getcwd(), "db")
    if not os.path.exists(db_dir):
        return []
    
    files = [f.replace(".db", "") for f in os.listdir(db_dir) if f.endswith(".db")]
    return sorted(files)

@v1_router.get("/projects", tags=["System"])
def list_projects():
    """List detailed project metadata for all available databases."""
    from datetime import datetime
    import sqlite3
    
    db_dir = os.path.join(os.getcwd(), "db")
    if not os.path.exists(db_dir):
        return []
    
    projects = []
    
    # A simple lookup map for Regency -> Province based on current files
    prov_map = {
        "Batam": "Kepulauan Riau",
        "Jakarta": "DKI Jakarta",
        "Surabaya": "Jawa Timur",
        "Bandung": "Jawa Barat",
        "Medan": "Sumatera Utara",
        "Makassar": "Sulawesi Selatan"
    }

    files = [f for f in os.listdir(db_dir) if f.endswith(".db")]
    for file in sorted(files):
        # file format: Indonesia.Batam.Cosmetics.202410290644.db
        name_no_ext = file.replace(".db", "")
        parts = name_no_ext.split(".")
        
        # Safe extraction with fallbacks
        country = parts[0] if len(parts) > 0 else "Unknown"
        regency = parts[1] if len(parts) > 1 else "Unknown"
        category = parts[2] if len(parts) > 2 else "Unknown"
        raw_date = parts[3] if len(parts) > 3 else "202401010000"
        
        province = prov_map.get(regency, "Unknown Province")
        
        try:
            db_date = datetime.strptime(raw_date[:8], "%Y%m%d").strftime("%d %b %Y")
        except ValueError:
            db_date = raw_date
            
        project_name = f"{category} Dataset - {regency}"
        
        # Connect to DB to get total_data
        db_path = os.path.join(db_dir, file)
        try:
            conn = sqlite3.connect(db_path)
            cur = conn.cursor()
            cur.execute("SELECT COUNT(*) FROM places")
            total_data = cur.fetchone()[0]
            conn.close()
        except sqlite3.Error:
            total_data = 0
            
        projects.append({
            "project_name": project_name,
            "db_id": name_no_ext,
            "date": db_date,
            "province": province,
            "regency": regency,
            "category": category,
            "total_data": total_data
        })
        
    return projects

v1_router.include_router(places.router, prefix="/{db_name}/places", tags=["Places"])
