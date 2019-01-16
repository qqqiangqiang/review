## redux

### 1.redux
- 一旦数据可以任意修改，所有对共享状态的操作都是不可预料的
- 模块之间需要共享数据和数据可能被任意修改导致不可预料的结果之间有矛盾
- 所有对数据的操作必须通过 dispatch 函数 
```javascript
function renderTitle(title) {
    let titleEle=document.querySelector('#title');
    titleEle.innerHTML=title.text;
    titleEle.style.color=title.color;
}
function renderContent(content) {
    let contentEle=document.querySelector('#content');
    contentEle.innerHTML=content.text;
    contentEle.style.color=content.color;
}
function render() {
    renderTitle(store.getState().title);
    renderContent(store.getState().content);
}

// createStore初始化state并暴露出getState和dispath方法
function createStore(reducer) {
    let state;
    let listeners=[];
    function getState() {
        return state;
    }

    function dispatch(action) {
        state=reducer(state,action);
        listeners.forEach(l=>l());
    }

    function subscribe(listener) {
        listeners.push(listener);
        // 返回一个取消订阅函数
        return () => {
            listeners = listeners.filter(item => item!=listener);
            console.log(listeners);
        }
    }
    // 派发默认值，此派发不会传action
    dispatch({});
    return {
        getState,
        dispatch,
        subscribe
    }

}
let initState={
    title: {color: 'red',text: '标题'},
    content:{color:'green',text:'内容'}
}
// reducer负责把初始state和action传递进去
let reducer=function (state=initState,action) {
    switch (action.type) {
        case 'UPDATE_TITLE_COLOR':
            return {...state,title: {...state.title,color:action.color}};
        case 'UPDATE_CONTENT_CONTENT':
        return {...state,content: {...state.content,text:action.text}};    
            break;
        default:
            return state;    
    }
}
let store=createStore(reducer);
render();
// 让store订阅render
let unsubscribe = store.subscribe(render);
setTimeout(function () {
    store.dispatch({type:'UPDATE_TITLE_COLOR',color:'purple'});
    // 取消订阅函数
    unsubscribe();
    store.dispatch({type:'UPDATE_CONTENT_CONTENT',text:'新标题'});
},2000);
```

#### 纯函数
纯函数很严格，也就是说你几乎除了计算数据以外什么都不能干，计算的时候还不能依赖除了函数参数以外的数据。

- 函数的返回结果只依赖于它的参数
- 函数执行过程没有副作用,一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的
  - 调用 DOM API 修改页面
  - 发送了 Ajax 请求

### 2.redux
#### 设计思想
- Redux是将整个应用状态存储到到一个地方，称为store
- 里面保存一棵状态树state tree
- 组件可以派发dispatch行为action给store,而不是直接通知其它组件
- 其它组件可以通过订阅store中的状态(state)来刷新自己的视图.

#### 三大原则
- 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
- State 是只读的，惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象 使用纯函数来执行修改，为了描述action如何改变state tree ，你需要编写 reducers
- 单一数据源的设计让React的组件之间的通信更加方便，同时也便于状态的统一管理