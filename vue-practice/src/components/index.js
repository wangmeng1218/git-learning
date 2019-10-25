import TableRowMerge from './table-row-merge'
import TimeLine from './timeline'
import TimeLine1 from './timeline1'
import TimeLineRender from './timelinerender'

const customizeComponent = {
  install (Vue) {
    Vue.component('TableRowMerge', TableRowMerge)
    Vue.component('TimeLine', TimeLine)
    Vue.component('TimeLine1', TimeLine1)
    Vue.component('TimeLineRender', TimeLineRender)
  }
}

export default customizeComponent
