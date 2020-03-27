## 零散知识点

### Object.assgin深拷贝还是浅拷贝
第一级属于深拷贝，以后级别浅拷贝

```javascript
// 第一级别深拷贝
let me = { data: { name: 'dzq', age: 29 }}
let me_fuben = Object.assign({}, me);
me_fuben.data = { data: { sex: 'nan' } }
console.log(me_fuben, me)

// 以后级别浅拷贝
let me1 = { data: { name: 'dzq', age: 29 }}
let me1_fuben = Object.assign({}, me1);
me1_fuben.data.name = 'lxx';
console.log(me1_fuben, me1)
```
### 阿里巴巴面试相关
#### em
相对的计算必然会一个参考物，那么这里相对所指的是相对于元素父元素的font-size。比如说：如果在一个<div>设置字体大小为“16px”，此时这个<div>的后代元素教程了是将继承他的字体大小，除非重新在其后代元素中进行过显示的设置。

#### set
一个Set是一堆东西的集合,Set有点像数组,不过跟数组不一样的是，Set里面不能有重复的内容
```javascript
var books = new Set();
books.add('js');
books.add('js');//添加重复元素集合的元素个数不会改变
books.add('html');
books.forEach(function(book){//循环集合
    console.log(book);
})
console.log(books.size);//集合中元数的个数
console.log(books.has('js'));//判断集合中是否有此元素
books.delete('js');//从集合中删除此元素
console.log(books.size);
console.log(books.has('js'));
books.clear();//清空 set
console.log(books.size);
```

### 今日头条
```javascript
// 实现一个render('a+b=${name}')({ name: 'dzq' })
function render(str) {
  return function(data) {
    str = str.replace(/\$\{(\w+)\}/g, (match1, match2) => {
      return data[match2]
    })
    return str;
  }
}
// 实现一个body-parser

```

### 瓜子二手车
#### 解析url的query参数
```javascript
// 正则
let str = 'https://lfq.qufenqi.com/v2/home?name=dzq&age=39';
function query(str) {
  let params = {};
  str.replace(/(\w+)=(\w+)/g, (match, match1, macht2) => {
    params[match1] = macht2;
  })
  return params;
}
```

### 小米
#### https详细过程
https://baijiahao.baidu.com/s?id=1570143475599137&wfr=spider&for=pc&isFailFlag=1

#### 链表

### 猿辅导
#### 标准dom事件的捕获和冒泡过程
1、一个完整的事件流是从window开始，最后回到window的一个过程
2、事件流被分为三个阶段，捕获过程，目标过程，冒泡过程

捕获过程
window -> document -> documentElement -> body -> div -> currentDiv 
                                                            |       目标过程
window <- document <- documentElement <- body <- div <-  currentDiv
冒泡过程

过程：
- 捕获阶段：首先window会获捕获到事件，之后document、documentElement、body会捕获到，再之后就是在body中DOM元素一层一层的捕获到事件，有wrapDiv、innerP。
- 目标阶段：真正点击的元素textSpan的事件发生了两次，因为在上面的JavaScript代码中，textSapn既在捕获阶段绑定了事件，又在冒泡阶段绑定了事件，所以发生了两次。但是这里有一点是需要注意，``在目标阶段并不一定先发生在捕获阶段所绑定的事件，而是先绑定的事件发生``，一会会解释一下。
- 冒泡阶段：会和捕获阶段相反的步骤将事件一步一步的冒泡到window
#### 杂七杂八
1、span标签设置纵向的padding/margin不会生效
2、position：absolute/fixed，因为脱离文档流，所以改变top的时候不会引起回流。
3、requestAnimationFrame的优点
- setTimeoute和setInterval的问题是，他们都不精确，他们的内在运行机制决定了时间间隔参数实际上这是指定了动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。
- requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
- 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
- requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销 

### 58同城
1、class里定义在contructor和constructor外的区别
```javascript
// es6 class用法
class A {
  constructor() {
    this.name = 'dzq';
    var age = 29;
  }
  show() {
    console.log('>>', this.name);
  }
}

// es5 function用法
function A() {
  this.name = 'dzq';
  var age = 29
}
A.prototype.show = function() {
  console.log(this.name)
}
```
2、new Set是否能去重引用类型(可以去重)
```javascript
var obj = { name: 'dzq', age: { real: 29, noReal: 28 } };
var obj2 = obj1;
new Set([obj, obj2])
```
3、new 一个object的完整过程
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var p = new Person('dzq', 29);

// 1、创建一个空对象
var obj = new Object();
// 2、让person中的this指向obj，并执行函数体
var result = Person.call(obj, 'dzq', 29);
// 3、设置原型链，将obj的__proto__成员指向了Person函数对象的prototype成员对象
obj.__proto__ = Person.prototype;
// 4、判断Person的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。
if (typeof(result) == "object")
  p = result;
else
  p = obj;
```
4、实现两行省略号
```javascript
text-overflow: ellipsis
overflow:hidden; 
line-clamp:2; 
```
5、flex实现九宫格
- 设置折行属性：flex-wrap: wrap
- 设置默认不缩放：flex-shrink: 0;
6、body-parser

#### 蚂蚁金服
##### vue相关
1、为什么要用vnode,
2、动态组件
3、动态指令
4、computed跟method的区别
5、keep-alive的作用
6、filter属性的用户
7、点击其他区域，隐藏菜单，element-ui的 v-click ??? 来着，忘了

##### 性能优化
1、批量替换图片url，如何用更优雅的方法实现一个图片的替换过程

##### webpack相关
1、treeshaking的用法

