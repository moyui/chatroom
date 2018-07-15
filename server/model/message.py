#-*-coding:utf-8-*-
from sqlalchemy import Column, create_engine, Text, BigInteger, ForeignKey, DateTime, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from setting import DATABASE_ACCOUNT, DATABASE_ADDRESS, DATABASE_BRANCH, DATABASE_PASSWORD, DATABASE_PORT

Base = declarative_base()

class Message(Base):
    __tablename__  = 'message'

    messageid = Column(BigInteger, primary_key=True, unique=True, autoincrement=True)
    userid = Column(String(40))
    content = Column(Text)
    time = Column(DateTime)

engine = create_engine('mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(DATABASE_ACCOUNT, DATABASE_PASSWORD, DATABASE_ADDRESS, DATABASE_PORT, DATABASE_BRANCH),echo=True,max_overflow=5)
DBSession = sessionmaker(bind=engine)