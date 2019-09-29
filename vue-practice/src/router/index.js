import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TableRowMerge from '@/view/element-table/table-row-merge-show'
import RenderTest from '@/view/render-test/index'
import RenderLearning from '@/view/render-test/render-learning'
import AlertTest from '@/view/element-component-test/alertTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableRowMerge',
      component: TableRowMerge
    },
    {
      path: '/render-test',
      name: 'RenderTest',
      component: RenderTest
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
    }
  ]
})
