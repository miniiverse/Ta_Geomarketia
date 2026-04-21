from pydantic import BaseModel
from typing import Optional

class ProjectOut(BaseModel):
    project_name: str
    db_id: str
    date: str
    province: str
    regency: str
    category: str
    total_data: int
