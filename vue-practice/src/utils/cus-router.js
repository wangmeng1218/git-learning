import Vue from 'vue'
class CusRouter {
  constructor(options){
    this.$options = options;
    this.routerMap = {};

    this.app = new Vue({
      data: {
        current: '/'
      }
    });
  }
  init(){
    // 监听路由变化
    this.bindEvent();
    // 映射路由与组件关系
    this.createRouterMap(this.$options);
    // 实现router-link和router-view组件
    this.initComponent();
  }
  bindEvent () {
    window.addEventListener('load',this.onHashChange().bind(this))
    window.addEventListener('hashchange', this.onHashChange().bind(this))
  }
  onHashChange () {
    this.app.current = window.location.hash.slice(1) || '/';
  }
  createRouterMap (options) {
    options.forEach(item => {
      this.routerMap[item.path] = item.component;
    });
  }
  initComponent () {
    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          required: true
        }
      },
      render (h) {
        return h('a',{attrs:{href:'#' + this.to}},[this.$slots.default])
      }
    });
    Vue.component('router-view', {
      render: h => {
        const comp = this.routerMap[this.app.current];
        return h(comp)
      }
    });
  }
}
// 要使router成为插件，需要实现install方法
CusRouter.install = funtion(_Vue)
{
  // 混入
  _Vue.mixin({
    beforeCreate () {
      // $options中有router的，只有根节点，即main.js中创建的Vue实例，因此下面代码只执行一次
      // 但执行完，所有Vue实例都可以通过this.$router获取到router对象
      if (this.$options.router) {
        _Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  })
}
