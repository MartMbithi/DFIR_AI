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
from typing import Optional
from datetime import datetime
import uuid
import json

from backend.db.session import get_db
from backend.models.forensic_artifacts import ForensicArtifact
from backend.models.cases import Case
from backend.models.users import User
from backend.deps import get_current_user

router = APIRouter()


# =========================
# Schemas
# =========================

class ArtifactCreateRequest(BaseModel):
    case_id: str
    artifact_type: Optional[str] = None
    source_tool: Optional[str] = None
    source_file: Optional[str] = None
    host_id: Optional[str] = None
    user_context: Optional[str] = None
    artifact_timestamp: Optional[datetime] = None
    artifact_path: Optional[str] = None
    content_summary: Optional[str] = None
    raw_content: Optional[str] = None
    md5: Optional[str] = None
    sha1: Optional[str] = None
    sha256: Optional[str] = None
    metadata: Optional[dict] = None


class ArtifactResponse(BaseModel):
    artifact_id: str
    case_id: str
    artifact_type: Optional[str]
    ingested_at: datetime


# =========================
# CREATE
# =========================

@router.post("/", response_model=ArtifactResponse)
def create_artifact(
    payload: ArtifactCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Ensure case belongs to user's organization
    case = db.query(Case).filter(
        Case.case_id == payload.case_id,
        Case.organization_id == current_user.organization_id
    ).first()

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found or access denied"
        )

    artifact = ForensicArtifact(
        artifact_id=str(uuid.uuid4()),
        case_id=payload.case_id,
        artifact_type=payload.artifact_type,
        source_tool=payload.source_tool,
        source_file=payload.source_file,
        host_id=payload.host_id,
        user_context=payload.user_context,
        artifact_timestamp=payload.artifact_timestamp,
        artifact_path=payload.artifact_path,
        content_summary=payload.content_summary,
        raw_content=payload.raw_content,
        md5=payload.md5,
        sha1=payload.sha1,
        sha256=payload.sha256,
        metadata=json.dumps(payload.metadata) if payload.metadata else None,
        ingested_at=datetime.utcnow()
    )

    db.add(artifact)
    db.commit()
    db.refresh(artifact)

    return artifact


# =========================
# LIST BY CASE
# =========================

@router.get("/", response_model=list[ArtifactResponse])
def list_artifacts(
    case_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify case ownership
    case = db.query(Case).filter(
        Case.case_id == case_id,
        Case.organization_id == current_user.organization_id
    ).first()

    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found or access denied"
        )

    return db.query(ForensicArtifact).filter(
        ForensicArtifact.case_id == case_id
    ).all()
