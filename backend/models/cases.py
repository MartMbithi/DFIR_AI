
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from backend.db.session import Base
import datetime

class Case(Base):
    __tablename__ = "cases"

    case_id = Column(String(100), primary_key=True)
    organization_id = Column(String(36), ForeignKey("organizations.organization_id"))
    user_id = Column(String(36), ForeignKey("users.user_id"))
    case_name = Column(String(150), nullable=False)
    case_status = Column(Enum("created","processing","completed","failed"))
    case_created_at = Column(DateTime, default=datetime.datetime.utcnow)
