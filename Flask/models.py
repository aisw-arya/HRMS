from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase,Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import String,Integer,ForeignKey,Float,DateTime
from typing import List
from sqlalchemy.sql import func
from datetime import datetime,timezone

db_uri='postgresql://postgres:1234@localhost:5432/hrms'

class Base(DeclarativeBase):
    pass

db= SQLAlchemy(model_class = Base)


class Hr(db.Model):
    __tablename__ ="hr"
    id :Mapped[int] = mapped_column(primary_key =True)
    user_name :Mapped[str] = mapped_column(String(50))
    password:Mapped[str] = mapped_column(String(200))
    def set_password(self, password): 
        self.password = generate_password_hash(password) 
    
    def check_password(self, password):
         return check_password_hash(self.password, password)


class Designation(db.Model):
    __tablename__ ="designation"
    designation_id :Mapped[int] = mapped_column(primary_key =True)
    designation :Mapped[str] = mapped_column(String(50))
    total_leave :Mapped[int] = mapped_column()
    employee : Mapped[List["Employee"]] = relationship("Employee", back_populates="designation",cascade="all, delete-orphan")
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)

class Employee(db.Model):
    __tablename__ ="employee"
    employee_id :Mapped[int] = mapped_column(primary_key =True)
    employee_name :Mapped[str] = mapped_column(String(200))
    address :Mapped[str] = mapped_column(String(200))
    phone_number :Mapped[int] = mapped_column(String(50))
    email :Mapped[str] = mapped_column(String(200))
    leave_take:Mapped[int] = mapped_column(default = 0)
    image:Mapped[str] = mapped_column(String(255))
    created_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now())
    updated_at:Mapped[DateTime] = mapped_column(DateTime,default=func.now(),onupdate=func.now())
    deleted_at:Mapped[DateTime] = mapped_column(DateTime,nullable=True)

    des_id  : Mapped[int] =mapped_column(ForeignKey("designation.designation_id"))
    designation: Mapped["Designation"] = relationship("Designation", back_populates="employee")


# class Leave(db.Model):
#     __tablename__ ="leave"
#     leave_id :Mapped[int] = mapped_column(primary_key= True)
#     leave_date:Mapped[DateTime] = mapped_column()
   


def init_db(db_uri):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")

def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind = engine)
    session = Session()
    return session