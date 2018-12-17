/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/history/base.js":
/*!*****************************!*\
  !*** ./src/history/base.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.match = match;\nexports.getQuery = getQuery;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Base = exports.Base = function () {\n  function Base(router) {\n    _classCallCheck(this, Base);\n\n    this.router = router;\n    this.current = {\n      path: '/',\n      query: {},\n      params: {},\n      name: '',\n      fullPath: '/',\n      route: {}\n    };\n  }\n  /**\n   * 路由转换\n   * @param target 目标路径\n   * @param cb 成功后的回调\n   */\n\n\n  _createClass(Base, [{\n    key: 'transitionTo',\n    value: function transitionTo(target, cb) {\n      var _this = this;\n\n      var targetRoute = match(target, this.router.routes);\n      this.confirmTransition(targetRoute, function () {\n        _this.current.route = targetRoute;\n        _this.current.name = targetRoute.name;\n        _this.current.path = targetRoute.path;\n        _this.current.query = targetRoute.query || getQuery();\n        _this.current.fullPath = getFullPath(_this.current);\n        cb && cb();\n      });\n    }\n    /**\n     * 确认跳转\n     * @param route route对象\n     * @param cb 回调函数\n     */\n\n  }, {\n    key: 'confirmTransition',\n    value: function confirmTransition(route, cb) {\n      // 钩子函数执行队列\n      var queue = [this.router.beforeEach, // 全局前置\n      this.current.route.beforeLeave, // 离开当前导航的钩子函数\n      route.beforeEnter, // 即将进入该导航\n      route.afterEnter];\n      // 通过step调度执行\n      var i = -1;\n      var step = function step() {\n        i++;\n        if (i > queue.length) {\n          typeof cd == 'function' && cb();\n        } else if (queue[i]) {\n          queue[i](step);\n        } else {\n          step();\n        }\n      };\n      step();\n    }\n  }]);\n\n  return Base;\n}();\n\nfunction getFullPath(_ref, _stringifyQuery) {\n  var path = _ref.path,\n      _ref$query = _ref.query,\n      query = _ref$query === undefined ? {} : _ref$query,\n      _ref$hash = _ref.hash,\n      hash = _ref$hash === undefined ? '' : _ref$hash;\n\n  var stringify = _stringifyQuery || stringifyQuery;\n  return (path || '/') + stringify(query) + hash;\n}\n\nfunction match(path, routeMap) {\n  var match = {};\n  // path为 '/bar' 或者是 { path: '/bar' } 的形式\n  if (typeof path == 'string' || path.name == undefined) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = routeMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var _path = _step.value;\n\n        if (route.path == _path || route.path == _path.path) {\n          match = route;\n          break;\n        }\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  } else {\n    // path为 { name: 'bar', query: { name: 'bar' } } 的形式\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n      for (var _iterator2 = routeMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n        var _route = _step2.value;\n\n        if (_route.name == path.name) {\n          match = _route;\n          if (path.query) {\n            match.query = path.query;\n          }\n          break;\n        }\n      }\n    } catch (err) {\n      _didIteratorError2 = true;\n      _iteratorError2 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion2 && _iterator2.return) {\n          _iterator2.return();\n        }\n      } finally {\n        if (_didIteratorError2) {\n          throw _iteratorError2;\n        }\n      }\n    }\n  }\n  return match;\n}\n\n// 获取query参数\nfunction getQuery() {\n  var hash = location.hash;\n  var queryStr = hash.indexOf('?') !== -1 ? hash.substring(hash.indexOf('?') + 1) : '';\n  var queryArray = queryStr ? queryStr.split('&') : [];\n  var query = {};\n  queryArray.forEach(function (q) {\n    var qArray = q.split('=');\n    query[qArray[0]] = qArray[1];\n  });\n  return query;\n}\n\nfunction stringifyQuery(obj) {\n  var res = obj ? Object.keys(obj).map(function (key) {\n    var val = obj[key];\n\n    if (val === undefined) {\n      return '';\n    }\n\n    if (val === null) {\n      return key;\n    }\n\n    if (Array.isArray(val)) {\n      var result = [];\n      val.forEach(function (val2) {\n        if (val2 === undefined) {\n          return;\n        }\n        if (val2 === null) {\n          result.push(key);\n        } else {\n          result.push(key + '=' + val2);\n        }\n      });\n      return result.join('&');\n    }\n\n    return key + '=' + val;\n  }).filter(function (x) {\n    return x.length > 0;\n  }).join('&') : null;\n  return res ? '?' + res : '';\n}\n\n//# sourceURL=webpack:///./src/history/base.js?");

/***/ }),

/***/ "./src/history/hash.js":
/*!*****************************!*\
  !*** ./src/history/hash.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.HashHistory = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _base = __webpack_require__(/*! ./base */ \"./src/history/base.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar HashHistory = exports.HashHistory = function (_Base) {\n  _inherits(HashHistory, _Base);\n\n  function HashHistory(router) {\n    _classCallCheck(this, HashHistory);\n\n    var _this = _possibleConstructorReturn(this, (HashHistory.__proto__ || Object.getPrototypeOf(HashHistory)).call(this, router));\n\n    window.addEventListener('hashchange', function () {\n      _this.transitionTo(_this.getCurrentLocation());\n    });\n    return _this;\n  }\n\n  _createClass(HashHistory, [{\n    key: 'push',\n    value: function push(location) {\n      var _this2 = this;\n\n      var targetRoute = (0, _base.match)(location, this.router.routes);\n      this.transitionTo(targetRoute, function () {\n        changeUrl(_this2.current.fullPath.substring(1));\n      });\n    }\n  }, {\n    key: 'replaceState',\n    value: function replaceState(location) {\n      var _this3 = this;\n\n      var targetRoute = (0, _base.match)(location, this.router.routes);\n\n      this.transitionTo(targetRoute, function () {\n        changeUrl(_this3.current.fullPath.substring(1), true);\n      });\n    }\n  }, {\n    key: 'getCurrentLocation',\n    value: function getCurrentLocation() {\n      var href = window.location.href;\n      var index = href.indexOf('#');\n      return index === -1 ? '' : href.slice(index + 1);\n    }\n  }]);\n\n  return HashHistory;\n}(_base.Base);\n\nfunction changeUrl(path, replace) {\n  var href = window.location.href;\n  var i = href.indexOf('#');\n  var base = i >= 0 ? href.slice(0, i) : href;\n  if (replace) {\n    window.history.replaceState({}, '', base + '#/' + path);\n  } else {\n    window.history.pushState({}, '', base + '#/' + path);\n  }\n}\n\n//# sourceURL=webpack:///./src/history/hash.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _hash = __webpack_require__(/*! ./history/hash */ \"./src/history/hash.js\");\n\nvar _watcher = __webpack_require__(/*! ./util/watcher.js */ \"./src/util/watcher.js\");\n\nvar _observer = __webpack_require__(/*! ./util/observer.js */ \"./src/util/observer.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Router = function () {\n  function Router(options) {\n    _classCallCheck(this, Router);\n\n    this.base = options.base;\n    this.routes = options.routes;\n    this.container = options.id;\n    this.mode = options.mode || 'hash';\n    this.history = this.mode == 'history' ? new HTML5History(this) : new _hash.HashHistory(this);\n    this.initData();\n  }\n\n  _createClass(Router, [{\n    key: 'push',\n    value: function push(location) {\n      this.history.push(location);\n    }\n  }, {\n    key: 'replace',\n    value: function replace(location) {\n      this.history.replace(location);\n    }\n  }, {\n    key: 'go',\n    value: function go(n) {\n      this.history.go(n);\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var i = void 0;\n      if ((i = this.history.current) && (i = i.routes) && (i = i.component)) {\n        document.getElementById(this.container).innerHTML = i;\n      }\n    }\n  }, {\n    key: 'initData',\n    value: function initData() {\n      _observer.Observe.call(this, this.history.current);\n      new _watcher.Watcher(this, this.render);\n    }\n  }]);\n\n  return Router;\n}();\n\nwindow.Router = Router;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/util/dep.js":
/*!*************************!*\
  !*** ./src/util/dep.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Dep = Dep;\n// Dep，完成依赖的收集\nfunction Dep() {\n  this.id = $uid++;\n  this.subs = [];\n}\nDep.prototype.depend = function () {\n  var t_w = Dep.target;\n  // 只有当前watcher没有被当前依赖收集才添加\n  if (t_w.depIds.indexOf(this.id) < 0) {\n    this.subs.push(t_w);\n    t_w.deps.push(this);\n    t_w.depIds.push(this.id);\n  }\n};\nDep.prototype.notify = function () {\n  for (var i = 0; i < this.subs.length; i++) {\n    this.subs[i].update();\n  }\n};\n\n//# sourceURL=webpack:///./src/util/dep.js?");

/***/ }),

/***/ "./src/util/observer.js":
/*!******************************!*\
  !*** ./src/util/observer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Observe = Observe;\n\nvar _dep = __webpack_require__(/*! ./dep.js */ \"./src/util/dep.js\");\n\n// Observe , 负责完成消息的发布，消息的订阅等\nfunction Observe(data) {\n  for (var key in data) {\n    defineReactive(data, key, data[key]);\n  }\n}\nfunction defineReactive(obj, prop, val) {\n  var dep = new _dep.Dep();\n  Object.defineProperty(obj, prop, {\n    get: function get() {\n      dep.depend();\n      return val;\n    },\n    set: function set(nval) {\n      if (nval == val) return;\n      val = nval;\n      dep.notify();\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/util/observer.js?");

/***/ }),

/***/ "./src/util/watcher.js":
/*!*****************************!*\
  !*** ./src/util/watcher.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Watcher = Watcher;\n\nvar _dep = __webpack_require__(/*! ./dep.js */ \"./src/util/dep.js\");\n\n// Watcher, 观察者，Observe发布消息时，所有的观察者将收到指令，执行相应的执行器\nfunction Watcher(vm, getter, options) {\n  // 哪些依赖收集着当前watcher\n  this.$vm = vm;\n  this.depIds = [];\n  this.deps = [];\n  this.getter = getter;\n  this.options = options;\n  this.isComputed = options && this.options.isComputed;\n  this.value = this.isComputed ? '' : this.get();\n}\nWatcher.prototype.get = function () {\n  _dep.Dep.target = this;\n  return this.getter.call(this.$vm);\n};\nWatcher.prototype.evalute = function () {\n  var current = _dep.Dep.target;\n  this.value = this.get();\n  _dep.Dep.target = current;\n};\nWatcher.prototype.update = function () {\n  this.getter();\n};\n\n//# sourceURL=webpack:///./src/util/watcher.js?");

/***/ })

/******/ });