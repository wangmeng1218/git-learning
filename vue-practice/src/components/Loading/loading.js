// 引入组件
import loading from './loading-vue';
//引入Vue
import Vue from 'vue';
//创建一个‘子类’
const Loading = Vue.extend(loading);

let instance;
export default {
  show(){
    console.log('show');
    //如果Vue实例不存在，则创建Vue实例并将它挂载到一个div上
    if (!instance){
      instance = new Loading({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    // 将div添加到body中
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
  },
  hide(){
    if (instance) {
      Vue.nextTick(() => {
        instance.visible = false;
      });
    }
  }
}
