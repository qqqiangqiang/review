const http = require('http');

class Application {
  constructor() {
    this.middles = [];
  }
  use(fn) {
    this.middles.push(fn);
  }
  listen() {
    const server = http.createServer((req, res) => {
      const ctx = { req, res };
      const dispath = (idx) => {
        if (idx >= this.middles.length) {
          res.end('not found')
        }
        const fn = this.middles[idx];
        fn(ctx, () => {
          dispath(++idx);
        })
      }
      dispath(0); 

    });
    server.listen.apply(server, arguments);
  }

}
module.exports = Application;

// 核心思路，但是await后面跟的必须应该是promise，这样才能真正的实现koa的中间件机制