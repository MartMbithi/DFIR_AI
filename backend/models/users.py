
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from backend.db.session import Base
import datetime

class User(Base):
    __tablename__ = "users"

    user_id = Column(String(36), primary_key=True)
    organization_id = Column(String(36), ForeignKey("organizations.organization_id"))
    user_email = Column(String(150), unique=True, nullable=False)
    user_password_hash = Column(String(255), nullable=False)
    user_role = Column(Enum("admin","analyst","viewer"))
    user_created_at = Column(DateTime, default=datetime.datetime.utcnow)
