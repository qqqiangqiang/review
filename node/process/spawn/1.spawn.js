let path = require('path');
let { spawn } = require('child_process');

// 默认值 ['pipe','pipe','pipe']
// pipe 在父进程和子进程之间创建一个管道，父进程可以通过子进程的stdio[0]访问子进程的标准输入，通过stdio[1]访问标准输出,stdio[2]访问错误输出
let p1 = spawn('node', ['fork1.js'], {
  cwd: path.resolve(__dirname),
})
p1.stdout.on('data', function (data) {
  console.log('P1:子进程的标准输出:' + data);
});

// stream 子进程和父进程共享一个终端设备、文件、端口或管道
let p2 = spawn('node', ['fork1.js'], {
  cwd: path.resolve(__dirname),
  stdio: [process.stdin, process.stdout, 'pipe']
})

// ipc 在父进程和子进程之间创建一个专用与传递消息的IPC通道。可以调用子进程的send方法向子进程发消息，子进程会触发message事件
let p3 = spawn('node', ['fork1.js'], {
  cwd: path.resolve(__dirname),
  stdio: ['ipc', process.stdout, 'pipe']
})
p3.on('message', function (msg) {
  console.log('p3:子进程传输的消息：', msg);
})
p3.send('你好子进程');

