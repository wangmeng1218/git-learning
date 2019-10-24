import TableRowMerge from '@/view/element-table/table-row-merge-show'
import RenderLearning from '@/view/render-test/render-learning'
import RenderStart from '@/view/render-test/render-start'
import AlertTest from '@/view/element-component-test/alertTest'
import HomePage from '@/view/home-page'
import LodashUse from '@/view/lodash-test/lodash-use'
import LocalforageTest from '@/view/localforage-test/localforage-test'

const routerContext = require.context('./',true,/[a-zA-z\-]*\.vue$/);
console.log('require.context.keys()结果');
console.log(routerContext.keys());

let routes = {
  TableRowMerge,
  RenderLearning,
  AlertTest,
  HomePage,
  LodashUse,
  LocalforageTest,
  RenderStart
}

export default routes;
