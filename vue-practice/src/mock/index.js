import Mock from 'mockjs'
import elementTableData from './elementTableData'
import menusData from './menusData'
// element表格合并数据
Mock.mock(/getElementTableData/, 'get', elementTableData.getElementTableData);

// 获取菜单项
Mock.mock(/getMenus/,'get',menusData.getMenus)

export default Mock
