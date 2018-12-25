var e = require('express');
var app = new e();

app.get('/', function(req, res) {
  // console.log(req, 'get /')
  res.end('home')
})

app.get('/user', function(req, res, next) {
  res.end('user');
  next();
  console.log('get /user')
})
app.use('/user', function(req, res) {
  console.log('/user middleware')
})

app.listen(8080, function() {
  console.log('server li listening on port 8080');
});
