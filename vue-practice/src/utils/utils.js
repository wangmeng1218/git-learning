// 利用Set中没有重复元素的特性，为数组和字符串去重
const removal = function(val){
  if(Object.prototype.toString.call(val) === '[object String]'){
    return [...new Set(val)].join('');
  }else if(Object.prototype.toString.call(val) === '[object Array]'){
    return [...new Set(val)];
  }
};

/**
 *
 *data表示要整理的数据，格式为[{属性1:值1,属性2:值2,....}]
 *attr为分类的属性
 *
 *例如：原数据 data = [{type:'a',name:'兵长',code:'111'},{type:'a',name:'银时',code:'222'},{type:'b',name:'绿谷出久',code:'333'},{type:'c',name:'艾伦',code:'444'},{type:'a',name:'三笠',code:'555'},{type:'b',name:'太宰治',code:'666'}]
 *
 *调用方法dealWithTableData (data,'type')
 *
 *返回数据：[{type:'a',allData:[{type:'a',name:'兵长',code:'111'},{type:'a',name:'银时',code:'222'},{type:'a',name:'三笠',code:'555'}]},{type:'b',allData:[{type:'b',name:'绿谷出久',code:'333'},{type:'b',name:'太宰治',code:'666'}]},{type:'c',allData:[{type:'c',name:'艾伦',code:'444'}]}]
 *
 **/
const dealWithTableData  = function(data, attr) {
  let typeArr = [];
  let dataArr = [];
  data.forEach(element => {
    if (typeArr.indexOf(element[attr]) === -1) {
      typeArr.push(element[attr]);
      dataArr.push({
        [attr]: element[attr],
        allData: [element]
      });
    } else {
      dataArr.forEach(value => {
        if (value[attr] === element[attr]) {
          value.allData.push(element);
        }
      })
    }
  });
  return resultArr;
};


/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
const triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
const triggerClick = function(elm, ...opts) {
  triggerEvent(elm, 'mousedown', ...opts);
  triggerEvent(elm, 'mouseup', ...opts);

  return elm
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
const triggerKeyDown = function(el, keyCode) {
  const evt = document.createEvent('Events');
  evt.initEvent('keydown', true, true);
  evt.keyCode = keyCode;
  el.dispatchEvent(evt)
};

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
const formatRemainTime = function(endTime) {
  let startDate = new Date(); // 开始时间
  let endDate = new Date(endTime); // 结束时间
  let t = endDate.getTime() - startDate.getTime(); // 时间差
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }
  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
};

/**
 *
 *格式化startTime距现在的已过时间
 *
 **/
const formatPassTime = function(startTime){
  let currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);
  if (year) return year + "年前";
  if (month) return month + "个月前";
  if (day) return day + "天前";
  if (hour) return hour + "小时前";
  if (min) return min + "分钟前";
  else return '刚刚';
};

/**
 *判断对象是否为空
 *
 *是空对象则返回true,否则返回false(包含不是空对象和不是对象的两种情况)
 *
 *首先判断 传入的参数是否是对象，不是对象直接返回false
 *
 *如果传入的参数是对象，通过Object.keys()获取对象属性数组的长度，如果长度为0，表示改对象是空对象
 *
 */
const isEmptyObject = function(obj){
  if(!obj || typeof obj !== 'object' || Array.isArray(obj)){
    return false;
  }
  return !Object.keys(obj).length;
};

/**
 *
 * @desc 判断两个数组是否严格相等，数组中的内容以及顺序均相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 *
 */
const arrStrictEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if(arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

/**
 *
 * @desc 判断两个数组是否相同，数组中的内容相等即可
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 *
 */
const arrEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if(arr2.indexOf(arr1[i]) === -1) {
      return false;
    }
  }
  return true;
};

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

/**
 *
 *生成指定范围随机数
 *
 *Math.random()返回0 ~ 1之间的一个随机数
 *
 *Math.floor(x) 返回小于或等于指定数字的最大整数的数字
 *
 */
const randomNum = function(min,max){
  return Math.floor(min + Math.random() * (max - min));
};

/**
 *判断是否为邮箱地址
 *
 */
const isEmail = function(str){
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
};

/**
 *
 *判断是否为身份证号
 *
 */
const isIdCard = function(str){
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
};

/**
 *
 *判断是否为手机号
 *
 */
const isPhoneNum = function(str){
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
};

/**
 *
 *判断是否为URL地址
 *
 */
const isUrl = function(str){
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&// =]*)/i.test(str);
};

const addDelUpdateClassify = function (initialData, endData) {
  /*描述：一组数据，进行增删改操作后，将增加的数据放入addArr中，将删除的数据放到deleteArr中
  *将修改（或者没有变化）的数据放入updateArr中
  *假设code为每条数据的唯一标识
  *假设initialData为初始数据
  * endData为最终完成增删改操作的数据
  */
  let addArr = [];
  let deleteArr = [];
  let updateArr = [];
  // 遍历新数据，在旧数据中找新数据中的每条数据
  // 找的则意味着这条数据是旧数据中已有的，放入updateArr中；
  // 找不到则意味着这条数据在旧数据中没有，是新添加的，放到addArr中
  endData.forEach(end => {
    let flag = initialData.find(init => {
      return end.code === init.code;
    });
    if (flag) {
      // 将数据转换为字符串进行比较，如果不同则表示数据变化了，放入updateArr中；
      // 这一步根据需求可以省略，直接放入updateArr中也可以
      initialData.forEach(init => {
        if (end.code === init.code){
          if (JSON.stringify(end) !== JSON.stringify(init)) {
            updateArr.push(end);
          }
        }
      })
    } else {
      addArr.push(end);
    }
  });
// 遍历旧数据，在新数据中找旧数据中的每条数据
// 找到则表示这条数据在新旧中都有，上面的操作中已经将这样的数据放入到updateArr中了，所以不需要再次执行
// 找不到则表示，这条数据在旧数据中存在，但在新数据中不存在，所以是被删除的数据，放入deleteArr中
  initialData.forEach(init => {
    let flag = endData.find(end => {
      return init.code === end.code;
    });
    if (!flag) {
      deleteArr.push(init);
    }
  });
  return {
    addArr: addArr,
    deleteArr: deleteArr,
    updateArr: updateArr
  }
};

// 判断是否是字符串
const isString = function(val){
  return Object.prototype.toString.call(val).slice(8,-1) === 'String';
};

// 判断是否是数字
const isNumber = function (val) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Number';
};

//  判断是否是boolean
const isBoolean = function (val) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean';
};

// 判断是否是函数
const isFunction = function (val) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Function';
};

// 判断是否为null
const isNull = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Null';
};

// 判断是否是undefined
const isUndefined = function(val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Undefined';
};

// 判断是否是对象
const isObj = function(val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
};

// 判断是否是数组
const isArray = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Array';
};

// 判断是否是时间
const isDate = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Date';
};

// 判断是否是正则
const isRegExp = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'RegExp';
};

// 判断是否是错误对象
const isError = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Error';
};

// 判断是否是Symbol函数
const isSymbol = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Symbol';
};

// 判断是否是Promise对象
const isPromise = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Promise';
};

// 判断是否是Set对象
const isSet = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Set';
};

// 判断是否是false,包括字符串格式的null,undefined,false,NaN
const isFalse = function (val) {
  if(!val || val === 'null' || val === 'undefined' || val === 'false' || val === 'NaN') {
    return true;
  }
  return false
};

// 判断是否是true
const isTrue = function (val) {
  return !this.isFalse(val);
};

export default {
  removal, // 简单数组与字符串去重
  dealWithTableData, // 根据属性对对象数组分类
  triggerEvent, // 代码触发一个事件
  triggerClick, // 代码触发mouseup和mousedown事件
  triggerKeyDown, // 代码触发keydown事件
  formatRemainTime, // 格式化现在距${endTime}的剩余时间
  formatPassTime, // 格式化startTime距现在的已过时间
  isEmptyObject, // 判断对象是否为空
  arrStrictEqual, // 判断两个数组是否严格相等
  arrEqual, // 判断两个数组是否相同
  deepClone, // 深拷贝，支持常见类型
  randomNum, // 生成指定范围随机数
  isEmail, // 判断是否为邮箱地址
  isIdCard, // 判断是否为身份证号
  isPhoneNum, // 判断是否为手机号
  isUrl, // 判断是否为URL地址
  addDelUpdateClassify,  // 增删改数据分类,
  isString, // 判断是否是字符串
  isNumber, // 判断是否是数字
  isBoolean, // 判断是否是boolean
  isFunction, // 判断是否是函数
  isNull, //判读是否为null
  isUndefined, //判断是否是undefined
  isObj, // 判断是否是对象
  isArray, // 判断是否是数组
  isDate, // 判断是否是时间
  isRegExp, // 判断是否是正则
  isError, // 判断是否是错误对象
  isSymbol, // 判断是否是Symbol函数
  isPromise, // 判断是否是Promise对象
  isSet, // 判断是否是Set对象
  isFalse, // 判断是否是false,包括字符串格式的null,undefined,false,NaN
  isTrue, // 判断是否是true
};
