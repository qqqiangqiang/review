const http = require('http');
const fs = require('fs');
const path = require('path');

const render = (filepath, options, callback) => {
  fs.readFile(filepath, 'utf8', (err, content) => {
    let head = "let tpl = ``;\n with(obj) { tpl += `";
    content = content.replace(/<%=([\s\S]+?)%>/g, (match1, match2) => {
      return "${" + match2 + "}";
    })
    content = content.replace(/<%([\s\S]+?)%>/g, (match1, match2) => {
      return "`;\n" + match2 + " tpl += `";
    })
    let tail = "`\n}\nreturn tpl;";
    let html = head + content + tail;
    console.log(html);
    html = new Function('obj',html);
    html = html(options);
    callback(html);
  })
}

const server = http.createServer((req, res) => {
  render(path.resolve(__dirname, './tpl.html'), {title:'hello',user:{name:'dzq'}}, (html) => {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.end(html);
  })
})
 
server.listen(8001);