// 数组功能扩展
// 数组迭代函数
Array.prototype.each = function(fn) {
  fn = fn || Function.K;
  let a = [];
  let args = Array.prototype.slice.call(arguments, 1);
  for (let i = 0; i < this.length; i++) {
    let res = fn.apply(this, [this[i], i].concat(args));
    if (res != null) {
      a.push(res);
    }
  }
  return a;
};
// 数组是否包含指定元素
Array.prototype.contains = function(suArr) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == suArr) {
      return true;
    }
  }
  return false;
}
// 不重复元素构成的数组
Array.prototype.uniquelize = function() {
  // eslint-disable-next-line no-array-constructor
  let ra = new Array();
  for (let i = 0; i < this.length; i++) {
    if (!ra.contains(this[i])) {
      ra.push(this[i]);
    }
  }
  return ra;
};
// 两个数组的交集
Array.intersect = function(a, b) {
  return a.uniquelize().each(function(o) {
    return b.contains(o) ? o : null
  });
};
// 两个数组的差集
Array.minus = function(a, b) {
  return a.uniquelize().each(function(o) {
    return b.contains(o) ? null : o
  });
};
// 两个数组的补集
Array.complement = function(a, b) {
  return Array.minus(Array.union(a, b), Array.intersect(a, b));
};
// 两个数组并集
Array.union = function(a, b) {
  return a.concat(b).uniquelize();
};

/**
 * 删除数组元素
 * @param {obj} 要删除的对象
 */
Array.prototype.remove = function (obj) {
  let index = this.indexOf(obj);
  if (index > -1) {
    this.splice(index, 1);
  }
};


/**
 * 使用Demo
  let a = [1, 2, 3, 4, 5]
  let b = [2, 4, 6, 8, 10]
  console.log('数组a：', a);
  console.log('数组b：', b);
  console.log('a与b的交集：', Array.intersect(a, b));
  console.log('a与b的差集：', Array.minus(a, b));
  console.log('a与b的补集：', Array.complement(a, b));
  console.log('a与b的并集：', Array.union(a, b));
 */

