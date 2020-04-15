import Notification from './notification'
import notify from './function'
// install方法，传入Vue对象，将组件添加到对象中
export default (Vue) => {
  Vue.component(Notification.name, Notification);
  Vue.prototype.$notify = notify
}
