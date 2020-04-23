<template>
  <div style="background-color: #fff;width: 600px;">
    <el-table
      :data="tableData"
      highlight-current-row
      @selection-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;margin-bottom: 20px;">
      <el-button @click="handleConfirm">确定</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tableSelect",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
      }
    },
    methods: {
      handleConfirm () {
        this.$emit('confirm', this.currentRow);
      },
      handleCancel () {
        this.$emit('close');
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>

<style scoped>

</style>
