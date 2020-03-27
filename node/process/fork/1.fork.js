let path = require('path');
let { fork } = require('child_process');

let p1 = fork(path.resolve(__dirname, '../spawn/fork1.js'), {
  silent: false, // silent 属性值为布尔值，当属性值为false时，子进程和父进程对象共享标准(输入/输出),true时不共享
});

p1.send('父进程的消息');
p1.on('message', function (msg) {
  console.log('p1:收到子进程的消息', msg);
})

let p2 = fork(path.resolve(__dirname, '../spawn/fork1.js'), {
  encoding: 'utf8',
  silent: true, // silent 属性值为布尔值，当属性值为false时，子进程和父进程对象共享标准(输入/输出),true时不共享
});
p2.stdout.on('data', function (data) {
  console.log('p2:子进程的标准输出', data.toString());
})