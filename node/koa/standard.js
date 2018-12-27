const koa = require('koa');
const app = new koa();

// logger
app.use(async (ctx, next) => {
  const result = await next();
  console.log('>>>result', result);
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  return `>>>>ffffff`;
})

// response
app.use(async (ctx, next) => {
  ctx.body = 'hello koa';
})

app.listen(3000);