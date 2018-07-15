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
    def sendEmail(self, userid, email):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        yag = yagmail.SMTP(user=setting.EMAIL_FROM, password=setting.EMAIL_HOST_PASSWORD, host=setting.EMAIL_SERVER)
        #调用加密函数
        encryptcode = pc.encrypt(userid)
        msg = ['''<html>
                    <h3>这是一封来自moyui.site的注册邮件</h3>
                    <p>点击以下链接完成注册</p>
                    <a href="{}/apipy/user/{}/confirmation?email={}" target="_blank">确认注册</a>
                    '''.format(setting.SERVER_ADDRESS, encryptcode, email)]
        print(email, encryptcode)
        yag.send(email, '注册确认', msg)