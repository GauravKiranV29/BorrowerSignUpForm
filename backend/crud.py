from sqlalchemy.orm import Session
from models import Borrower
from schemas import BorrowerCreate

def create_borrower(db: Session, borrower: BorrowerCreate):
    db_borrower = Borrower(**borrower.dict())
    db.add(db_borrower)
    db.commit()
    db.refresh(db_borrower)
    return db_borrower
