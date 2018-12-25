const http = require('http');
const path = require('path');
const url = require('url');

class Application {
  constructor() {
    this.routes = [];
    this.createMethods();
  }
  createMethods() {
    http.METHODS.forEach((item, index) => {
      this[item.toLocaleLowerCase()] = (path, handler) => {
        const layer = {
          method: item.toLocaleLowerCase(),
          path,
          handler
        }
        if (path.includes(':')) {
          let paramNames = [];
          path = path.replace(/:([^\/]+)/g, function() { 
            paramNames.push(arguments[1]);
            return '([^\/]+)';
          })
          path = new RegExp(path);
          layer.path = path;
          layer.paramNames = paramNames;
        }
        this.routes.push(layer)
      }
    })
  }
  handler(req, res) {
    const { method } = req;
    const { path } = url.parse(req.url);
    const self = this;
    const length = this.routes.length;
    let idx = 0;
    function next() {
      if (idx > length - 1) {
        res.writeHead(404);
        res.end('not found');
        return;
      };
      const route = self.routes[idx++];
      if (route.method == 'middleware' && (route.path == path || path.startsWith(route.path)))  {
        route.handler(req, res, next);
      } else if (route.paramNames && route.paramNames.length > 0 && route.path.test(path)) {
        const matchs = path.match(route.path);
        let params = {};
        route.paramNames.forEach((item, index) => {
          params[item] = matchs[index + 1];
        })
        req.params = params;
        route.handler(req, res, next);

      } else if (route.path == path && route.method == method.toLocaleLowerCase()) {
        route.handler(req, res, next);
      } else {
        next();
      }
    }
    next();
  }
  use(path, handler) {
    this.routes.push({
      method: 'middleware',
      path,
      handler
    })
  }
  listen() {
    const self = this;
    const server = http.createServer(function(req, res) {
      self.handler.apply(self, arguments);
    });
    return server.listen.apply(server, arguments);
  }
}
module.exports = Application;