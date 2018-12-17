## 零散知识点

### Object.assgin深拷贝还是浅拷贝
第一级属于深拷贝，以后级别浅拷贝

```javascript
// 第一级别深拷贝
let me = { data: { name: 'dzq', age: 29 }}
let me_fuben = Object.assign({}, me);
me_fuben.data = { data: { sex: 'nan' } }
console.log(me_fuben, me)

// 以后级别浅拷贝
let me1 = { data: { name: 'dzq', age: 29 }}
let me1_fuben = Object.assign({}, me1);
me1_fuben.data.name = 'lxx';
console.log(me1_fuben, me1)
```
