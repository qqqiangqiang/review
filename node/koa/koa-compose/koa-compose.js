const fs = require('fs');
const ctx = { req: {}, res: {} };
const middles = [
  async (ctx, next) => {
    console.log('1');
    await next();
    console.log('4');
  },
  async (ctx, next) => {
    const data = await new Promise((resolve, reject) => {
      fs.readFile('./a.txt', { encoding: 'utf-8' }, (err, data) => {
        resolve(data);
      })
    })
    console.log('2', data);
  },
  async (ctx, next) => {
    console.log('3')
  }
] 

function compose(middles, ctx) {
  var dispath = function(idx) {
    const fn = middles[idx];
    if (!fn || typeof fn != 'function') {
      return Promise.resolve();
    }
    return Promise.resolve(fn(ctx, () => {
      dispath(++idx);
      // 前加加，先加，再用这个变量
      // 后加加，先用这个变量，再加加
    }))
  }  
  return dispath(0);
}

compose(middles, ctx).then(() => {
  console.log('finash');
})