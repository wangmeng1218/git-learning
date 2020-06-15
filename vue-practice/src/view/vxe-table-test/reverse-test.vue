<template>
  <div>
    <!--<vxe-grid ref='xGrid' v-bind="gridOptions"></vxe-grid>-->
    <vxe-table
      border
      ref="vxeTableREF"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :cell-render="{ name: 'MyLink' }"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" formatter="formatSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>
    <el-button type="primary" @click="getTableData">获取表格数据</el-button>
  </div>
</template>

<script>
  import XEAjax from 'xe-ajax'
  export default {
    name: 'reverse-test',
    data () {
      return {
        tableData: [
          {
            name: '123',
            sex: '1',
            age: '24',
          },
          {
            name: '2222',
            sex: '0',
            age: '25',
          }
        ],
        gridOptions: {
          border: true,
          resizable: true,
          showHeaderOverflow: true,
          showOverflow: true,
          highlightHoverRow: true,
          keepSource: true,
          id: 'full_edit_1',
          height: 600,
          rowId: 'id',
          customConfig: {
            storage: true,
            checkMethod: this.checkColumnMethod
          },
          sortConfig: {
            trigger: 'cell'
          },
          filterConfig: {
            remote: true
          },
          pagerConfig: {
            pageSize: 10,
            pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
          },
          proxyConfig: {
            seq: true, // 启用动态序号代理
            sort: true, // 启用排序代理
            filter: true, // 启用筛选代理
            form: true, // 启用表单代理
            ajax: {
              // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
              query: ({page, sort, filters, form}) => {
                // 处理排序条件
                const queryParams = Object.assign({
                  sort: sort.property,
                  order: sort.order
                }, form)
                // 处理筛选条件
                filters.forEach(({property, values}) => {
                  queryParams[property] = values.join(',')
                })
                return XEAjax.get(`https://api.xuliangzhan.com:10443/api/user/page/list/${page.pageSize}/${page.currentPage}`, queryParams).then(data => {
                  // 在 vue 数据绑定之前对原始数据进行动态定义属性（风险提示：如果数据已被 vue 监听过则不能使用该方式）
                  // data.result.forEach(item => {
                  //   item.checked = false // 该属性对应 checkbox.checkField 值，保证大数据量的复选框渲染非常流畅，当然如果是少量数据就没什么意义了，差别不大
                  // })
                  return data
                })
              },
              delete: ({body}) => XEAjax.post('https://api.xuliangzhan.com:10443/api/user/save', body),
              save: ({body}) => XEAjax.post('https://api.xuliangzhan.com:10443/api/user/save', body)
            }
          },
          columns: [
            {type: 'checkbox', title: 'ID', width: 120},
            {field: 'name', title: 'Name', remoteSort: true, editRender: {name: '$input'}},
            {
              field: 'role',
              title: 'Role',
              remoteSort: true,
              filters: [
                {label: '前端开发', value: '前端'},
                {label: '后端开发', value: '后端'},
                {label: '测试', value: '测试'},
                {label: '程序员鼓励师', value: '程序员鼓励师'}
              ],
              filterMultiple: false,
              editRender: {name: '$input'}
            },
            {field: 'nickname', title: 'Nickname', editRender: {name: '$input'}},
            {field: 'sex', title: 'Sex', editRender: {name: '$select', options: []}},
            {
              field: 'age',
              title: 'Age',
              remoteSort: true,
              editRender: {name: '$input', props: {type: 'number', min: 1, max: 120}}
            },
            {
              field: 'amount',
              title: 'Amount',
              formatter: this.formatAmount,
              editRender: {name: '$input', props: {type: 'float', digits: 2}}
            },
            {
              field: 'updateDate',
              title: 'Update Date',
              width: 160,
              visible: false,
              remoteSort: true,
              formatter: this.formatDate
            },
            {
              field: 'createDate',
              title: 'Create Date',
              width: 160,
              visible: false,
              remoteSort: true,
              formatter: this.formatDate
            }
          ],
          checkboxConfig: {
            // checkField: 'checked',
            labelField: 'id',
            reserve: true,
            highlight: true,
            range: true
          }
        }
      }
    },
    methods: {
      sexFormatter ({ cellValue }) {
        return cellValue === '1' ? '男' : '女';
      },
      getTableData () {
        console.log(this.$refs['vxeTableREF'].getTableData());
      }
    }
  }
</script>
