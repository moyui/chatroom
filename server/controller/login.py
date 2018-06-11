#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import uuid

from model import user
from tornado.escape import json_decode, json_encode
from tornado import gen
from sqlalchemy import and_

session = user.DBSession()

class ConfirmHandler(tornado.web.RequestHandler):
    @gen.coroutine
    def post(self, email, password):
        userInfo = yield session.query(user.User).filter(and_(user.User.email == email, user.User.password==password)).one()
        if (userInfo):
            if (userInfo.auth == False):
                result = {
                    'success': False,
                    'message': '账号未认证',
                    'status': 401
                }
            else:
                result = {
                    'success': False,
                    'message': '登陆成功',
                    'payload': {
                        'username': userInfo.username
                    },
                    'status': 401
                }
            self.write(json_encode(result))
        else:
            result = {
                'success': False,
                'message': '账号不存在或密码错误',
                'status': 404
            }
            self.write(json_encode(result))
