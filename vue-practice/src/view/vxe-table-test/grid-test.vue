<template>
  <div>
    <vxe-select v-model="$i18n.locale">
      <vxe-option value="zh_CN" label="简体中文"></vxe-option>
      <vxe-option value="zh_TC" label="繁體中文"></vxe-option>
      <vxe-option value="en_US" label="英文"></vxe-option>
    </vxe-select>
    <vxe-grid
      ref="GRIDRef"
      border
      stripe
      resizable
      height="650"
      :loading="tableLoading"
      :columns="tableColumn"
      :data.sync="tableData"
      :params="childrenParams"
      :pager-config="pagerConfig"
      @page-change="handlePageChange"
      :edit-config="editConfig"
      :toolbar="tableToolbar"
      :context-menu="tableMenu"
      @context-menu-click="handleContextMenuClick">
      <!--<template v-slot:expand_content="{ row,rowIndex,column,columnIndex }">-->
        <!--<span>{{row}}</span><br/>-->
        <!--<span>{{rowIndex}}</span>-->
      <!--</template>-->
      <template v-slot:operate_column="{ row,rowIndex,column,columnIndex }">
        <el-row>
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="editRow(row)"></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini" type="info" icon="el-icon-message" circle></el-button>
        </el-row>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
  export default {
    name: "grid-test",
    data () {
      return {
        tableMenu: {
          body: {
            options: [
              [
                { code: 'copy', name: '复制内容', prefixIcon: 'fa fa-copy', visible: true, disabled: false },
                { code: 'clear', name: '清除内容', visible: true, disabled: false },
                { code: 'reload', name: '刷新表格', visible: true, disabled: false }
              ]
            ]
          }
        },
        tableLoading: false,
        tableToolbar: {
          buttons: [
            { code: 'insert_actived', name: '新增' }
          ],
          zoom: true,
          custom: true,
          refresh: {
            query: this.queryTableData
          }
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showIcon: true,
          autoClear: true
        },
        pagerConfig: {
          total: 200,
          currentPage: 1,
          pageSize: 10,
          align: 'center',
          pageSizes: [10, 20, 50, 100, 200, 500],
          layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
          perfect: true
        },
        childrenParams: {
          columnData: [],
          interface: ''
        },
        childColumn: [
          {
            title: '姓名',
            field: 'name'
          },
          {
            title: '年龄',
            field: 'age'
          }
        ],
        childData: [
          {
            name: 'levi',
            age: '24'
          },
          {
            name: 'huahua',
            age: '2'
          }
        ],
        tableColumn: [
          //{ type: 'expand', width: 60 , slots: {content: this.expandTable}},
          // { type: 'expand', width: 60 , slots: {content: 'expand_content'}},
          {
            type: 'expand',
            width: 60 ,
            contentRender:
              {
                name: 'MyExpand',
                props:
                  {
                    columns: [
                      {
                        title: '姓名',
                        field: 'name'
                      },
                      {
                        title: '年龄',
                        field: 'age'
                      }
                    ],
                    data: [
                      {
                        name: 'levi',
                        age: '24'
                      },
                      {
                        name: 'huahua',
                        age: '2'
                      }
                    ]
                  },
                  attrs: {
                    width: '60',
                    border: true,
                    strip: true
                  },
                  events: {
                    cellClick: this.childClick
                  }
              }
          },
          {
            title: '基本信息',
            children: [
              { field: 'name', title: 'table.title.name',editRender: {name: '$input'}},
              { field: 'sex', title: 'table.title.sex' }
            ]
          },
          {
            title: '详细信息',
            children: [
              { field: 'time', title: 'Time',editRender: {name: '$input'} },
              { field: 'date', title: 'Date' }
            ]
          },
          { field: 'operate', title: '操作', slots: {default: 'operate_column'}}
        ],
        tableData: [],
        allAlign: null,
        tableData1: [
          {
            name: '123',
            sex: '1',
            age: '24',
            address: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'er',
            sex: '1',
            age: '34',
            address: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'fdg',
            sex: '0',
            age: '23',
            address: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          },
          {
            name: 'dfg',
            sex: '1',
            age: '25',
            address: 'find() 用于找出第一个符合条件的数组成员，参数是一个回调函数'
          }
        ]
      }
    },
    created () {
      let list = [];
      for(let index = 0; index < 20; index++){
        list.push({
          id: index + 10000,
          checked: false,
          name: 'test' + index,
          role: 'developer',
          sex: 'Man',
          date: '2019-05-01',
          time: 1556677810888 + index * 500,
          region: 'ShenZhen',
          address: 'address abc' + index
        })
      }
      this.tableData = list;
      this.tableLoading = true;
      let self = this;
      setTimeout(function(){
        self.tableLoading = false;
      },3000);
    },
    methods: {
      handleContextMenuClick ({ menu, type, row, rowIndex, column, columnIndex, $event }) {
        console.log(menu);
        switch(menu.code) {
          case 'copy':
            console.log('copy');
            break;
          case 'clear':
            console.log('clear');
            break;
          case 'reload':
            this.queryTableData();
            break;
        }
      },
      queryTableData () {
        this.tableLoading = true;
        let self = this;
        setTimeout(function(){
          self.tableLoading = false;
        },1000);
      },
      handlePageChange ({ type, currentPage, pageSize }) {
        this.pagerConfig.currentPage = currentPage;
        this.pagerConfig.pageSize = pageSize;
        this.queryTableData();
      },
      editRow (row) {
        // this.$refs['GRIDRef'].readFile({
        //   types: ['html','xml','txt']
        // }).then(res => {
        //   console.log(res);
        // });
        this.$XModal.alert({message: 'info提示框',status: 'info', resize: true});
      },
      childClick ({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {
        console.log('childClick');
        console.log(row);
      },
      expandTable({row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, h) {
        return h(
          'vxe-table',
          {
            props: {
              align: this.allAlign,
              data: this.tableData1
            },
            attrs: {
              border: true
            }
          },
          [
            h(
              'vxe-table-column',
              {
                attrs:{
                  title: '序号',
                  type: 'seq',
                  width: '60'
                }
              }
            ),
            h(
              'vxe-table-column',
              {
                attrs: {
                  field: 'name',
                  title: 'Name'
                }
              }
            ),
            h(
              'vxe-table-column',
              {
                attrs: {
                  field: 'sex',
                  title: 'Sex'
                }
              }
            ),
            h(
              'vxe-table-column',
              {
                attrs: {
                  field: 'age',
                  title: 'Age'
                }
              }
            ),
            h(
              'vxe-table-column',
              {
                attrs: {
                  field: 'address',
                  title: 'Address'
                }
              }
            )
          ]
        );
      }
    }
  }
</script>

<style scoped>

</style>
