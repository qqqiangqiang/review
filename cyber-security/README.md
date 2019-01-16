## XSS
(跨站脚本攻击)
### 防御措施
- 用户输入层面进行保护
- 数据存储层面进行保护
- 数据输出层面进行保护
  - dom节点
  - dom attr 属性

```javascript
function htmlEncode(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
let data = {
    desc: "<script>alert(1);<\/script>",
    clsName: '"><script>alert(2);<\/script>',
    url: '"><script>alert(3);<\/script>',
    id: '"><script>alert(4);<\/script>',
}
$('#intag').html(htmlEncode(data.desc));
$('#tagAttr').html(`<a class = "${htmlEncode(data.clsName)}">标签属性中</a>`);

$('#inEvent').html(`<a href="#" onclick = "go('${data.url}')">事件参数</a>`);
$('#inLink').html(`<a href="http://localhost:3000/articles/${encodeURI(data.id)}">link</a>`);
```
## CSRF
(跨站请求伪造)