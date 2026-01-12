
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.session import get_db
from backend.models.jobs import Job
from backend.models.job_stage_events import JobStageEvent
from backend.deps import get_current_user

router = APIRouter()

@router.get("/{job_id}/progress")
def get_job_progress(job_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    job = db.query(Job).filter(Job.job_id == job_id).first()
    return {
        "job_id": job.job_id,
        "status": job.job_status,
        "stage": job.job_stage,
        "progress_percent": job.job_progress_percent,
        "eta_seconds": job.job_eta_seconds,
    }

@router.get("/{job_id}/stages")
def get_job_stages(job_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    events = db.query(JobStageEvent).filter(JobStageEvent.job_id == job_id).all()
    return [
        {
            "stage": e.stage_name,
            "started_at": e.stage_started_at,
            "completed_at": e.stage_completed_at,
            "duration_seconds": e.duration_seconds,
        }
        for e in events
    ]
