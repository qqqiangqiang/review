// Dep，完成依赖的收集
var $uid = 0;
export function Dep() {
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