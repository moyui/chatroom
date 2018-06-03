#-*-coding:utf-8-*-
from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import pymysql

Base = declarative_base()

class User(Base):
    __tablename__  = 'user'

    id = Column(String(100), primary_key=True)
    username = Column(String(100))
    password = Column(String(100))
    email = Column(String(100))

engine = create_engine('mysql+pymysql://127.0.0.1:moyui@localhost:3306/test')
DBSession = sessionmaker(bind=engine)