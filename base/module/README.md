##模块化
模块化是指把一个复杂的系统分解到多个模块以方便编码

###命名空间
开发网页要通过命名空间的方式来组织代码
例如jquery便是将所有相关属性方法，都挂载到了``window.jquery``这对象上，但这样同时也避免不了一下这几个问题：
- 命名空间冲突，两个库可能会使用同一个名称
- 无法合理的管理项目的依赖和版本
- 无法方便的控制依赖的执行顺序

### commonjs规范
commonjs是一种使用广泛的javascript模块化规范，核心思想是通过require方法来同步的加载依赖的其他模块，通过module.exports导出需要暴露的接口
#### 用法
```javascript
// 导入
const someFun = require('./moduleA');
someFun()
// 导出
module.exports = someFun;
```
#### 原理
##### node
nodejs是commomjs规范的实现
- nodejs的模块机制通过node源码中的module.js实现，该模块在启动时就已经被加载
- 当我们在执行``app.js``的时候，进程会直接打到module.js中的runMain静态方法
- 最终经过层层包装，调用我们的app.js文件代码被包装成如下所示
```javascript
(function (exports, require, module, __filename, __dirname) {
    var circle = require('./circle.js');
    console.log('The area of a circle of radius 4 is ' + circle.area(4));
});
```
流程总结如下 : 启动 - > 调用module.js中的runMain方法 -> 读取主文件内容&编译 -> 将Module对象等作为实参传入包装好的执行函数 -> 执行主文件中的代码
#### webpack
与node类似，webpack模块化管理也遵循commonjs规范
我们可以通过一段编译后的简化代码，来看一下他是怎么实现的
```javascript
 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

  // 这是在浏览器端模拟的node的require方法，基于commomjs规范
 	function __webpack_require__(moduleId) {

 		// 检查模块是否在缓存中
 		if(installedModules[moduleId]) {
      //  如果已经加载过了，则直接返回缓存中的模块对象的exports对象
 			return installedModules[moduleId].exports;
 		}
    //  创建一个新的模块对象并且放置到缓存中
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		//  第一个参数是this是模块的默认导出对象，模块本身，导出对象，模拟的reuiqre方法
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/test/test.js");
 })
 ({
   "./src/test/msg.js":
  (function(module, exports) {
    eval("/**\n * Commomjs规范\n */\nexports.name = 'userinfo';\nexports.age = 29;\n\n//# sourceURL=webpack:///./src/test/msg.js?");}),
  "./src/test/test.js":
  (function(module, exports, __webpack_require__) {  
    eval("/**\n * Commonjs规范\n */\nconst { name, age } = __webpack_require__(/*! ./msg.js */ \"./src/test/msg.js\");\nconsole.log(name, age);\n\n//# sourceURL=webpack:///./src/test/test.js?");
  })
 });
```
如上代码所示，是一个简化版的bundle.js，经过webpack的编辑，我们所依赖的模块会以``{ key: val }``的形式给引入进来，同时在webpack内部也实现了一个require方法，主要是将所有的``exports``通过key的形式缓存在全局对象中，同时将module、module.exports、require当做实参传入我们每个模块所构成的函数作用域。

---

### AMD规范
AMD规范也是一种js模块化规范，他与commomjs最大的不同在于它采用异步的方式去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是``require.js``

AMD的优点
- 可以在不转换代码的情况下直接在浏览器中运行
- 可加载多个依赖
- 代码可运行在浏览器环境和node.js环境下

AMD的缺点
- js环境没有原生支持AMD，需要先导入实现了的AMD库后才能使用

#### 用法
```javascript
// 定义一个模块
define('a', [], function() {
  return 'a'
})
define('b', ['a'], function(a) {
  return a + 'b';
})
// 导入和使用
require(['b'], function(b) {
  console.log(b);
})
```
#### 原理
```javascript
let factories = {};
// define的作用：1、将该模块以模块名的实形式挂载到全局对象上 2、将该模块的依赖挂载到函数对象
function define(modName, dependencies, factory) {
    factory.dependencies = dependencies;
    factories[modName] = factory;
}
// 1、遍历需要引入的模块名数组，通过全局对象找到该模块名对应的函数对象
// 2、找到该模块所依赖的其他模块，递归调用最终得到模块的返回值，
// 3、执行回调函数
function require(modNames, callback) {
    let loadedModNames = modNames.map(function (modName) {
        let factory = factories[modName];
        let dependencies = factory.dependencies;
        let exports;
        require(dependencies, function (...dependencyMods) {
            exports = factory.apply(null, dependencyMods);
        });
        return exports;
    })
    callback.apply(null, loadedModNames);
}
```

---

