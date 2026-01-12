#
#   Crafted On Mon Jan 12 2026
#   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
#   fluctuations, signal interference, or doubt—it can only be
#   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
#
#   www.devlan.co.ke
#   hello@devlan.co.ke
#
#
#   The Devlan Solutions LTD Super Duper User License Agreement
#   Copyright (c) 2022 Devlan Solutions LTD
#
#
#   1. LICENSE TO BE AWESOME
#   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
#   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
#   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
#   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
#   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
#   And don't even think about putting this on a network or letting a crowd join the fun unless you
#   first scored a multi-user license from us. Sharing is caring, but rules are rules!
#
#   2. COPYRIGHT POWER-UP
#   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
#   and the forces of international copyright treaties. You better not try to hide or mess with
#   any of our awesome proprietary notices, labels, or marks. Respect the swag!
#
#
#   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
#   You may not, and you shall not let anyone else:
#   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
#   figure out the source code of this software;
#   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
#   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
#   lease, or otherwise exploit the Software like it's your own.
#
#
#   4. THE ENDGAME
#   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
#   destroying the Software and all the copies you made (no hiding them under your bed).
#   If you break any of these sacred rules, this License self-destructs, and you must obliterate
#   every copy of the Software, no questions asked.
#
#
#   5. NO GUARANTEES, JUST PIXELS
#   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
#   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
#   implied or otherwise. That means no promises of perfect performance, marketability, or
#   non-infringement. Some places have different rules, so you might have extra rights, but don’t
#   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
#
#
#   6. SEVERABILITY—KEEP THE GOOD STUFF
#   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
#   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
#
#
#   7. NO DAMAGE, NO DRAMA
#   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
#   indirect, or accidental chaos that might come from using this software—even if we warned you!
#   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
#   paid—if any. No drama, no big payouts, just pixels and code.
#
#

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid
from fastapi import BackgroundTasks
from backend.execution.dfir_runner import run_dfir_job
from backend.execution.engine_adapter import execute_dfir_case
from backend.db.session import SessionLocal

from backend.db.session import get_db
from backend.models.jobs import Job
from backend.models.cases import Case
from backend.models.users import User
from backend.deps import get_current_user
from backend.schemas.jobs import JobResponse
router = APIRouter()


# =========================
# Schemas
# =========================

class JobCreateRequest(BaseModel):
    case_id: str
    job_type: str = "dfir_run"


class JobResponse(BaseModel):
    job_id: str
    case_id: str
    job_type: str
    job_status: str
    job_progress: Optional[str]
    created_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]


# =========================
# CREATE JOB
# =========================
@router.post("/", response_model=JobResponse)
def create_job(
    payload: JobCreateRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    case = db.query(Case).filter(
        Case.case_id == payload.case_id,
        Case.organization_id == current_user.organization_id
    ).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    existing = db.query(Job).filter(
        Job.case_id == payload.case_id,
        Job.job_status.in_(["queued", "running"])
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Job already running")

    job = Job(
        job_id=str(uuid.uuid4()),
        case_id=payload.case_id,
        organization_id=current_user.organization_id,
        job_type=payload.job_type,
        job_status="queued",
        job_stage="queued",
        job_progress="queued",
        job_progress_percent=0,
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    # ✅ BACKGROUND EXECUTION (unchanged)
    background_tasks.add_task(
        run_dfir_job,
        job.job_id,
        SessionLocal(),
        execute_dfir_case
    )

    return {
        "job_id": job.job_id,
        "case_id": job.case_id,
        "organization_id": job.organization_id,
        "job_type": job.job_type,
        "job_status": job.job_status,

        "job_stage": job.job_stage or "queued",
        "job_progress": job.job_progress or "queued",
        "job_progress_percent": job.job_progress_percent or 0,
        "job_eta_seconds": job.job_eta_seconds,

        "created_at": job.created_at,
        "started_at": job.started_at,
        "completed_at": job.completed_at,
    }


# =========================
# GET JOB BY ID
# =========================

@router.get("/{job_id}", response_model=JobResponse)
def get_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    job = db.query(Job).filter(
        Job.job_id == job_id,
        Job.organization_id == current_user.organization_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )

    return job


# =========================
# LIST JOBS BY CASE
# =========================

@router.get("/", response_model=List[JobResponse])
def list_jobs(
    case_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Job).filter(
        Job.organization_id == current_user.organization_id
    )

    if case_id:
        query = query.filter(Job.case_id == case_id)

    return query.order_by(Job.created_at.desc()).all()
