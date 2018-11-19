## 模块化
模块化是指把一个复杂的系统分解到多个模块以方便编码

### 1、命名空间
开发网页要通过命名空间的方式来组织代码
例如jquery便是将所有相关属性方法，都挂载到了``window.jquery``这对象上，但这样同时也避免不了一下这几个问题：
- 命名空间冲突，两个库可能会使用同一个名称
- 无法合理的管理项目的依赖和版本
- 无法方便的控制依赖的执行顺序

---

### 2、commonjs规范
commonjs是一种使用广泛的javascript模块化规范，核心思想是通过require方法来同步的加载依赖的其他模块，通过module.exports导出需要暴露的接口
#### 2.1用法
```javascript
// 导入
const someFun = require('./moduleA');
someFun()
// 导出
module.exports = someFun;
```
#### 2.2原理
##### 2.2.1node
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
#### 2.2.2webpack
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

### 3、AMD规范
AMD规范也是一种js模块化规范，他与commomjs最大的不同在于它采用异步的方式去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是``require.js``

AMD的优点
- 可以在不转换代码的情况下直接在浏览器中运行
- 可加载多个依赖
- 代码可运行在浏览器环境和node.js环境下

AMD的缺点
- js环境没有原生支持AMD，需要先导入实现了的AMD库后才能使用

#### 3.1用法
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
#### 3.2原理
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

### 4、ES6模块化
es6模块化是ECMA提出的javascript模块化规范，他在语言的层面上实现了模块化。浏览器厂商和nodejs都宣布要原生支持该规范，它将逐渐取代Commomjs和AMD规范，成为浏览器和服务器通用的模块解决方案。
ES6模块虽然是终极模块化方案，但它的缺点在于目前无法直接运行在大部分 JavaScript 运行环境下，必须通过工具转换成标准的 ES5 后才能正常运行。
#### 4.1用法
```javascript
// 导入
import { name } from './person.js';
// 导出
export const name = 'dzq';
```
#### 4.2实现原理
我们以webpack编译后的代码为例（简化版）：
```javascript
(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/test/test.js");
})
({
  "./src/test/msg.js":
 (function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__); __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });__webpack_require__.d(__webpack_exports__, \"age\", function() { return age; });");
  }),
  "./src/test/test.js":
  (function(module, __webpack_exports__, __webpack_require__) { 
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);var _msg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(\"./src/test/msg.js\");(_msg_js__WEBPACK_IMPORTED_MODULE_0__[\"name\"], _msg_js__WEBPACK_IMPORTED_MODULE_0__[\"age\"]);");
  })    
});
```
可以看出，与commonjs规范相比，es6模块针对于每一个exports对象中的非property属性绑定了一个查找时调用的函数。

因此，可以得出commonjs模块与ES6模块的差异
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 - CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。 
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 - ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块（只要该模块下的值变了，其他模块里面该模块的引用值也会随之变化）。

---

### import()
#### 简介 
> <a href="http://es6.ruanyifeng.com/#docs/module">具体可参考</a>
```javascript
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```
上面代码中，引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以import语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，import和export命令只能在模块的顶层，不能在代码块之中（比如，在if代码块之中，或在函数之中）。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果import命令要取代 Node 的require方法，这就形成了一个障碍。因为require是运行时加载模块，import命令无法取代require的动态加载功能。

```javascript
const path = './' + fileName;
const myModual = require(path);
```
上面的语句就是动态加载，``require``到底加载哪一个模块，只有运行时才知道。``import``命令做不到这一点。

因此，有一个提案，建议引入import()函数，完成动态加载。

### 动态加载实现原理
import实现动态加载主要是使用了``jsonp``
具体可参考webpack中是如何实现动态加载的，针对于需要动态加载的文件会单独打包抽离，通过动态创建``<script>``标签的方式，获取相应资源并执行。

```javascript
// 0.js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

    /***/ "./src/video.js":
    /*!**********************!*\
      !*** ./src/video.js ***!
      \**********************/
    /*! exports provided: getName */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getName\", function() { return getName; });\nfunction getName() {\n    return 'dzq';\n}\n\n//# sourceURL=webpack:///./src/video.js?");
    
    /***/ })
    
    }]);
// main.js
 (function(modules) { // webpackBootstrap
     // install a JSONP callback for chunk loading
    //  安装一个jsonp的函数，为了懒加载chunk
 	function webpackJsonpCallback(data) {
 		var chunkIds = data[0];
 		var moreModules = data[1];


 		// add "moreModules" to the modules object,
 		// then flag all "chunkIds" as loaded and fire callback
 		var moduleId, chunkId, i = 0, resolves = [];
 		for(;i < chunkIds.length; i++) {
 			chunkId = chunkIds[i];
 			if(installedChunks[chunkId]) {
 				resolves.push(installedChunks[chunkId][0]);
 			}
 			installedChunks[chunkId] = 0;
 		}
 		for(moduleId in moreModules) {
 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
 				modules[moduleId] = moreModules[moduleId];
 			}
 		}
 		if(parentJsonpFunction) parentJsonpFunction(data);

 		while(resolves.length) {
 			resolves.shift()();
 		}

 	};


     // The module cache
    //  模块缓存
 	var installedModules = {};

 	// object to store loaded and loading chunks
 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
     // Promise = chunk loading, 0 = chunk loaded
    //  这是一个对象，用来存放加载的chunk
 	var installedChunks = {
 		"main": 0
 	};



 	// script path function
 	function jsonpScriptSrc(chunkId) {
        //  p = webpack.config.output.publicPath /0 .js
 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
 	}

 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}

 	// This file contains only the entry chunk.
     // The chunk loading function for additional chunks
    //  这个文件只包含入口模块
    // 这是一个加载额外chunk的函数 ensure
 	__webpack_require__.e = function requireEnsure(chunkId) {
 		var promises = [];


 		// JSONP chunk loading for javascript

 		var installedChunkData = installedChunks[chunkId];
 		if(installedChunkData !== 0) { // 0 means "already installed".

 			// a Promise means "currently loading".
 			if(installedChunkData) {
 				promises.push(installedChunkData[2]);
 			} else {
 				// setup Promise in chunk cache
 				var promise = new Promise(function(resolve, reject) {
 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
 				});
 				promises.push(installedChunkData[2] = promise);
                //  installedChunkData => [resolve , reject , promise]  
                //  installedChunks => { 0: [resolve, reject, promise ], main": 0 } 
				//  installedChunkData与installedChunks[0]相互引用
				
 				// start chunk loading
 				var head = document.getElementsByTagName('head')[0];
 				var script = document.createElement('script');
 				var onScriptComplete;

 				script.charset = 'utf-8';
 				script.timeout = 120;
 				if (__webpack_require__.nc) {
 					script.setAttribute("nonce", __webpack_require__.nc);
 				}
 				script.src = jsonpScriptSrc(chunkId);

 				onScriptComplete = function (event) {
 					// avoid mem leaks in IE.
 					script.onerror = script.onload = null;
 					clearTimeout(timeout);
 					var chunk = installedChunks[chunkId];
 					if(chunk !== 0) { // 如果chunk不为0一般是没有加载成功
 						if(chunk) {
 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
 							var realSrc = event && event.target && event.target.src;
 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
 							error.type = errorType;
 							error.request = realSrc;
 							chunk[1](error);
 						}
 						installedChunks[chunkId] = undefined;
 					}
 				};
 				var timeout = setTimeout(function(){
 					onScriptComplete({ type: 'timeout', target: script });
 				}, 120000);
 				script.onerror = script.onload = onScriptComplete;
 				head.appendChild(script);
 			}
 		}
 		return Promise.all(promises);
 	};

 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";

 	// on error function for async loading
 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
   // jsonpArray 和 window.webpackJsonp都指向一个空数组
 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	//  对jsonpArray的push方法进行了重新赋值
 	jsonpArray.push = webpackJsonpCallback;
	jsonpArray = jsonpArray.slice();
 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
 	var parentJsonpFunction = oldJsonpFunction;


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/lazy.js");
 })
/************************************************************************/
 ({

    "./src/lazy.js":
    (function(module, exports, __webpack_require__) {
        eval("document.getElementById('play').addEventListener('click', function(e) {\n    // import异步加载模块是es7的语法\n    // 在webpack里import是一个天然的分割点\n    __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./video.js */ \"./src/video.js\")).then(function(video) {\n        let name = video.getName();\n        console.log(name);\n    })\n})\n\n//# sourceURL=webpack:///./src/lazy.js?");
    })
    
});
```

