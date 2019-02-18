// 处理text/plain

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // 若传递重复参数，url.parse将解析成一个数组
  console.log('pppp', url.parse(req.url, true).query);  
  let buffers = [];
  req.on('data', (data) => {
    buffers.push(data);
  })
  req.on('end', () => {
    let result = Buffer.concat(buffers); 
    res.end(result);
    console.log('>>>>', result);
  })
})
server.listen(3000, () => {
  console.log('server is listening in port 3000');
})