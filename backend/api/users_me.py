from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from backend.db.session import get_db
from backend.deps import get_current_user
from backend.models.users import User
from backend.security import verify_password, hash_password

router = APIRouter(prefix="/users", tags=["Users"])


# ===================== SCHEMAS =====================


class UserMeResponse(BaseModel):
    user_id: str
    email: EmailStr


class UpdateEmailRequest(BaseModel):
    email: EmailStr


class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str


# ===================== ENDPOINTS =====================


@router.get("/me", response_model=UserMeResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """
    Return the currently authenticated user's profile.
    """
    return {
        "user_id": current_user.user_id,
        "email": current_user.user_email,
    }


@router.put("/me/email")
def update_email(
    payload: UpdateEmailRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Update authenticated user's email address.
    """
    # Check if email already exists
    existing = db.query(User).filter(User.user_email == payload.email).first()
    if existing and existing.user_id != current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already in use",
        )

    current_user.user_email = payload.email
    db.commit()

    return {"detail": "Email updated successfully"}


@router.put("/me/password")
def update_password(
    payload: UpdatePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Change authenticated user's password.
    Requires current password.
    """
    if not verify_password(
        payload.current_password,
        current_user.user_password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect",
        )

    current_user.user_password_hash = hash_password(payload.new_password)
    db.commit()

    return {"detail": "Password updated successfully"}
