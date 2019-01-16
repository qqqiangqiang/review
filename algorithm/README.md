## 算法
### 排序
参考：https://segmentfault.com/a/1190000010413296
```javascript
const arr = [5,2,1,3,4,6,0]
/**
 *  1、冒泡排序 (最小的元素会慢慢的浮动到左边) 
 *  经历每一次排序之后，最大的元素都会到数组末尾
 *  当输入的数据已经是正序的时候，效率最快
 *  当输入的数据是反序的时候，效率最低
 */
function bubbelSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbelSort(arr));

/**
 * 2、选择排序（依次取数组起始位置元素，寻找到最小元素与其进行交换）
 * 经历一次排序，最小的元素会到数组起始位置
 * 找到最小的数组下标，与起始位置元素交换位置
*/
function selectionSort(arr) {
  var minIndex, temp;
  for (var i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
console.log(selectionSort(arr))

/**
 * 3、插入排序（不断的构造有序数列并插入） 
*/
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var preIndex = i - 1,
      current = arr[i];
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex+1] = arr[preIndex];
      preIndex--;  
    }
    arr[preIndex+1] = current;
  }
  return arr;
}

/**
 * 4、希尔排序（先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。） 
*/
function shellSort(arr) {
  var len = arr.length,
      temp,
      gap = Math.floor(len / 2);
  
  for (gap; gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < len; i++) {
      var preIndex = i - gap,
          temp = arr[i];
      while(preIndex >= 0 && arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
  }
  return arr;
}

/**
 * 5、快速排序
*/
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var tarIndex = Math.floor(arr.length / 2);
  var tarValue = arr.splice(tarIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= tarValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([tarValue],quickSort(right));
}
```

### 查找
```javascript
/*
* 二分查找
*/
function binary_search(arr, key) {
  var low = 0,
      high = arr.length - 1;
  while (low < high) {
    var mid = parseInt((low + high) / 2),
        val = arr[mid];
    if (arr[key] == val) {
      return val;
    } else if (arr[key] < val) {
      high = mid;
    } else if (arr[key] > val) {
      low = mid;
    }
  }
  return undefined
}
```

### 斐波拉切数列
```javascript
// n代表数列长度
function getFibonacci(n) {
  var fibonac = [], i = 0;
  while(i < n) {
    if (i <= 1) {
      fibonac.push(i);
    } else {
      fibonac.push(fibonac[i - 2] + fibonac[i - 1]);
    }
    i++;
  }
  return fibonac;
}
```

### 深度克隆
```javascript
function deepClone(obj) {
  let child;
  if (Object.prototype.toString.call(obj) == '[object Object]') {
    child = {};
    for (let key in obj) {
      child[key] = deepClone(obj[key])
    }
  } else if (Array.isArray(obj)) {
    child = obj.map(item => deepClone(item))
  } else {
    return obj
  }
  return child;
}
```
