## React基础
### 1.什么是React
React 是一个用于构建用户界面的JavaScript库 核心专注于视图,目的实现组件化开发

### 2.组件化的三个特点
- 可组合：一个组件可以和其他的组件一起使用或者可以直接嵌套在另一个组件内部
- 可复用：每个组件都是具有独立功能的，它可以被使用在多个场景中
- 可维护：每个小的组件仅仅包含自身的逻辑，更容易被理解和维护

### 3.跑通
```javascript
npm install create-react-app -g
create-react-app <project-name>
cd <project-name> && npm start
```
默认会自动安装React,react由两部分组成,分别是:
- react.js 是 React 的核心库
- react-dom.js 是提供与DOM相关的功能,会在window下增加ReactDOM属性,内部比较重要的方法是render,将react元素或者react组件插入到页面中。

### 4.JSX
是一种JS和HTML混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件,会编译成普通的Javascript。 需要注意的是JSX并不是html,在JSX中属性不能包含关键字，像class需要写成className,for需要写成htmlFor,并且属性名需要采用驼峰命名法

### 5.createElement
JSX其实只是一种语法糖，最终会通过babel转译成createElement语法，一下代码等价：
```javascript
ReactDOM.render(<div>hello<span>React</span></div>)
// createElement接收的参数 ``tagName`` ``props`` ``children``
ReactDom.render(React.createElement('div', null, 'hello', React.createElement('span', null, 'React' )));
```

### 6.React元素/JSX元素
```javascript
// ReactElement就是虚拟dom的概念，其中type属性代表当前节点的类型，props代表节点的属性
function ReactElement(type, props) {
  this.type = type;
  this.props = props;
}
// createElement接收三个参数并最终转成虚拟dom
let React = {
  createElement(type, props, ...childrens) {
    if (childrens.length === 1) {
      childrens = childrens[0];
    }
    return ReactElement(type, {...props, children: childrens})
  }
}
```

### 7.模拟render的实现
```javascript
function render(elObj, container) {
  const { type, props } = elObj;
  if (!type) return;
  const node = document.createElement(type);
  for (let key in props) {
    const prop = props[key];
    // childrens属性
    if (key === 'childrens') {
      if (Array.isArray(prop)) {
        for (let prop_children of prop) {
          React.render(prop_children, node);
        }              
      } else if (typeof prop === 'object') {
        React.render(prop, node);
      } else {
        node.innerHTML =  prop;
      }
    } else {
      // 节点属性
      if (key === 'className') {
        node.setAttribute('class', prop)
      } else {
        node.setAttribute(key, prop);
      }
    }
  }
  container.appendChild(node);
}
```
