import Vue from 'vue';
import { show } from './utils';
import a from './packages/a.js';
import b from './packages/b.js';
import c from './packages/c.js';

// import { trim } from 'lodash';
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

show();
const name = 'dzq';
console.log('>>>>>>>>', name);

export default {
  show,
  a,
  b,
  c
}


