import TableRowMerge from './table-row-merge'
import TimeLine from './timeline'

const customizeComponent = {
  install (Vue) {
    Vue.component('TableRowMerge', TableRowMerge)
    Vue.component('TimeLine', TimeLine)
  }
}

export default customizeComponent
