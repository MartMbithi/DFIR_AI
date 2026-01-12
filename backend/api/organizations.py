
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.db.session import get_db
from backend.models.organizations import Organization
from backend.deps import get_current_user
import uuid, datetime

router = APIRouter()

@router.post("/")
def create_organization(
    organization_name: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    org = Organization(
        organization_id=str(uuid.uuid4()),
        organization_name=organization_name,
        organization_created_at=datetime.datetime.utcnow()
    )

    current_user.organization_id = org.organization_id
    current_user.user_role = "admin"

    db.add(org)
    db.commit()

    return {
        "organization_id": org.organization_id,
        "organization_name": org.organization_name
    }
