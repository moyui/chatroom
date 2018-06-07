#-*-coding:utf-8-*-
import asyncio
import tornado.ioloop
import tornado.web
import tornado.websocket
import json

class MessageBuffer(object):
    def __init__(self):
        self.cond = tornado.locks.Condition()
        self.cache = []
        self.cache_size = 200
        
# class ChatRoomHandler(tornado.web.RequestHandler):
#     def post(self):
