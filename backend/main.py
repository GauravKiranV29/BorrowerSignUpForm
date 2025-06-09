from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from models import Base
from schemas import BorrowerCreate
from crud import create_borrower
from database import engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/borrowers")
def create_borrower_api(borrower: BorrowerCreate, db: Session = Depends(get_db)):
    return create_borrower(db, borrower)
