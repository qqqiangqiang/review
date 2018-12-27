const koa = require('./lib/source1.js');
const app = new koa();

// logger
app.use(async (ctx, next) => {
  await next();
  // const rt = ctx.response.get('X-Response-Time');
  console.log('fffffffffffffffffffffffff');
  const rt = ctx.res.getHeader('X-Response-Time');
  // console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>');
  // ctx.set('X-Response-Time', `${ms}ms`);
  ctx.res.setHeader('X-Response-Time', `${ms}ms`);
})

// response
app.use(async (ctx, next) => {
  // ctx.body = 'hello koa';
  ctx.res.end('hello koa');
})

app.listen(3000);