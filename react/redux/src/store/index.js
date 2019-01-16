import { createStore } from '../redux';
console.log('store', createStore)
import reducers from './reducers/index.js';
const store = createStore(reducers);
module.exports = store;