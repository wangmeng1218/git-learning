//引入遮罩层
import ShadowFrame from './shadow-frame';
//引入Vue
import Vue from 'vue';
const register = function (component) {
  //创建组件的构造方法
  const Loading = Vue.extend(ShadowFrame);
  //保存组件实例
  let instance;
  //保存挂载点
  let RootNode;
  //全局添加弹窗组件
  Vue.prototype['$' + component.name] = {
    show(options,cb){
      //解构出挂载节点和其他数据，其他数据作为组件的props
      let { mountNode, ...rest } = options;
      // 创建组件实例
      instance = new Loading({
        // propsData: options
      }).$mount();
      if (instance.visible) return;
      // 如果未提供挂载点，使用body
      RootNode = mountNode ? mountNode : document.body;
      // 将组件实例挂载到指定节点上
      RootNode.appendChild(instance.$el);
      Vue.nextTick(() => {
        //组件赋值
        instance.componentName = component;
        //传递组件props
        instance.componentProps = rest;
        //显示
        instance.visible = true;
        //监听组件中的confirm事件，通过回调将数据传递出去并销毁组件实例
        instance.$on('confirm', (data) => {
          cb(data);
          this.hide();
        });
        //监听组件的close事件，销毁组件实例
        instance.$on('close', () => {
          this.hide();
        });
      });
    },
    //隐藏销毁组件实例
    hide(){
      if (instance) {
        Vue.nextTick(() => {
          //设置组件不可见
          instance.visible = false;
          //移除组件实例
          RootNode.removeChild(instance.$el);
          //销毁组件实例
          instance.$destroy();
        });
      }
    }
  }
};

export default register;
