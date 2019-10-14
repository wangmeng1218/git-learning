// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import { createRouter } from './router/index'
import Utils from './utils/utils'
import customizeComponent from './components'
Vue.config.productionTip = false
import {get,post} from './utils/request'
import store from './store'
if(process.env.MOCK_DATA){
  require('./mock')
}

Vue.prototype.$Utils = Utils
Vue.prototype.$Get = get
Vue.prototype.$Post = post
// 全局使用ElementUI
Vue.use(ElementUI)
Vue.use(customizeComponent)
/* eslint-disable no-new */
let router = createRouter([]);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
