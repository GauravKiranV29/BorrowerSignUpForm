from pydantic import BaseModel

class BorrowerCreate(BaseModel):
    name: str
    email: str
    phone: str
    residence_type: str
    monthly_income: int
    previous_loan: bool
    marital_status: str
    number_of_dependents: int
    city: str
    state: str
