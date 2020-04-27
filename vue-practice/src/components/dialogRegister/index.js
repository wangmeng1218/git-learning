//引入遮罩层
import ShadowFrame from './shadow-frame';
//引入Vue
import Vue from 'vue';
const register = function (component) {
  //创建组件的构造方法
  const Shadow = Vue.extend(ShadowFrame);
  //全局添加弹窗组件
  Vue.prototype['$' + component.name] = {
    show(options){
      //解构出挂载节点和其他数据，其他数据作为组件的props
      let { mountNode,on, ...rest } = options;
      // 获取挂载节点，如果未提供挂载点，使用body
      const RootNode = mountNode ? mountNode : document.body;
      //事件监听器
      let listeners = {};
      Object.keys(on).forEach(key => {
        listeners[key] = (...data) => {
          on[key](...data, () => {
            this.hide(instance, RootNode);
          });
        };
      });
      if (!on.close) {
        //添加默认 关闭事件监听
        listeners.close = () => {
          this.hide(instance, RootNode);
        };
      }
      // 创建组件实例
      const instance = new Shadow({
        propsData: {
          //组件
          componentName: component,
          //props
          componentProps: rest,
          //监听器
          componentListeners: listeners
        }
      }).$mount();
      if (instance.visible) return;
      // 将组件实例挂载到指定节点上
      RootNode.appendChild(instance.$el);
      Vue.nextTick(() => {
        //显示
        instance.visible = true;
      });
    },
    //隐藏销毁组件实例
    hide(instance, RootNode){
      if (instance && instance.visible && instance.$el) {
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
