const http = require('http');
const Stream = require('stream');

class Application {
  constructor() {
    this.middles = [];
  }
  use(fn) {
    this.middles.push(fn);
  }
  compose(middles, ctx) {
    const dispath = (idx) => {
      const fn = this.middles[idx];
      if (!fn || typeof fn != 'function') {
        return Promise.resolve();
      }
      return Promise.resolve(fn(ctx, () => {
        dispath(++idx);
      }))
    }
    return dispath(0);
  }
  listen() {
    const server = http.createServer((req, res) => {
      const ctx = {};
      ctx.req = req;
      ctx.res = res;

      this.compose(this.middles, ctx).then(() => {
        let body = ctx.body;
        if (ctx.res.headersSent) {
          res.end();
        } else {
          res.statusCode = 200;
        }
        if (body === undefined) {
          res.statusCode = 404;
        }
        if (body instanceof Stream) {
          return body.pipe(res);
        }

        if (typeof body !== 'string') {
          body = JSON.stringify(body);
        }

        res.end(body || 'not found');
      });
      
    }) 
    server.listen.apply(server, arguments);

  }
}
module.exports = Application;