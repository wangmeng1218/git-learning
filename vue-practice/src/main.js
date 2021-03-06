// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import the component
import Treeselect from './treeSelect'
// import the styles
import './treeSelect/vue-treeselect.css'
import i18n from './i18n'


import 'element-ui/lib/theme-chalk/index.css'
//阿里矢量图标
import './assets/icon/iconfont.css'
import App from './App'
import Notification from './components/notification'

import notificationVue from './components/notification/notification';
import Loading from './components/Loading/loading-content';
import tableSelect from './view/dialog-component/tableSelect';
import Register from './components/dialogRegister';
Register(Loading);
Register(notificationVue);
Register(tableSelect);

import './vxeTable/index'
/**
 * 创建动态路由
 */
import { createRouter } from './router/index'
/**
 * 自定义方法库，包括一些简单的方法，比如深度拷贝、时间转换等
 */
import Utils from './utils/utils'
/**
 * 自定义组件
 */
import customizeComponent from './components'
/**
 * HTTP请求工具，使用axios封装
 */
import {get,post} from './utils/request'
// 引入vuex状态管理，页面刷新后数据会丢失，但是响应式的，数据的变化会反映到视图上
import store from './store'
/**
 * 本地缓存工具，使用localforage插件，页面刷新依然存在。
 * 底层使用indexedDB、web sql和localStorage。
 * 优先使用indexedDB，若浏览器不支持indexedDB则使用web Sql；
 * 若不支持web Sql则使用localStorage
 */
import './utils/localCacheUtil'

import { CacheFunction,Cache } from  './utils/cache';
Vue.prototype.$Cache = Cache;

Vue.config.productionTip = false;

// 判断是否需要mock挡板数据
if(process.env.MOCK_DATA){
  require('./mock')
}

// 将工具方法对象挂在到Vue实例上
Vue.prototype.$Utils = Utils;
// 将Get请求对象挂在到Vue实例上
Vue.prototype.$Get = get;
// 将Post请求对象挂在到Vue实例上
Vue.prototype.$Post = post;



// 全局使用ElementUI
Vue.use(ElementUI);

Vue.use(Notification);
// 全局使用自定义组件
Vue.use(customizeComponent, {
  contentId: 'page-content'
});
Vue.component('TreeSelect', Treeselect)
/* eslint-disable no-new */
let router = createRouter([], store);
/**
* 初始化new Vue创建Vue实例
* 通过$mount挂载组件
* [指定el===$mount(el)]
* $mount调用编译器，把编写的模板编译成render函数
* 得到渲染函数
* 生成虚拟dom
* patch将虚拟dom转换成真实dom
* */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
// 相当于
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// });
