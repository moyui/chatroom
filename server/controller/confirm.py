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
                result = 'register successed'
                self.write(json.dumps(result))
            except Exception:
                session.rollback()
                result = 'register failed'
                self.write(json.dumps(result))
            finally:
                session.close()
        else:
            result = 'no person'
            self.write(json.dumps(result))
        session.close()