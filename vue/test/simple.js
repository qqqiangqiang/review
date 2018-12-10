function A(options) {
  var vm = this;
  vm.$options = options;
  initData(vm);
  initComputed(vm);
  // 拦截变异方法
  interceptMethods(vm);
  vm.mount();
  // 初始化ready
  initReady(vm);
}

A.prototype.mount = function() {
  var self = this;
  new Watcher(this, function() {
    self.updateDom();
  })
}

// 模拟更新dom节点操作
A.prototype.updateDom = function() {
  var str = '';
  // 模拟获取data、computed属性
  var data = this.$data;
  var computed_data = this.$options.computed;

  var keys = Object.keys(data);
  var computed_keys = Object.keys(computed_data);
  
  str += '<p> data: '
  for (var i = 0; i < keys.length; i ++) {
    var key = keys[i];
    console.log('get data =>', key, ':', this[key]);
    str += this[key] + '...';
  }
  str += '</p><p>computed: '
  for (var i = 0; i < computed_keys.length; i ++) {
    var key = computed_keys[i];
    console.log('get computed =>', key, ':', this[key]);
    str += this[key] + '...';
  }
  str += '</p>';

  document.getElementById('app').innerHTML = str;
  console.log('update dom');
}
// $set方法
A.prototype.$set = function(target, key, value) {
  if (isObject(target)) {
    defineReactive(target, key, value);
    target.__ob__.notify();
  }
  if (isArray(target)) {
    target.splice(key, 1, value)
  }
}

var $uid = 0;

// Observe , 负责完成消息的发布，消息的订阅等
function Observe(data) {
  for (var key in data) {
    defineReactive(data, key, data[key]);
  }
}
function defineReactive(obj, prop, val) {
  var dep = new Dep();
  Object.defineProperty(obj, prop, {
    get: function() {
      dep.depend();
      return val;
    },
    set: function(nval) {
      if (nval == val) return;
      val = nval;
      dep.notify();
    }
  })
  if (isObject(val)) {
    val.__ob__ = dep;
  }
  if (isArray(val)) {
    val.__proto__ = vueArrayPrototype;
    val.__ob__ = dep;
  }
}

// Dep，完成依赖的收集
function Dep() {
  this.id = $uid++;
  this.subs = [];
}
Dep.prototype.depend = function() {
  var t_w = Dep.target;
  // 只有当前watcher没有被当前依赖收集才添加
  if (t_w.depIds.indexOf(this.id) < 0) {
    this.subs.push(t_w);
    t_w.deps.push(this);
    t_w.depIds.push(this.id); 
  }
}
Dep.prototype.notify = function() {
  for (var i = 0; i < this.subs.length; i ++) {
    this.subs[i].update();
  }
}

// Watcher, 观察者，Observe发布消息时，所有的观察者将收到指令，执行相应的执行器
function Watcher(vm, getter, options) {
  // 哪些依赖收集着当前watcher
  this.$vm = vm;
  this.depIds = [];
  this.deps = [];
  this.getter = getter;
  this.options = options;
  this.isComputed = options && this.options.isComputed;
  this.value = this.isComputed ? '' : this.get();
}
Watcher.prototype.get = function() {
  Dep.target = this;
  return this.getter.call(this.$vm);
}
Watcher.prototype.evalute = function() {
  var current = Dep.target;
  this.value = this.get();
  Dep.target = current;
}
Watcher.prototype.update = function() {
  this.getter();
}


function initData(vm) {
  var data = vm.$data = vm.$options.data();
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++) {
    (function(j) {
      var prop = keys[j];
      Object.defineProperty(vm, prop, {
        get: function() {
          return vm.$data[prop];
        },
        set: function(val) {
          vm.$data[prop] = val;
        }
      })
    })(i)
  }

  Observe(data);
}

function initComputed(vm) {
  var data = vm.$options.computed;
  var keys = Object.keys(data);
  for (var i = 0; i < keys.length; i++ ) {
    var prop = keys[i];
    var fun = data[prop];
    Object.defineProperty(vm, prop, {
      get: makeComputer(vm, fun),
      set: function(){}
    })
  }
}

function makeComputer(vm ,fun) {
  var watcher = new Watcher(vm, fun, {
    isComputed: true
  });
  var dep = new Dep();

  return function () {
    console.log('进入', watcher.isComputed);
    if (watcher.isComputed) {
      watcher.evalute();
    }
    return watcher.value;
  }
  
}

function initReady(vm) {
  const fun = vm.$options.ready;
  typeof fun == 'function' && fun.call(vm); 
} 

function isObject(obj) {
  return obj !== null && typeof obj == 'object'
}

var isArray = Array.isArray;

var vueArrayPrototype = Object.create(Array.prototype);

function interceptMethods() {
  ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function(method) {
    var sourceMethod = Array.prototype[method];
    Object.defineProperty(vueArrayPrototype, method, {
      value: function() {
        var result = sourceMethod.apply(this, arguments);
        this.__ob__.notify();
       return result; 
      }
    })
  })
}

window.A == undefined && (window.A = A);