#-*-coding:utf-8-*-
from sqlalchemy import Column, String, create_engine, Boolean
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from setting import DATABASE_ACCOUNT, DATABASE_ADDRESS, DATABASE_BRANCH, DATABASE_PASSWORD, DATABASE_PORT

Base = declarative_base()

class User(Base):
    __tablename__  = 'user'

    userid = Column(String(40), primary_key=True, unique=True)
    username = Column(String(40), unique=True)
    password = Column(String(40))
    email = Column(String(40), unique=True)
    auth = Column(Boolean)

engine = create_engine('mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(DATABASE_ACCOUNT, DATABASE_PASSWORD, DATABASE_ADDRESS, DATABASE_PORT, DATABASE_BRANCH),echo=True,max_overflow=5)
DBSession = sessionmaker(bind=engine)