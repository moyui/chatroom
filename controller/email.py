#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import yagmail
import setting
import hashlib

from email.mime.text import MIMEText
from email.header import Header
from tornado import gen
from model import user

yag = yagmail.SMTP()
session = user.DBSession()

class EmailHandler(tornado.web.RequestHandler):

    def sendEmail(self, email):
        userInfo = yield session.query(user.User).filter(user.User.email == email).one()
        userid = userInfo.userid
        #调用加密函数
        hash_md5 = self.createMd5(userid)

        msg = MIMEText('''<html>
                            <h3>这是一封来自moyui.site的注册邮件</h3>
                            <p>点击以下链接完成注册</p>
                            <a href="http://{}/">''')

    def createMd5(self, userid):
        hash_md5 = hashlib.md5(userid)
        return hash_md5