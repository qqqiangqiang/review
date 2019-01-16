/**
 * example1
 */
var fs = require('fs');

function someAsyncOperation (callback) {
  // 花费2毫秒
  fs.readFile(__dirname + '/' + __filename, callback);
}

var timeoutScheduled = Date.now();
var fileReadTime = 0;
console.log('sss', fileReadTime);
setTimeout(function () {
  var delay = Date.now() - timeoutScheduled;
  console.log('setTimeout: ' + (delay) + "ms have passed since I was scheduled");
  // console.log('sss', fileReadTime - timeoutScheduled);
  console.log('fileReaderTime',fileReadTime - timeoutScheduled);
}, 0);

someAsyncOperation(function () {
  fileReadtime = Date.now();
  // let i = 0;
  while(Date.now() - fileReadtime < 20) {
    // console.log(i++);
  }
});