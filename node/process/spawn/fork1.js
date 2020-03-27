console.log('子进程标准输出输出输出')

// process.send('hello 父进程');

process.on('message', function (msg) {
  console.log('fork1:来自父进程的消息', msg)
})  