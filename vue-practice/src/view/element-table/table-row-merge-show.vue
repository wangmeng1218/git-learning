<template>
    <div>
      <table-row-merge id="ppp" :tableData="tableData" merge-attr="code" :merge-column="mergeColumn" v-model="typeObj">
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
      </table-row-merge>
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
      tableData: [{
        type: '严重性',
        code: 'serious',
        level: '低',
        value: '1',
        describe: '对产品质量或患者安全无影响',
        reason: '文本'
      }, {
        type: '严重性',
        code: 'serious',
        level: '中',
        value: '2',
        describe: '对产品质量或患者安全有影响',
        reason: '文本'
      }, {
        type: '严重性',
        code: 'serious',
        level: '高',
        value: '3',
        describe: '对产品质量或患者安全有严重影响',
        reason: '文本'
      }, {
        type: '可能性',
        code: 'possible',
        level: '低',
        value: '1',
        describe: '发生的可能性极低或无',
        reason: '文本'
      }, {
        type: '可能性',
        code: 'possible',
        level: '中',
        value: '2',
        describe: '存在发生的可能性',
        reason: '文本'
      }, {
        type: '可能性',
        code: 'possible',
        level: '高',
        value: '3',
        describe: '发生的可能性较高',
        reason: '文本'
      }, {
        type: '可检测性',
        code: 'checkable',
        level: '低',
        value: '3',
        describe: '非常难以检测到',
        reason: '文本'
      }, {
        type: '可检测性',
        code: 'checkable',
        level: '中',
        value: '2',
        describe: '可以检测到',
        reason: '文本'
      }, {
        type: '可检测性',
        code: 'checkable',
        level: '高',
        value: '1',
        describe: '极易检测到',
        reason: '文本'
      }],
      riskEvaluateData: [{
        rightValue: '4',
        rightOperator: '<=',
        title: '',
        score: '根据选项自动计算优先级与标准自动选择',
        riskLevel: '低',
        riskValue: 0,
        controllMethod: '按常规流程可人工录入及可在系统中配置选项进行选择'
      }, {
        leftValue: '4',
        leftOperator: '<',
        rightValue: '8',
        rightOperator: '<=',
        title: '',
        score: '根据选项自动计算优先级与标准自动选择',
        riskLevel: '中',
        riskValue: 1,
        controllMethod: '适当行动，2周内通知高层'
      }, {
        leftValue: '8',
        leftOperator: '<',
        title: '',
        score: '根据选项自动计算优先级与标准自动选择',
        riskLevel: '高',
        riskValue: 2,
        controllMethod: '立即行动，通知高层'
      }, {
        title: '评估结论'
      }, {
        title: '备注'
      }],
      typeObj: {},
      RPNValue: 0,
      riskPriority: 0,
      mergeColumn: [0, 3],
      operatorArr: []
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
  },
  created () {
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
  methods: {
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
