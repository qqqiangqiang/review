let { exec } = require('child_process');
let path = require('path');

let p1 = exec('node fork1.js', {
  cwd: path.join(__dirname, '../spawn')
}, function (err, stdout, stderr) {
  if (err) {
    console.log('子进程开启失败:' + err);
    process.exit();
  } else {
    console.log('子进程标准输出：' + stdout.toString());
  }
});

p1.stdout.pipe(process.stdout);