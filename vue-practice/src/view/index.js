import TableRowMerge from '@/view/element-table/table-row-merge-show'
import RenderLearning from '@/view/render-test/render-learning'
import AlertTest from '@/view/element-component-test/alertTest'
import HomePage from '@/view/home-page'
import LodashUse from '@/view/lodash-test/lodash-use'

const routerContext = require.context('./',true,/[a-zA-z\-]*\.vue$/);
console.log('require.context.keys()结果');
console.log(routerContext.keys());

let routes = {
  TableRowMerge,
  RenderLearning,
  AlertTest,
  HomePage,
  LodashUse
}

export default routes;
