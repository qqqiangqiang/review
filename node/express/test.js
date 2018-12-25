var e = require('./source.js');
var app = new e();

app.get('/', function(req, res) {
  res.end('hello /')
})

app.get('/user', function(req, res, next) {
  res.end('hello /user')
  next();
})

app.get('/user/:id/:name', function(req, res, next) {
  res.end(`params>>>${req.params.id}${req.params.name}`);
})

app.use('/user', function(req, res) {
  console.log('user处理中间件');
})

app.listen(8081);
