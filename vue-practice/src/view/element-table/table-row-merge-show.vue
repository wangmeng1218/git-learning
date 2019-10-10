<template>
    <div>
      <!--<table-row-merge ref="TableRowMergeREF" :tableData="tableData" merge-attr="code" :merge-column="mergeColumn" v-model="typeObj">-->
      <el-table
        :data="tableDataSorted"
        :span-method="arraySpanMethod"
        border
        style="width:100%;">
        <el-table-column
          prop="type"
          label="风险分类">
        </el-table-column>
        <el-table-column
          label="水平">
          <template slot-scope="{ row }">
            <el-radio v-model="typeObj[row.code]" :label="row.value">{{row.level}} ({{row.value}})</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          label="风险分类描述"
          prop="describe">
        </el-table-column>
        <el-table-column
          label="理由"
          prop="reason">
        </el-table-column>
      </el-table>
      <!--</table-row-merge>-->
      <el-table
          :data="riskEvaluateData"
          :span-method="arraySpanMethod"
          border
          id="childrenTable">
        <el-table-column
            label="风险评估计算公式">
          <el-table-column
            label="风险评估标准">
            <template slot-scope="{ row }">
              <span v-if="row.rowTitle">{{row.rowTitle}}</span>
              <span v-else>{{row.title}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="RPN=严重性*可能性*可检测性">
          <el-table-column
            label="评估分数">
            <template slot-scope="{ row }">
              <span v-if="typeof row.score !== 'undefined'">{{RPNValue}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="风险优先级">
            <template slot-scope="{ row }">
              <el-radio disabled v-model="riskPriority" :label="row.riskValue">{{row.riskLevel}}</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            label="风险控制措施">
            <template slot-scope="{ row }">
              {{row.controllMethod}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'table-row-merge1',
  data () {
    return {
      tableData: [],
      tableDataSorted: [],
      riskEvaluateData: [],
      mergeAttr: 'type',
      typeObj: {},
      RPNValue: 0,
      riskPriority: 0,
      mergeColumn: [0, 3],
      operatorArr: []
    }
  },
  provide () {
    return {
      testProvideAndInject: this.testProvideAndInject
    }
  },
  watch: {
    typeObj: {
      deep: true,
      handler: function () {
        this.riskPriorityChanged();
      }
    }
  },
  computed: {
  },
  mounted () {
    this.$nextTick(function () {
      this.getInitData();
    })
    console.log('父组件mounted')
  },
  methods: {
    getInitData () {
      this.$Get('getElementTableData').then((res) => {
        this.tableData = res.data.tableData;
        this.riskEvaluateData = res.data.riskEvaluateData;
        this.tableDataSorted = this.dealWithTableData(this.tableData, this.mergeAttr)
        this.checkRiskEvaluateData();
      });
    },
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
    },
    checkRiskEvaluateData () {
      this.riskEvaluateData.forEach(item => {
        let rightPart = '';
        let leftPart = '';
        let hasOperator = false;
        if (item.rightValue && item.rightOperator) {
          rightPart = item.rightOperator + item.rightValue;
          hasOperator = true;
        }
        if (item.leftValue && item.leftValue) {
          leftPart = item.leftValue + item.leftOperator;
          hasOperator = true;
        }
        if (hasOperator) {
          item.rowTitle = leftPart + 'RPN' + rightPart;
          let obj = {
            leftPart: leftPart,
            rightPart: rightPart
          };
          this.operatorArr.push(obj)
        }
      })
    },
    testProvideAndInject () {
      console.log('测试Provide与Inject使用')
    },
    riskPriorityChanged () {
      let value = 1;
      Object.keys(this.typeObj).forEach(item => {
        value *= this.typeObj[item];
      });
      this.RPNValue = value;
      this.operatorArr.forEach((operator, index) => {
        if (eval(operator.leftPart + value) && eval(value + operator.rightPart)) {
          this.riskPriority = index;
        }
      })
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return [3, 1];
        } else if (rowIndex === 1 || rowIndex === 2) {
          return [0, 0];
        }
      }
      if (rowIndex === 3 || rowIndex === 4) {
        if (columnIndex === 1) {
          return [1, 3];
        } else if (columnIndex === 2 || columnIndex === 3) {
          return [0, 0];
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
