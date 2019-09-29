<template>
  <div>
    <el-table
      :data="tableDataSorted"
      :span-method="arraySpanMethod"
      border
      style="width:100%;">
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'table-row-merge',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 需要合并的属性，默认合并type属性
    mergeAttr: {
      type: String,
      default: 'type'
    },
    // 定义 对第几列的行数据进行合并
    mergeColumn: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
  },
  data () {
    return {
      tableDataSorted: [...this.tableData]
    }
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler () {
        this.tableDataSorted = this.dealWithTableData(this.tableDataSorted, this.mergeAttr)
      }
    }
  },
  methods: {
    dealWithTableData (data, attr) {
      let typeObj = {}
      let classifyObj = {}
      let resultArr = []
      data.forEach(element => {
        if (!typeObj.hasOwnProperty(element[attr])) {
          typeObj[element[attr]] = 0
          classifyObj[element[attr]] = [element]
        } else {
          classifyObj[element[attr]].push(element)
        }
      })
      Object.keys(classifyObj).forEach(classifyAttr => {
        let length = classifyObj[classifyAttr].length
        classifyObj[classifyAttr].forEach((item, index) => {
          if (index === 0) {
            resultArr.push({
              ...item,
              rowSpan: length
            })
          } else {
            resultArr.push(item)
          }
        })
      })
      this.$emit('input', typeObj)
      return resultArr
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (this.mergeColumn.indexOf(columnIndex) !== -1) {
        if (row.rowSpan !== 'undefined') {
          return [row.rowSpan, 1]
        } else {
          return [0, 0]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
