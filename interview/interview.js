/**
 * 1.实现一个call函数
 * @param {Object} context 
 * @param {Array} args 
 */
Function.prototype.dzq_call = function(context, args){
  context.fn = this;
  context.fn(...args);
  delete context.fn;
}
// test
const a = (name, age) => {
  console.log(this);
  console.log(name, age);
}
a.dzq_call({ data: 'dzq' }, ['dzq', 20]);


/**
 * 2.隐式转换
 * 字符串和数字相加结果是string
 * 字符串和数字相减 / 字符串和字符串相减 是number
 */
var test1 = '20' + 5 - '4';
var test2 = '20' + 5 + '4';
console.log(typeof test1, typeof test2);


/**
 * 3.
 * 函数声明提升
 * 基本类型复制后俩个变量完全独立，之后任何一方改变都不会影响另一方；引用类型复制的是引用（即指针），之后的任何一方改变都会映射到另一方。
 */
let x = 1,
  y = z = 0
function add(n) {
  return n = n + 1
}
y = add(x)
function add(n) {
  return n = n + 3
}
z = add(x)
console.log(x + ' ' + y + ' ' + z)

/**
 * 4.引用类型指向问题
 * 点（.）运算符优先级、赋值运算符（=）执行顺序
 */
// test1
let a = { n: 1 }
let b = a; // 现在a和b指向的都是同一个引用地址，若a的属性n改变则b跟着改变
a = { n: 2 }; // 重新开辟了一段内存空间改变了a的指向，a和b指向不再相同
console.log(a === b) // false;
// test2
let a1 = { n: 1 };
let b1 = a1;
a1.x = a1 = { n: 2 };
console.log(a1.x, b1.x) // undefined { n: 2 }
// 由于dian运算符优先级最高，因此a1.x指向的实际是 { n: 1 }这个引用地址的x， 由于b1的引用地址是 { n: 1 }，因此a1.x是undefined，b1.x是 { n: 2}

/**
 * 5.箭头函数的this
 * 考察点：
 * 一、箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。 正是因为它没有this，从而避免了this指向的问题。
 * 二、箭头函数的this是定死的，指向外层的this
 * 三、若存在赋值语句，类似于 var a = obj1.fun 则返回被赋予的值，将使用默认的this绑定规则
 */
var a = 1
var obj2 = {
  a: 3,
  foo
}
var obj1 = {
  a: 2,
  obj2
}
function foo () {
  return (a) => {
    console.log(this.a)
  }
}
(obj1.foo = obj2.foo)()() // 赋值运算符返回值为被赋予的值，本例即函数 foo
foo.call(obj1)()
obj1.obj2.foo()()

/**
 * 6. 看输出，考察使用未声明的变量，正常使用未声明的变量会报错，但用typeof(未声明的变量)则只会返回undefined
 */
(function  () {
  var a
  var b = null
  console.log(a)
  console.log(b)
  // console.log(typeof c)
  console.log(c)
  console.log(NaN == NaN)
})()

/**
 * 7. 已知有字符串 'get-element-by-id'，写一个 function 将其转化成大驼峰表示法'GetElementById'，考察字符串 replace 方法
 */
function camel(str) {
  return str.replace(/(^\w)|-(\w){1}/g, (str, match1, match2) => {
    if (match1) return match1.toUpperCase()
    return match2.toUpperCase()
  })
}

/**
 * 8、constructor
 * 一、Object / Array / Number / String 的
 * __proto__ 都为 Function.prototype (String.__proto__ === Function.prototype)，因此他们的构造函数都为Function
 * (String.constructor将沿着String.__proto__往上寻找，String.Constructor === Funcion.prototype.coustructor)
 * (String.constructor === Function)
 * 
 * 二、Object / Array / Number / String 的
 * prototype 挂载各数据类型的原型链方法，其__proto__指向Object.prototype (String.prototype.__proto__ === Object.prototype)
 * 各构造函数的prototype的constructor与自身完全等价 (String.ptototype.constructor === String)代表由其构造出来的对象的构造函数
 */
function Person() {}
Person.prototype = {}
var p1 = new Person()
console.log(Object.getPrototypeOf(p1).constructor == Object) // true


/**
 * 9. Node Event Loop
 * https://cnodejs.org/topic/57d68794cb6f605d360105bf
 * 
（1）V8引擎解析JavaScript脚本。
（2）解析后的代码，调用Node API。
（3）libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
（4）V8引擎再将结果返回给用户。

  当Node.js启动时会初始化event loop, 每一个event loop都会包含按如下顺序六个循环阶段，

   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
- timers 阶段: 这个阶段执行setTimeout(callback) and setInterval(callback)预定的callback;
- I/O callbacks 阶段: 执行除了 close事件的callbacks、被timers(定时器，setTimeout、setInterval等)设定的callbacks、setImmediate()设定的callbacks之外的callbacks;
- idle, prepare 阶段: 仅node内部使用;
- poll 阶段: 获取新的I/O事件, 适当的条件下node将阻塞在这里;
- check 阶段: 执行setImmediate() 设定的callbacks;
- close callbacks 阶段: 比如socket.on(‘close’, callback)的callback会在这个阶段执行.

ps：process.nextTick()不在event loop的任何阶段执行，而是在各个阶段切换的中间执行,即从一个阶段切换到下个阶段前执行。
 */

setTimeout(() => {
  console.log('setTimeout')
}, 0)
setImmediate(() => {
  console.log('setImmediate')
})
// 有时候，setTimeoute先输出，有时候，setImmediate先输出

/**
 * 解释：在node中 setTimeout(cd, 0) === setTimeout(cb, 1)
 * 由于 Node 启动 loop 前都会有一些初始化操作，并且 Node 中 setTimeout 是精确到 1ms 级别的，所以 setTimeout(cb, 0) === setTimeout(cb, 1)。所以，根据如上两种原因，有以下两种情况：
 * 
 *   1. 由于第一次 loop 前的准备耗时超过 1ms，当前的 loop->time >=1 ，则uv_run_timer生效，timeout先执行
 *   2. 由于第一次 loop 前的准备耗时小于 1ms，当前的 loop->time = 0，则本次 loop 中的第一次uv_run_timer不生效，那么io_poll后先执行uv_run_check，即immediate先执行，然后等close cb执行完后，继续执行uv_run_timer
*/


/**
 * 10. 看输出，考察async && await 深入理解
 *
 * 解析：
 *   1. 先执行 b ，走到 await 时会暂停，返回一个立即 resolve 的 Promise，结果为 10，但由于 Promise 是异步的，先交出控制权
 *   2. 走到 a++，以及最下方的 console
 *   3. 再回到 b 函数中，由于之前保存了堆栈中的变量 a ，所以此时 a 还是 0，因此计算后 a 是 10
 *   4. 第二次计算同理
 */
/*var a = 0
var b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
  a = (await 10) + a
  console.log('3', a) // -> '3' 20
}
b()
a++
console.log('1', a) // -> '1' 1*/


/**
 * 11. 看输出，[] == ![]，说出该表达式计算的详细步骤
 *
 * 解析：
 *   1. 先进行逻辑运算，即（![]），将 [] 转成 true，然后取反变成 false
 *   2. 再根据 == 关系运算符，将 false 转换成Number类型，即 0
 *   3. 再将左侧 [] 类型也转换为 0 ，最后 0 === 0
 */
// console.log([] == ![])


/**
 * 12.数组去重
 */
var arr = [1,2,3,4,1,2]
var arrFilter = arr.filter((item, index) => { return arr.indexOf(item) === index })
var arrFilter2 = [...new Set(arr)]
var arrFilter3 = (() => { 
  var obj = {}; 
  var arrFinal = [];
  arr.forEach((item, index) => {
    if (!obj[item]) {
      obj[item] = item;
      arrFinal.push(item);
    } 
  })
  return arrFinal;
})()


/**
 * 13.数组扁平化
 */
var _arr_need_change = [[1,2], [3,4], [[5,6]]];
// 展开二维数组，最简单的实现方案
var final = [].concat(..._arr_need_change)
// 递归
var arrFinal = (() => {
  var _arr_final = [];
  var operate = (arr) => {
    arr.forEach((item, index) => {
      if (Array.isArray(item)) {
        operate(item);
      } else {
        _arr_final.push(item);
      }
    })
  }
  operate(_arr_need_change);
  return _arr_final;
})()
// reduce
var operate = (arr) => {
  return arr.reduce((acc, cur, idx, src) => {
    return acc.concat(Array.isArray(cur) ? operate(cur) : cur);
  }, [])
}
// 展开运算符
function flattenExpand(arr) {
  let res = arr
  while (res.some(ele => Array.isArray(ele))) {
    res = [].concat(...res)
  }
  return res
}
// 利用 JSON.stringify、JSON.parse 及字符串方法，将[]号去掉，从而实现扁平化
function flattenStr(arr) {
  const str = JSON.stringify(arr).replace(/\[|\]/g, '')
  return JSON.parse(`[${str}]`)
}


