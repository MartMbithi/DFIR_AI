from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class JobResponse(BaseModel):
    job_id: str
    case_id: str
    organization_id: str
    job_type: str
    job_status: str

    job_stage: Optional[str]
    job_progress: Optional[str]              # ← STRING
    job_progress_percent: Optional[int]       # ← INT
    job_eta_seconds: Optional[int]

    created_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True
