import localforage from 'localforage'

let getItem = async function(key) {
  return await localforage.getItem(key);
};
let setItem = function(key, value) {
  localforage.setItem(key, value);
};
let clearCache = function() {
  localforage.clear();
};
let removeItem = function(key) {
  localforage.removeItem(key);
};
const LocalCacheUtil = {
  getItem: getItem,
  setItem: setItem,
  clearCache: clearCache,
  removeItem: removeItem
};

window.$Cache = null;
window.$Cache = LocalCacheUtil;

export default LocalCacheUtil;
