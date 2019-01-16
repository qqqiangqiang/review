/**
 * 创建一个Redux仓库来保存整个状态树
 * 改变状态树的唯一方法是调用store.dispatch方法
 * 在整个应用中只能有一个仓库
 * 为了指定状态树的各个部分如何响应action的变化，你可能使用combineReducers方法把多个reducer合并为一个单独的reducer
 * 
 * @param {Function} reducer 一个通过当前状态对象和要处理的action返回新的状态树的函数
 * @param {any} [preloadedState] 初始状态。在同构应用中，你可能需要指定它以合并来自服务器的状态，或者从一个以前序列化的用户会话中恢复. 
 * 如果你使用了combineReducers,来从根reducer中产生状态，这必须是一个和combineReducer 的keys相同形状的对象
 * @param {Function} [enhancer] 仓库的enhancer. 你可能需要指定这个去增强仓库的能力以使用第三方的能力比如中间件
 * 时间旅行，持久化等等。redux自带的唯一中间件是applyMiddleware
 * @returns {Store} 是一个Redux仓库让你可以读取状态，派发action并订阅状态变化
 */

export default function createStore(reducer, preloadedState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer,preloadedState);
  }
  let state=preloadedState;
  let listeners=[];
  function getState() {
      return state;
  }

  function dispatch(action) {
    console.log('action', action);
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
