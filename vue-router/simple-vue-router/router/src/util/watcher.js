import { Dep } from './dep.js'

// Watcher, 观察者，Observe发布消息时，所有的观察者将收到指令，执行相应的执行器
export function Watcher(vm, getter, options) {
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