import { Dep } from './dep.js';

// Observe , 负责完成消息的发布，消息的订阅等
export function Observe(data) {
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
}