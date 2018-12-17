## 路由

### HTML5 History API
#### 相关API
##### pushState
history.pushState(stateObject, title, url)，包括三个参数。
- 第一个参数用于存储该url对应的状态对象，该对象可在onpopstate事件中获取，也可在history对象中获取。
- 第二个参数是标题，目前浏览器并未实现。
- 第三个参数则是设定的url。一般设置为相对路径，如果设置为绝对路径时需要保证同源。

``pushState``函数向浏览器的历史堆栈压入一个url为设定值的记录，并改变历史堆栈的当前指针至栈顶

##### replaceState
该接口与pushState参数相同，含义也相同。唯一的区别在于replaceState是替换浏览器历史堆栈的当前历史记录为设定的url。需要注意的是，replaceState不会改动浏览器历史堆栈的当前指针。

##### onpopstate
该事件是window的属性。该事件会在调用浏览器的前进、后退以及执行history.forward、history.back、和history.go触发，因为这些操作有一个共性，即修改了历史堆栈的当前指针。在不改变document的前提下，一旦当前指针改变则会触发onpopstate事件。

---

#### 两种前端路由实现方案

##### hash模式
这里的 hash 就是指 url 尾巴后的 # 号以及后面的字符。这里的 # 和 css 里的 # 是一个意思。hash 也 称作 锚点，本身是用来做页面定位的，她可以使对应 id 的元素显示在可视区域内。

由于 hash 值变化不会导致浏览器向服务器发出请求，而且 hash 改变会触发 hashchange 事件，浏览器的进后退也能对其进行控制，所以人们在 html5 的 history 出现前，基本都是使用 hash 来实现前端路由的。

使用到的api：

```javascript
window.location.hash = 'qq' // 设置 url 的 hash，会在当前url后加上 '#qq'

var hash = window.location.hash // '#qq'  

window.addEventListener('hashchange', function(){ 
    // 监听hash变化，点击浏览器的前进后退会触发
})
```
##### history模式

已经有 hash 模式了，而且 hash 能兼容到IE8， history 只能兼容到 IE10，为什么还要搞个 history 呢？
首先，hash 本来是拿来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了。其次，hash 的传参是基于 url 的，如果要传递复杂的数据，会有体积的限制，而 history 模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
最重要的一点：
> 如果不想要很丑的 hash，我们可以用路由的 history 模式
  —— 引用自 vueRouter文档

相关API：
```javascript
window.history.pushState(state, title, url) 
// state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
// title：标题，基本没用，一般传 null
// url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是一樣的，否则会抛出错误。url可以是绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state, title, url)
// 与 pushState 基本相同，但她是修改当前历史记录，而 pushState 是创建新的历史记录

window.addEventListener("popstate", function() {
    // 监听浏览器前进后退事件，pushState 与 replaceState 方法不会触发              
});

window.history.back() // 后退
window.history.forward() // 前进
window.history.go(1) // 前进一步，-2为后退两步，window.history.lengthk可以查看当前历史堆栈中页面的数量
```
history 模式改变 url 的方式会导致浏览器向服务器发送请求，这不是我们想看到的，我们需要在服务器端做处理：如果匹配不到任何静态资源，则应该始终返回同一个 html 页面。

---

#### simple-vue-router实例
进入 ``simple-vue-router/router``目录
启动方式
- ``yarn``
- ``npm run build``
