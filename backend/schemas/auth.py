from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    user_id: str
    user_email: EmailStr
    organization_id: str | None
    user_role: str

    class Config:
        from_attributes = True
