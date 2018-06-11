#-*-coding:utf-8-*-
import tornado.web
import tornado.websocket
import tornado.ioloop
import uuid
import json

from model import user
from controller.prpcrypt import pc

session = user.DBSession()

class ConfirmHandler(tornado.web.RequestHandler):
    def get(self, userid):
        #解密
        decryptcode = pc.decrypt(userid) 
        
        userInfo = session.query(user.User).filter(user.User.userid == decryptcode).one()
        if (userInfo):
            userInfo.auth = True
            try:
                session.commit()
                result = {
                    'success': True,
                    'message': '认证成功',
                    'status': 201
                }
                self.write(json.dumps(result))
            except Exception:
                session.rollback()
                result = {
                    'success': False,
                    'message': '认证失败',
                    'status': 500
                }
                self.write(json.dumps(result))
            finally:
                session.close()
        else:
            result = {
                'success': False,
                'message': '无此用户',
                'status': 404
            }
            self.write(json.dumps(result))
        session.close()