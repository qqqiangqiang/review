var arr = [10,1,3,4,9,6,2,5,8,7];
// 冒泡排序
function bubbelSort(arr) {
  var temp;
  for (var i = 0; i < arr.length - 1; i++) {
    for(var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

var arr = [10,1,3,4,9,6,2,5,8,7];
// 选择排序
function selectionSort(arr) {
  var minIndex, temp;
  for (var i = 0; i < arr.length - 1; i++) {
    minIndex = i;
    for(var j = i + 1; j < arr.length; j++) {
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

var arr = [10,1,3,4,9,6,2,5,8,7];
// 插入排序
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var preIndex = i - 1,
      current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

var arr = [10,1,3,4,9,6,2,5,8,7];
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  var tarIndex = Math.floor(arr.length / 2),
    tarValue = arr.splice(tarIndex, 1)[0],
    left = [],
    right = [];

  for(var i = 0; i < arr.length; i++) {
    if (arr[i] > tarValue) {
      right.push(arr[i])
    } else {
      left.push(arr[i]);
    }
  }
  console.log('>>>>', left, right)
  return quickSort(left).concat([tarValue], quickSort(right));
}

// 二分查找
function binary_search(arr) {
  var low = 0,
    hign = arr.length - 1;

  while (low < hign) {
    var mid = parseInt((low+hight) / 2),
      val = arr[mid];
    if (arr[key] == val) {
      return val;
    } else if (arr[key] < val) {
      hign = mid;
    } else if (arr[key] > val) {
      low = mid;
    }
  }
  return undefined;
}