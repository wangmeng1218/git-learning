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
        },
        {
          path: '/rsa-encrypt',
          name: 'RSAEncrypt'
        },
        {
          path: '/base64-encrypt',
          name: 'Base64Encrypt'
        },
        {
          path: '/dialog-test',
          name: 'DialogTest'
        },
        {
          path: '/table-test',
          name: 'TableTest'
        },
        {
          path: '/grid-test',
          name: 'GridTest'
        },
        {
          path: '/grid-only',
          name: 'GridOnly'
        },
        {
          path: '/element-style',
          name: 'ElementStyle'
        },
        {
          path: '/select-test',
          name: 'VueTreeSelectPage'
        }
      ],
      menuData: [
        {
          name: '组件使用测试',
          index: '1',
          icon: '',
          children: [
            {
              name: '树形选择组件',
              index: 'select-test'
            },
            {
              name: '按需引入高级表格',
              index: 'grid-only'
            },
            {
              name: '表格',
              index: 'table-test'
            },
            {
              name: '高级表格',
              index: 'grid-test'
            }
          ]
        },
        {
          name: '弹窗式组件',
          index: '2',
          icon: '',
          children: [
            {
              name: '弹窗式组件测试',
              index: 'dialog-test'
            }
          ]
        },
        {
          name: '加解密',
          index: '3',
          icon: '',
          children: [
            {
              name: 'RSA非对称加密',
              index: 'rsa-encrypt'
            },
            {
              name: 'base64加密',
              index: 'base64-encrypt'
            }
          ]
        },
        {
          name: 'CSS',
          index: '4',
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
          index: '5',
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
          index: '6',
          icon: 'el-icon-eleme',
          children: [
            {
              name: '修改组件样式',
              index: 'element-style'
            },
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
          index: '7',
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
          index: '8',
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
