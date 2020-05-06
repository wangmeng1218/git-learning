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
import CssBasic from '@/view/css-learning/css-basic'
import RSAEncrypt from '@/view/encrypt/rsa-encrypt'
import Base64Encrypt from '@/view/encrypt/base64-encrypt'
import DialogTest from '@/view/dialog-component/dialogTest'
import TableTest from '@/view/vxe-table-test/table-test'
import GridTest from '@/view/vxe-table-test/grid-test'
import GridOnly from '@/view/vxe-table-test/grid-only'
// const routerContext = require.context('./',true,/[a-zA-z\-]*\.vue$/);
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
  Closure,
  CssBasic,
  RSAEncrypt,
  Base64Encrypt,
  DialogTest,
  TableTest,
  GridTest,
  GridOnly
};

export default routes;
