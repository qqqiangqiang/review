import { resolve } from "path";
const fs = require('fs');

function *go() {
  console.log(1);
  // 此处的b用来供外界输入值进来，可以这样理解，我们把 yield 'a' 赋值 给某个变量，这个变量就可以当做下一步next的入参进行处理。
  // 这一行实现输入输出，本次的输出放在yield的后面，下次的输入放在yield的前面，下次next的执行从b开始进行
  let b = yield 'a';
  console.log(2);
  let c = yield b;
  console.log(3);
  return c;
}
// 生成器函数会返回此生成器的迭代器，迭代器是一个对象，每调用一次next就可以返回一个值对象
go();
let it = go();
// next第一次执行是不需要传参的，传参是没有意义的
let r1 = it.next();
// 第一次调用next会返回一个对象，此对象有两个属性，一个是value他就是yield后面的那个值，一个是done表示是否迭代完成
console.log(r1); // { value: 'a', done: false }
let r2 = it.next('B值');
console.log(r2); // { value: 'B值', done: false }
let r3 = it.next('C值');
console.log(r3); // { value: 'C值', done: true }  最后一次next返回的值将是整个迭代器函数return的值


function Co(gen) {
    
}

co(function *() {
  const data1 = yield readFile1();
  const data2 = yield readFile2();
  return data1 + data2;
}).then(function(data) {
  console.log('?????', data);
})

function readFile1() {
  return new Promise(function(reslve, rejct) {
    fs.readFile('./1.txt', function(data) {
      resolve(data);
    })
  })
}

function readFile1() {
  return new Promise(function(reslve, rejct) {
    fs.readFile('./\2.txt', function(data) {
      resolve(data);
    })
  })
}