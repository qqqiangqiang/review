### 继承相关
#### Object. create
object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的``__proto__``

```javascript
const person = { isHuman: false, show: function() { console.log(this.isHuman) }}
const me = Object.create(person);
// 创建me这么一个对象，使其__proto__指向person对象
me.name = 'lxx';
me.isHuman = true; 
console.log(me.show()); 
// true
```
---

#### Object.setPrototypeOf(obj, prototype)
- Object.setPrototypeOf() 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null。
   - obj：要设置其原型的对象。.
   - prototype：该对象的新原型(一个对象 或 null).

ps：其实相当于，``obj.__proto__ = prototype``


#### 继承相关实现原理等
参照目录下的js文件