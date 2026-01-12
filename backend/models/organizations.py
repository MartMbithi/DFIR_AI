
from sqlalchemy import Column, String, DateTime
from backend.db.session import Base
import datetime

class Organization(Base):
    __tablename__ = "organizations"

    organization_id = Column(String(36), primary_key=True)
    organization_name = Column(String(150), nullable=False)
    organization_created_at = Column(DateTime, default=datetime.datetime.utcnow)
