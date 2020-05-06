<template>
    <div>
      <vxe-table
        stripe
        border
        resizable
        :data="data"
        :align="align"
        highlight-hover-row
        highlight-current-row
        highlight-current-column
        :size="size"
        :tooltip-config="tooltipConfig"
        class="mytable-style"
        :cell-class-name="cellClassName"
        @cell-click="cellClickEvent">
        <vxe-table-column type="expand" fixed="left"></vxe-table-column>
        <vxe-table-column
          v-for="(item,index) in columns"
          :key="index"
          v-bind="item">
          <vxe-table-column
            v-if="item.children"
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            v-bind="child">
          </vxe-table-column>
        </vxe-table-column>
      </vxe-table>
      <vxe-pager
        :size="size"
        v-if="pager"
        background
        :current-page.sync="pager.currentPage"
        :page-size.sync="pager.pageSize"
        :total="pager.totalResult"
        :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </div>
</template>

<script>
  export default {
    name: "table-component",
    props: {
      data: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      needSeq: Boolean,
      align: {
        type: String,
        default: 'left'
      },
      size: {
        type: String,
        default: 'medium'
      },
      pager: {
        type: Object
      }
    },
    data () {
      return {
        tooltipConfig: {
          enterable: true
        },
        selectRow: null,
        selectColumn: null
      }
    },
    methods: {
      cellClassName ({ row, column }) {
        if (row === this.selectRow & column === this.selectColumn) {
          return 'col-orange'
        }
      },
      cellClickEvent ({ row, column }) {
        console.log(row);
        this.selectRow = row;
        this.selectColumn = column;
      }
    }
  }
</script>

<style lang="stylus">
  .mytable-style.vxe-table .vxe-body--column.col-orange {
    background-color: #f60;
    color: #fff;
  }
</style>
