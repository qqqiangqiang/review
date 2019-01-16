/**
 * process.env.DEBUG
 * 'static:app' 打印app模块的日志
 * 'static:config' 打印config模块的日志
 * 'static:*' 打印所有模块的日志
 */
// mac下命令行设置环境变量的方法 export DEBUG = static:*
process.env.DEBUG = 'static:app'
let config = require('./config');
let http = require('http');
let chalk = require('chalk'); // 控制日志输出颜色
let path = require('path');
let debug = require('debug')('static:app'); // 在控制台输出的模块
// 每个debug实例都有一个名字，名称由两部分组成，第一部分一般是项目名，第二部分是模块名
// 是否在控制台打印取决于环境变量中DEBUG的值是否等于'static:app'
class Server {
  constructor() {
  }
  start() {
    let server = http.createServer();
    server.on('request', this.request.bind(this));
    server.listen(config.port, () => {
      let url = `http://${config.host}:${config.port}`;
      debug(`server started at ${chalk.green(url)}`);
    })
  }
  async request(req, res) {
    const { path } = url.parse(req.url);
  }
}
let server = new Server();
server.start();