import ToastComponent from './toast.vue';
import vue from 'vue';

let $vm, wathcer;

//创建基础 Vue 构造器的“子类”。参数是一个对象，包含组件选项。
const Toast = vue.extend(ToastComponent);

// merge参数
const mergeOptions = function ($vm, options) {
  const defaults = {}
  for (let i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default
    }
  }
  const _options = objectAssign({}, defaults, options)
  for (let i in _options) {
    $vm[i] = _options[i]
  }
}

if (!$vm) {
  $vm = new Toast({
    el: document.createElement('div')
  })
  document.body.appendChild($vm.$el)
}

$vm.hideToast();
setTimeout(() => {
  $vm['text'] = '你好, dzq';
  console.log('>>>>>', $vm);
  $vm.showToast();
}, 200)

window.$vm = $vm;