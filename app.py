#-*-coding:utf-8-*-
import tornado.ioloop
import tornado.web
import tornado.websocket

from router import router

application = tornado.web.Application(router.route.urls)

if __name__ == "__main__":
    application.listen(8888)
    print("http://localhost:%s/" % 8888)
    tornado.ioloop.IOLoop.instance().start()