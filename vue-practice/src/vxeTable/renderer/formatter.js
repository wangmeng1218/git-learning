import VXETable from 'vxe-table'
VXETable.formats.mixin({
  // 格式化性别
  formatSex({cellValue}) {
    return cellValue ? (cellValue === '1' ? '男' : '女') : ''
  },
  SexFormatter({ cellValue }) {
    return cellValue === 'Man' ? '男' : '女';
  }
});
