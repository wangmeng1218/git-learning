import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table/lib/index.css'
import 'vxe-table-plugin-element/dist/style.css'
import Vue from 'vue';
import i18n from "../i18n";
import './renderer/default'
import './renderer/formatter'
import './renderer/content'

VXETable.use(VXETablePluginElement)

Vue.use(VXETable,{
  translate: key => i18n.t(key),
  //集成vue-i18n
  i18n: key => i18n.t(key)
});
//给vue实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal;
Vue.prototype.$XEUtils = XEUtils;
