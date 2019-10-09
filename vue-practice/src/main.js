// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Utils from './utils/utils'
import customizeComponent from './components'
Vue.config.productionTip = false
import {get,post} from './utils/request'

Vue.prototype.$Utils = Utils
Vue.prototype.$Get = get
Vue.prototype.$Post = post
// 全局使用ElementUI
Vue.use(ElementUI)
Vue.use(customizeComponent)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
