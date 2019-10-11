export default {
  getMenus: () => {
    return {
      menusData: [
        {
          name: '组件使用测试',
          children: [
            {
              name: 'JSONP跨域'
            },
            {
              name: '表格行列合并'
            }
          ]
        },
        {
          name: 'Vue',
          children:[
            {
              name: '渲染函数'
            }
          ]
        },
        {
          name: 'Lodash',
          children: [
            {
              name: 'Lodash方法测试'
            }
          ]
        }
      ]
    }
  }
}
