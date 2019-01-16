import { combineReducers } from '../../redux/index.js';

import counter from './counter.js';
import counter2 from './counter2.js';
// 合并后返回一个新的函数
export default combineReducers({
  counter,
  counter2
})