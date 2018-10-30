// 常见的继承方式
// 继承的概念：子类继承父类的属性和方法，方法包括原型对象上的方法
// 父类
function Animal() {
  this.name = 'animal';
  this.ids = [];
}
Animal.prototype.show = function() {
  console.log('>>', this.name);
}
Animal.prototype.id = { name: 'dzq' };

/**
 * 1、原型链继承
 */
function A() {  
}
A.prototype = new Animal();

/**
 * 2、构造函数继承
 */
function B() {
  Animal.call(this);
}
var b1 = new B();
console.log(b1.name);

/**
 * 3、组合继承
 */
function C() {
  Animal.call(this);
}
C.prototype = new Animal();

/**
 * 4、最完美的一种继承方式
 */
function D() {
  Animal.call(this);
}
(function() {
  function Super() {};
  Super.prototype = Animal.prototype;
  D.prototype = new Super();
  D.prototype.constructor = D;
})()
/**
 * 解决的问题
 * 1、一方案中的共享父类中的属性的问题，先让构造函数在子类中执行一遍，使每个子类的实例都拥有自己的属性
 * 2、三方案中的构造函数执行两次父类的属性同时存在与prototype原型对象的问题
 * 3、同时使每个子类的prototype都通过__proto__指向同一个原型，也是最节约内存的一种表现
 */


