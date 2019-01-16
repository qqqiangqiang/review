export default function combineReducers(reducers) {
  return function(state = {}, action) {
    let newState = {};
    for (let attr in state) {
      let reducer = reducers[attr];
      newState[attr] = reducer(state[attr], action);
    }
  }
}
