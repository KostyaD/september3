import tornado.ioloop
import tornado.web
from tornado_cors import CorsMixin

import redis

ADDRESS = 'localhost'
PORT = 8888

r = redis.StrictRedis(host='localhost', port=6379, db=0)  

class MainHandler(CorsMixin, tornado.web.RequestHandler):
  CORS_ORIGIN = '*'
  
  def get(self):
    c = int(r.get('count') or 0)
    self.write(str(c))
  def post(self):
    c = int(r.get('count') or 0)+1
    r.set('count', c)
    self.write(str(c))

application = tornado.web.Application([
  (r"/db/", MainHandler),
])

if __name__ == "__main__":
  application.listen(PORT, address=ADDRESS)
  tornado.ioloop.IOLoop.instance().start()