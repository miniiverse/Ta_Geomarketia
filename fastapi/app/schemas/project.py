from pydantic import BaseModel
from typing import Optional

class ProjectOut(BaseModel):
    project_name: str
    db_id: str
    date: str
    province: str
    city: str
    category: str
    total_data: int
