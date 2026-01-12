from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid

from backend.db.session import get_db
from backend.models.users import User
from backend.security import hash_password

router = APIRouter()


class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    organization_id: Optional[str] = None


@router.post("/")
def create_user(
    payload: UserCreateRequest,
    db: Session = Depends(get_db)
):
    user = User(
        user_id=str(uuid.uuid4()),
        user_email=payload.email,
        user_password_hash=hash_password(payload.password),
        organization_id=payload.organization_id,
        user_role="analyst"
    )
    db.add(user)
    db.commit()
    return {"user_id": user.user_id}
