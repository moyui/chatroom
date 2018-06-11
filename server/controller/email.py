#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import yagmail
import setting
import hashlib

from tornado.escape import json_decode, json_encode
from tornado import gen
from model import user
from controller.prpcrypt import pc

session = user.DBSession()

class EmailHandler(tornado.web.RequestHandler):
    def sendEmail(self, userid):
        yag = yagmail.SMTP(user=setting.EMAIL_FROM, password=setting.EMAIL_HOST_PASSWORD, host=setting.EMAIL_SERVER)
        userInfo = session.query(user.User).filter(user.User.userid == userid).one()
        email = userInfo.email
        #调用加密函数
        encryptcode = pc.encrypt(userid)

        msg = ['''<html>
                    <h3>这是一封来自moyui.site的注册邮件</h3>
                    <p>点击以下链接完成注册</p>
                    <a href="{}/user/{}/confirmation?email={}" target="_blank">确认注册</a>
                    '''.format(setting.SERVER_ADDRESS, encryptcode, email)]

        yag.send(email, '注册确认', msg)