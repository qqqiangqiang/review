/**
 * 原始为题：es6中为什么需要调用一下super
 * 我们首先以es6的语法写一段继承
 */
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

class Child extends Parent {
  constructor() {
    super(x, y);
  }
}

/**
 * 转译成es5源码
 * 原理其实同es5一样，存在两条如下原型链继承关系
 * 1、child.__proto__ = Parent  继承父类属性
 * (1的原理是将子类Child的__proto__属性的指向改成Parent, 然后再初始化继承的时候，执行Child.__proto__指向的方法，从而继承父类的属性)
 * 2、child.prototype.__proto__ = Parent.prototype 继承父类prototype方法
 * (2的原理类似与 child.prototype = new super()，将child.prototype改写成Super的实例，使其可以通过__proto__属性查找到父类的prototype)
 */
'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ =
            superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function () {
    function Parent() {
        _classCallCheck(this, Parent);

        this.name = 'parent';
    }

    _createClass(Parent, [{
            key: 'show',
            value: function show() {
                console.log(this.name);
            }
  }], [{
            key: 'show2',
            value: function show2() {
                console.log('静态属性');
            }
  }]);

    return Parent;
}();

var Child = function (_Parent) {
    _inherits(Child, _Parent);

    function Child() {
        _classCallCheck(this, Child);

        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, x, y));
    }

    return Child;
}(Parent);

/**
 * 调用super的原因如下
 * 1、只有调用super()才会继承父类的属性，执行这句代码_possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, x, y));
 * 2、super里面的参数会被当做参数传递给父类的构造函数
 */


