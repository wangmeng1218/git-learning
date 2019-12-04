<template>
  <div>
    <el-table
      :data="tableDataSorted"
      :span-method="arraySpanMethod"
      border
      style="width:100%;">
      <!--使用该组件时，假如父组件给出了slot='column'的插槽，则显示下面内容，否则不显示-->
      <slot name="column" v-if="$slots.column"></slot>
    </el-table>
  </div>
</template>

<script>
// 测试混入mixin使用
import mixin from '../../mixins/mixin'
export default {
  name: 'table-row-merge',
  mixins: [mixin],
  inject: ['testProvideAndInject'],
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
    console.log('子组件mounted')
    console.log(this.$slots)
    this.testMixin()
    this.testProvideAndInject()
    console.log(this.$parent)
    console.log(this.$Utils.isEmail('2687804440@qq.com'))
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
        console.log(this.$attrs)
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
      console.log(classifyObj)
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
      console.log(typeObj)
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
