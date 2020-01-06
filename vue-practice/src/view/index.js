import TableRowMerge from '@/view/element-table/table-row-merge-show'
import TimeLineTest from '@/view/element-component-test/timeLineTest'
import RenderLearning from '@/view/render-test/render-learning'
import RenderStart from '@/view/render-test/render-start'
import AlertTest from '@/view/element-component-test/alertTest'
import HomePage from '@/view/home-page'
import LodashUse from '@/view/lodash-test/lodash-use'
import LocalforageTest from '@/view/localforage-test/localforage-test'
import DynamicComponent from '@/view/element-component-test/dynamicComponent'
import Closure from '@/view/closure/closure'

const routerContext = require.context('./',true,/[a-zA-z\-]*\.vue$/);
// console.log('require.context.keys()结果');
// console.log(routerContext.keys());

let routes = {
  TableRowMerge,
  RenderLearning,
  AlertTest,
  HomePage,
  LodashUse,
  LocalforageTest,
  RenderStart,
  TimeLineTest,
  DynamicComponent,
  Closure
}

export default routes;
