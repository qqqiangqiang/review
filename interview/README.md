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
### 阿里巴巴面试相关
#### em
相对的计算必然会一个参考物，那么这里相对所指的是相对于元素父元素的font-size。比如说：如果在一个<div>设置字体大小为“16px”，此时这个<div>的后代元素教程了是将继承他的字体大小，除非重新在其后代元素中进行过显示的设置。

#### set
一个Set是一堆东西的集合,Set有点像数组,不过跟数组不一样的是，Set里面不能有重复的内容
```javascript
var books = new Set();
books.add('js');
books.add('js');//添加重复元素集合的元素个数不会改变
books.add('html');
books.forEach(function(book){//循环集合
    console.log(book);
})
console.log(books.size);//集合中元数的个数
console.log(books.has('js'));//判断集合中是否有此元素
books.delete('js');//从集合中删除此元素
console.log(books.size);
console.log(books.has('js'));
books.clear();//清空 set
console.log(books.size);
```

#### 


