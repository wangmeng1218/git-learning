export default {
  getMenus: () => {
    return {
      routerData: [
        {
          path: '/table-row-merge',
          name: 'TableRowMerge'
        },
        {
          path: '/render-learning',
          name: 'RenderLearning'
        },
        {
          path: '/alert-test',
          name: 'AlertTest'
        },
        {
          path:'/lodash-use',
          name: 'LodashUse'
        },
        {
          path:'/localforage-test',
          name: 'LocalforageTest'
        },
        {
          path: '/render-start',
          name: 'RenderStart'
        },
        {
          path: '/time-line-test',
          name: 'TimeLineTest'
        },
        {
          path: '/dynamic-component',
          name: 'DynamicComponent'
        },
        {
          path: '/closure',
          name: 'Closure'
        },
        {
          path: '/css-basic',
          name: 'CssBasic'
        }
      ],
      menuData: [
        {
          name: 'CSS',
          index: '1',
          icon: '',
          children: [
            {
              name: 'Css基础测试',
              index: 'css-basic'
            }
          ]
        },
        {
          name: '闭包',
          index: '2',
          icon: 'el-icon-magic-stick',
          children: [
            {
              name: '闭包测试',
              index: 'closure'
            }
          ]
        },
        {
          name: '组件使用测试',
          index: '3',
          icon: 'el-icon-eleme',
          children: [
            {
              name: 'JSONP跨域',
              index: 'alert-test'
            },
            {
              name: '表格行列合并',
              index: 'table-row-merge'
            },
            {
              name: '时间轴组件测试',
              index: 'time-line-test'
            },
            {
              name: '动态组件',
              index: 'dynamic-component'
            }
          ]
        },
        {
          name: 'Vue',
          index: '4',
          icon: 'el-icon-thumb',
          children: [
            {
              name: '渲染函数',
              index: 'render-learning'
            },
            {
              name: '三级时间轴测试',
              index: 'render-start'
            }
          ]
        },
        {
          name: '工具测试',
          index: '5',
          icon: 'el-icon-help',
          children: [
            {
              name: 'Lodash方法测试',
              index: 'lodash-use'
            },
            {
              name: 'Localforage使用测试',
              index: 'localforage-test'
            }
          ]
        }
      ]
    }
  }
}
