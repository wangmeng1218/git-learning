import TableRowMerge from './table-row-merge'
import TimeLine from './timeline'
import TimeLine1 from './timeline1'
import TimeLineRender from './timelinerender'
import CusInput from './Form/CusInput'
import CusFormItem from './Form/FormItem'
import CusForm from './Form/Form'
import ExcelTable from './exceltable'
import DynamicForm from './DynamicForm'

const customizeComponent = {
  install (Vue) {
    Vue.component('TableRowMerge', TableRowMerge)
    Vue.component('TimeLine', TimeLine)
    Vue.component('TimeLine1', TimeLine1)
    Vue.component('TimeLineRender', TimeLineRender)
    Vue.component('CusInput', CusInput)
    Vue.component('CusFormItem', CusFormItem)
    Vue.component('CusForm', CusForm),
    Vue.component('ExcelTable', ExcelTable),
    Vue.component('DynamicForm', DynamicForm)
  }
}

export default customizeComponent
