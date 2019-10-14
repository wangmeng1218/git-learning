import Vue from 'vue'
import Router from 'vue-router'

/*
重复点击某个菜单项报错，实际上是vue-router 3.1.0的bug，可以加上下面的代码解决，也可以重新安装依赖
重新安装依赖的方法：
  1. 删除node_modules，重新执行npm install
  2. 或者直接执行npm i vue-router@3.0 -S

const originalPush = Router.prototype.push
Router.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err =>err)
}*/
// import HelloWorld from '@/components/HelloWorld'
// import TableRowMerge from '@/view/element-table/table-row-merge-show'
// import RenderLearning from '@/view/render-test/render-learning'
// import AlertTest from '@/view/element-component-test/alertTest'
// import HomePage from '@/view/home-page'
// import LodashUse from '@/view/lodash-test/lodash-use'
Vue.use(Router);

export const createRouter = (routes) => new Router({
  routes
  /*routes: [
    {
      alias: '/',
      path: '/home-page',
      name: 'HomePage',
      component: HomePage,
      redirect: 'alert-test',
      children: [
        {
          path: '/table-row-merge',
          name: 'TableRowMerge',
          component: TableRowMerge
        },
        {
          path: '/render-learning',
          name: 'RenderLearning',
          component: RenderLearning
        },
        {
          path: '/alert-test',
          name: 'AlertTest',
          component: AlertTest
        },
        {
          path:'/lodash-use',
          name: 'LodashUse',
          component: LodashUse
        }
      ]
    }
  ]*/
});
