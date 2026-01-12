
from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from backend.db.session import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    subscription_id = Column(String(36), primary_key=True)
    organization_id = Column(String(36), ForeignKey("organizations.organization_id"))
    plan_id = Column(String(36), ForeignKey("plans.plan_id"))
    subscription_status = Column(Enum("active","expired","cancelled"))
    subscription_started_at = Column(DateTime)
    subscription_expires_at = Column(DateTime)
