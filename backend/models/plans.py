
from sqlalchemy import Column, String, Integer, Boolean, Numeric
from backend.db.session import Base

class Plan(Base):
    __tablename__ = "plans"

    plan_id = Column(String(36), primary_key=True)
    plan_name = Column(String(50), nullable=False)
    plan_max_cases = Column(Integer, nullable=False)
    plan_max_artifacts = Column(Integer, nullable=False)
    plan_llm_enabled = Column(Boolean, nullable=False)
    plan_price = Column(Numeric(10,2), nullable=False)
