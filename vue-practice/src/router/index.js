import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TableRowMerge from '@/view/element-table/table-row-merge-show'
import RenderLearning from '@/view/render-test/render-learning'
import AlertTest from '@/view/element-component-test/alertTest'
import HomePage from '@/view/home-page'
import LodashUse from '@/view/lodash-test/lodash-use'

Vue.use(Router)

export default new Router({
  routes: [
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
  ]
})
