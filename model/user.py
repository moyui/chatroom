#-*-coding:utf-8-*-
from sqlalchemy import Column, String, create_engine, Boolean
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__  = 'user'

    userid = Column(String(255), primary_key=True, unique=True)
    username = Column(String(255), unique=True)
    password = Column(String(255))
    email = Column(String(255))
    auth = Column(Boolean)

engine = create_engine('mysql+pymysql://root:gao123456@localhost:3306/test',echo=True)
DBSession = sessionmaker(bind=engine)