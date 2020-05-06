<template>
    <div>
      <TableComponent :data="tableData" :columns="columns" :pager="pager" size="medium" :needSeq="true"></TableComponent>
    </div>
</template>

<script>
  import TableComponent from './table-component';
  export default {
    name: "table-test",
    components: { TableComponent },
    data() {
      return {
        pager: {
          currentPage: 1,
          pageSize: 10,
          totalResult: 200
        },
        tableData: [
          {
            name: '123',
            sex: '1',
            age: '24',
            hobby: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'er',
            sex: '1',
            age: '34',
            hobby: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'fdg',
            sex: '0',
            age: '23',
            hobby: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'dfg',
            sex: '1',
            age: '25',
            hobby: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          }
        ],
        columns: [
          {
            title: '基本信息',
            fixed: 'left',
            children: [
              {
                type: 'seq',
                width: '80',
                title: '序号'
              },
              {
                field: 'name',
                title: '姓名不隐藏不隐藏不隐藏不隐藏不隐藏不隐藏不隐藏不隐藏',
                width: '300'
              }
            ]
          },
          {
            field: 'age',
            title: '年龄隐藏隐藏隐藏隐藏隐藏隐藏隐藏隐藏隐藏',
            sortable: true,
            filters: [
              {
                value: '23',
                label: '23岁'
              },
              {
                value: '25',
                label: '25岁'
              }
            ],
            showHeaderOverflow: true,
            width: '400'
          },
          {
            field: 'sex',
            title: '性别',
            filters: [
              {
                value: '0',
                label: '男'
              },
              {
                value: '1',
                label: '女'
              }
            ],
            width: '400'
          },
          {
            field: 'hobby',
            title: '爱好',
            showOverflow: true,
            width: '400'
          }
        ]
      }
    },
    watch: {
      pager: {
        deep: true,
        handler (val) {
          console.log(val);
        }
      }
    },
    mounted () {
      console.log(this.$XEUtils);
    }
  }
</script>

<style scoped>

</style>
