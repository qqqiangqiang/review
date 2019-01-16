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
---
## 性能优化
### 1.使用生产版本（资源的压缩）
- 开发应用时使用开发模式，部署应用时换为生产模式
#### Create React App 模式
```javascript
npm run build
```
#### 单文件构建
```javascript
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```
#### webpack
```javascript
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```
### 2.shouldComponentUpdate/PureComponent
默认情况下，只要调用setState()，便会触发react的重新渲染。
因此，一条修改方案便是我们重写shouldComponentUpdate函数，手动比较state是否发生改变。

```javascript
import react, { component } from 'react';
class demo extends component {
  constructor(props) {
    super();
    this.state = {
      name: 'xxx'
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.name === this.state.name) {
      return false
    } else {
      return true;
    }
  }
}
```

###3.React.PureComponent
React.PureComponent 与 React.Component 完全相同，但是在shouldComponentUpdate()中实现时，使用了 props 和 state 的浅比较

```javascript
// 实现原理
class PureComponent extends Component {
  constructor() {
    this.state = {
      data: []
    }
  }
  // 比较属于浅比较，只关心引用地址是否改变，如果是同一个引用地址，但是里面的元素变了的话，也将认为数据没有改变，组件将不会重新渲染
  // 解决方案类似handleClick处理，重新结构一个新的值，改变引用地址，但会导致不必要的内存开销
  // 如果直接改成深比较，则CPU占用率过大
  shouldComponentUpdate(nextProps, nextState) {
    for(let prop in nextProps) {
      if (nextProps[prop] !== this.props[prop]) {
        return true
      }
    }
    for(let prop in nextState) {
      if (nextState[prop] !== this.nextState[prop]) {
        return true
      }
    }
    return false
  }
  handleClick = (e) => {
    let val = e.target.value;
    this.state.data.push(val);
    this.setState({ todos: [...this.state.data]}) 
  }
}
```

### 4.immutable
最主要目的：减少复制数据结构所带来的内存开销。
- 不可变(Immutable): 一个集合一旦创建，在其他时间是不可更改的。
- 持久的(Persistent): 新的集合可以基于之前的结合创建并产生突变，例如：set。原来的集合在新集合创建之后仍然是可用的。
- 结构共享(Structural Sharing): 新的集合尽可能通过之前集合相同的结构创建，最小程度地减少复制操作来提高性能。

```javascript
import { is } from 'immutable';
shouldComponentUpdate: (nextProps, nextState) => {
return !(this.props === nextProps || is(this.props, nextProps)) ||
       !(this.state === nextState || is(this.state, nextState));
}
// 改变setState
this.setState({ data: this.state.data.update('counter', counter => counter + 1) });
```

### 5.Context（上下文）
- 1、在父组件里定义 childContextType 子上下文类型
- 2、在父组件里还要定义一个 getChildContext 用来返回上下文对象，在子组件里接收到的对象
- 3、在要接收这些上下文对象的组件里，定义 contextTypes
```javascript
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
class Header extends Component{
    render() {
        return (
            <div>
                <Title/>
            </div>
        )
    }
}
class Title extends Component{
    static contextTypes={
        color:PropTypes.string
    }
    render() {
        return (
            <div style={{color:this.context.color}}>
                Title
            </div>
        )
    }
}
class Main extends Component{
    render() {
        return (
            <div>
                <Content>
                </Content>
            </div>
        )
    }
}
class Content extends Component{
    static contextTypes={
        color: PropTypes.string,
        changeColor:PropTypes.func
    }
    render() {
        return (
            <div style={{color:this.context.color}}>
                Content
                <button onClick={()=>this.context.changeColor('green')}>绿色</button>
                <button onClick={()=>this.context.changeColor('orange')}>橙色</button>
            </div>
        )
    }
}
class Page extends Component{
    constructor() {
        super();
        this.state={color:'red'};
    }
    static childContextTypes={
        color: PropTypes.string,
        changeColor:PropTypes.func
    }
    getChildContext() {
        return {
            color: this.state.color,
            changeColor:(color)=>{
                this.setState({color})
            }
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#root'));
```

### 6.高阶组件
- 高阶组件就是一个函数，用来封装重复的逻辑
- 穿进去一个老组件，放回一个新组件
```javascript
// local.js
export default function(OldComponent, name, placeholder) {
  class NewComponent extends Componenet {
    constructor() {
      super();
      this.state = {
        data: ''
      }
    }
    componentDidMount() {
      this.setState({ data: localstorage.getItem(name) || placeholder })
    }
    handleChange = () => {
      localstorage.setItem(name, e.target.value);
    }
    render() {
      return </OldComponent data={this.state.data} save={this.handleChange}>
    }
  }
  return NewComponent;
}
// userName.js
import local from './local.js';
class UserName extends Component {
  render() {
    return （
      <label>用户名</label>
      <input defaultValue={this.props.value} onChange={this.props.save} />
    ）
  }
}
export default local(UserName, 'userName', '请输入用户名');
```

### 7.fragments
React 中一个常见模式是为一个组件返回多个元素。 片段(fragments) 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点。

```javascript
// demo
export default class Message extends Component {
  constructor() {
    super();
    this.state = {
      message: [1,2,3]
    }
  }
  render() {
    return (
      <ul>
        { this.state.message.map((item,key) => <li key={key}>item</li>) }
      </ul>
    )
  }
} 

// demo优化
class List extends Componenet {
  return (
    <React.Fragment>
      { this.props.message.map((item,key) => <li key={key}>item</li>) }
    </React.Fragment>
  )
}
export default class Message extends Component {
  constructor() {
    super();
    this.state = {
      message: [1,2,3]
    }
  }
  render() {
    return (
      <ul>
        <List message={this.state.message}>
      </ul>
    )
  }
} 

```

### 8.插槽
Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。
> ReactDOM.createPortal(child, container)
- 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)
- 第二个参数（container）则是一个 DOM 元素

```javascript
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

class Modal extends Component{
    constructor() {
        super();
        this.modal=document.querySelector('#modal-root');
    }
    render() {
        return ReactDOM.createPortal(this.props.children,this.modal);
    }
}
class Page extends Component{
    constructor() {
        super();
        this.state={show:false};
    }
    handleClick=() => {
        this.setState({show:!this.state.show});
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>显示模态窗口</button>
                {
                    this.state.show&&<Modal>
                    <div id="modal" className="modal">
                        <div className="modal-content" id="modal-content">
                                内容
                                <button onClick={this.handleClick}>关闭</button>
                        </div>
                    </div>
                </Modal>
                }
            </div>
        )
    }
}
ReactDOM.render(<Page/>,document.querySelector('#root'));
```

### 9.错误边界
部分 UI 中的 JavaScript 错误不应该破坏整个应用程序。 为了解决 React 用户的这个问题，React 16引入了一个 “错误边界(Error Boundaries)” 的新概念。

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state={hasError:false};
    }
    componentDidCatch(err,info) {
        this.setState({hasError: true});
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something Went Wrong</h1>
        }
        return this.props.children;
    }
}

class Page extends React.Component{
    render() {
        return (
            <ErrorBoundary>
                <Clock/>
            </ErrorBoundary>
        )
    }
}
class Clock extends React.Component{
    render() {
        return (
            <div>hello{null.toString()}</div>
        )
    }
}

ReactDOM.render(<Page/>,document.querySelector('#root'));
```