<template>
    <div>
      <vxe-grid
        border
        stripe
        height="650"
        keep-source
        :columns="tableColumn"
        :data.sync="tableData"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true, icon: 'fa fa-file-text-o'}"></vxe-grid>
    </div>
</template>

<script>
  export default {
    name: "grid-only",
    data () {
      return {
        tableColumn: [
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
            title: 'table.title.name',
            field: 'name',
            editRender: { name: 'input' }
          },
          {
            title: 'table.title.age',
            field: 'age',
            editRender: { name: '$select',options: [{value: '23',label: '23岁'},{value: '24',label: '24岁'}]},
            filters: [{label: '2', value: '2'}, {label: '23', value: '23'}]
          }
        ],
        tableData: [
          {
            name: 'levi',
            age: '24'
          },
          {
            name: 'huahua',
            age: '2'
          }
        ]
      }
    },
    methods: {
      childClick () {
        console.log('childClick');
      }
    }
  }
</script>

<style scoped>

</style>
