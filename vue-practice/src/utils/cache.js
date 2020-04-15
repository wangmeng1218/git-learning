//为单例创建私有变量和方法
export let Cache = (function(){
  let Items = {};
  return {
    getItem(key) {
      return Items[key];
    },
    setItem(key,value) {
      Items[key] = value;
    },
    removeItem(key) {
      delete Items[key];
    },
    getItems() {
      return deepClone(Items);
    }
  };
})();
/**
 * @desc 深拷贝，支持常见类型,支持数组和对象的嵌套
 * @param {Any} values
 */
const deepClone = function(values){
  let copy;
  // 处理简单数据类型和null/undefined
  if (values == null || typeof values !== 'object') return values;
  // 处理日期数据
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }
  // 处理数组
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy;
  }
  // 处理对象
  if (values instanceof Object) {
    copy = {};
    for (let attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy;
  }
  throw new Error("Unable to copy values!Its type isn't supported.");
};
export function CacheFunction () {
  //私有变量
  let Items = {};

  // 特权方法
  this.getItems = function () {
    return Items;
  };
  this.setItem = function(key,value) {
    Items[key] = value;
  };
  this.getItem = function(key) {
    return Items[key];
  };
  this.removeItem = function(key) {
    delete Items[key];
  }
}
