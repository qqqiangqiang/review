// es6 class实现原理
class Parent {
  constructor() {
    this.name = 'parent';
  }
  show() {
    console.log(this.name);
  }
  static show2() {
    console.log('静态属性');
  }
}
var p1 = new Parent();
p1.show();


// es5 
var createClass = (function() {
  function defineProperties(target, props) {
    // for (y in props) {
    //   Object.defineProperty(target, props[key], props[value])
    // }
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      console.log('>>>', prop);
      Object.defineProperty(target, prop.key, prop)
    }
  }
  return function(parent, props, staticProps) {
    if (props) defineProperties(parent.prototype, props)
    if (staticProps) defineProperties(parent, staticProps)
    return parent;
  } 
})()
var classCheck = function(instance, constructor) {
  if (!instance instanceof constructor) {
    throw new TypeError('类不能当做一个函数调用')
  }
}
var Parent = function() {
  function Parent() {
    this.name = 'parent';
    classCheck(this, Parent);
  }
  // 第一个参数为父类函数，第二个参数为prototype属性，第三个参数为static属性
  createClass(Parent, [{
    key: 'show',
    value: function show() {
      console.log(this.name)
    }
  }])

  return Parent;
}();

var p1 = new Parent();
p1.show()