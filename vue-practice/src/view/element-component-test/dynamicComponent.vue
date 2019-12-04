<template>
  <div class="page-container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <template v-for="(item, index) in columns">
        <el-table-column v-if="item.temObj" :key="index" v-bind="item">
          <template slot-scope="scope">
            <component :is="item.temObj" v-bind="scope"></component>
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="item" :key="index">
        </el-table-column>
      </template>
    </el-table>
    <!--<notification :ss="str" content="test notification"></notification>-->
    <button @click="notify">click me</button>
  </div>
</template>

<script>
  export default {
    name: "dynamic-component",
    data () {
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
        columns: [
          {
            prop: 'date',
            label: '日期',
            width: '100'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '100'
          },
          {
            prop: 'address',
            label: '地址',
            width: '100',
            temObj: {
              props: ['row', '$index'],
              template: '<span style="color: #2d8cf0;">{{ row.address }}</span>'
            }
          }
        ],
        num: 0
      }
    },
    created () {},
    mounted () {},
    methods: {
      notify () {
        this.num ++;
        this.$notify({
          content: `test notify ${this.num}`,
          btn: 'close'
        });
      }
    }
  }
</script>

<style scoped>
  .page-container {
    width: 50%;
    margin: 20px auto;
  }
</style>
