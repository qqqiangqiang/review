const fs = require('fs');

function Co(gen) {
  return new Promise(function (resolve, reject) {
    let it = gen();
    // 迭代器
    function executor(data) {
      let { value, done } = it.next(data);
      if (!done) {
        value.then(function (data) {
          executor(data);
        })
      } else {
        resolve(value);
      }
    }
    executor();
  })
}

Co(function* () {
  const data1 = yield readFile1();
  const data2 = yield readFile2();
  return data1 + data2;
}).then(function (data) {
  console.log('finalData', data);
})

function readFile1() {
  return new Promise(function (resolve, rejct) {
    fs.readFile('./a.txt', { encoding: 'utf-8' }, function (err, data) {
      resolve(data);
    })
  })
}

function readFile2() {
  return new Promise(function (resolve, rejct) {
    fs.readFile('./b.txt', { encoding: 'utf-8' }, function (err, data) {
      resolve(data);
    })
  })
}