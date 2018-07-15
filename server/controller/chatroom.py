#-*-coding:utf-8-*-
import logging
import asyncio
import tornado.ioloop
import tornado.web
import tornado.websocket
import time
import json

from controller.prpcrypt import pc
from datetime import datetime
from model import message
session = message.DBSession()
        
class ChatSocketHandler(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = []
    cache_size = 200

    def check_origin(self, origin):
        return True

    def open(self):
        ChatSocketHandler.waiters.add(self)
    
    def on_close(self):
        ChatSocketHandler.waiters.remove(self)
    
    @classmethod
    def update_cache(cls, chat):
        cls.cache.append(chat)
        if len(cls.cache) > cls.cache_size:
            cls.cache = cls.cache[-cls.cache_size:]

    @classmethod
    def send_updates(cls, chat):
        print(chat)
        for waiter in cls.waiters:
            try:
                waiter.write_message(json.dumps(chat))
            except:
                logging.error("发送错误", exec_info=True)


    def on_message(self, payload):
        parsed = tornado.escape.json_decode(payload)
        inputtime = datetime.now()
        #解密
        userid = pc.decrypt(parsed['token'])

        new_message = message.Message(userid=userid, content=parsed['content'], time=inputtime)
        session.add(new_message)
        session.commit()

        #这查询太耗时间了,有待重构
        this_message = session.query(message.Message).filter(message.Message.userid == userid).order_by(message.Message.messageid.desc()).first()
        parsedtime = inputtime.strftime('%Y-%m-%d %H:%M:%S')
        print(parsedtime)
        if (this_message):
            chat = {
                "messageid": this_message.messageid,
                "content": parsed['content'],
                "username": parsed['userName'],
                "time": parsedtime
            }

            ChatSocketHandler.update_cache(chat)
            ChatSocketHandler.send_updates(chat)            
