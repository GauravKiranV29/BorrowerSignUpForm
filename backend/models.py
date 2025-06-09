from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Borrower(Base):
    __tablename__ = "borrowers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    residence_type = Column(String)
    monthly_income = Column(Integer)
    previous_loan = Column(Boolean)
    marital_status = Column(String)
    number_of_dependents = Column(Integer)
    city = Column(String)
    state = Column(String)
