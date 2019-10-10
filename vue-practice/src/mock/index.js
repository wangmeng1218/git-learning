import Mock from 'mockjs'
import elementTableData from './elementTableData'

// element表格合并数据
Mock.mock(/getElementTableData/, 'get', elementTableData.getElementTableData);
export default Mock
