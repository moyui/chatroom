#-*-coding:utf-8-*-
import logging
import asyncio
import tornado.ioloop
import tornado.web
import tornado.websocket
import json


from model import message
session = message.DBSession()
        
class ChatSocketHandler(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = []
    cache_size = 200

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
        for waiter in cls.waiters:
            try:
                waiter.write_message(chat)
            except:
                logging.error("发送错误", exec_info=True)


    async def on_message(self, message):
        parsed = tornado.escape.json_decode(message)
        chat = {
            "userid": parsed.userid,
            "content": parsed.content,
            "username": parsed.username
        }
        new_message = message.Message(userid=parsed.userid, content=parsed.content)
        session.add(new_message)
        #直接异步掉 
        await session.commit()
        ChatSocketHandler.update_cache(chat)
        ChatSocketHandler.send_updates(chat)
