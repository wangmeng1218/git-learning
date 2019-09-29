
<script>
  import throttle from 'throttle-debounce/throttle';
  export default {
    name: "render-learning",
    data() {
      return {
        lineData: [{
          id: 'div1',
          label: '调查实施',
          children: [
            {
              id: 'div1children1',
              label: '子条目1'
            }
          ]
        }, {
          id: 'div2',
          label: 'CAPA发起',
          children: [
            {
              id: 'div2children1',
              label: '子条目1'
            }
          ]
        }, {
          id: 'div3',
          label: '确定调查目标',
          children: [
            {
              id: 'div3children1',
              label: '子条目1'
            },
            {
              id: 'div3children2',
              label: '子条目2'
            },
            {
              id: 'div3children3',
              label: '子条目3'
            }
          ]
        }, {
          id: 'div4',
          label: '根本原因分析',
          children: []
        }, {
          id: 'div5',
          label: '影响性评估',
          children: [
            {
              id: 'div5children1',
              label: '子条目1'
            },
            {
              id: 'div5children2',
              label: '子条目2'
            },
            {
              id: 'div5children3',
              label: '子条目3'
            }
          ]
        }],
        tableHeightArr: [],
        activeIndex: 0,
        subIndex: 0
      }
    },
    computed: {},
    watch: {},
    render: function (h) {
      let tableList = this.getTables(h)
      let timeLine = this.getTimeLine(h)
      let refreshBtn = this.getRefreshBtn(h)
      let backBtn = this.getBackBtn(h)
      return h(
        'div',
        [
          h(
            'div',
            {
              attrs: {
                class: 'page-container',
                id: 'pageContainer',
                ref: 'pageBox'
              }
            },
            [
              h(
                'div',
                [
                  ...tableList
                ]
              ),
              h(
                'div',
                {
                  attrs: {
                    style: 'position:fixed;top: 150px;right: 50px;'
                  }
                },
                [
                  backBtn,
                  refreshBtn,
                  timeLine
                ]
              )
            ]
          )
        ]
      )
    },
    mounted () {
      this.$nextTick(() => {
        // 正文总高度
        let scrollHeight = document.getElementById('pageContainer').scrollHeight
        this.tableHeightArr = []
        this.lineData.forEach((data, index) => {
          let childrenInfoArr = []
          data.children.forEach((children, subIndex) => {
            let heightObj = {
              id: children.id,
              heightRate: index === 0 && subIndex === 0 ? 0 : document.getElementById(children.id).offsetTop / scrollHeight
            }
            childrenInfoArr.push(heightObj)
          })
          console.log(childrenInfoArr)
          let heightObj = {
            id: data.id,
            heightRate: index === 0 ? 0 : document.getElementById(data.id).offsetTop / scrollHeight,
            children: childrenInfoArr
          }
          this.tableHeightArr.push(heightObj)
        })
        this.throttledScrollHandler = throttle(300, this.dynamicHeight);
        // 监听容器滚动条滚动事件,点击时间轴通过srollTop定位时，也会触发，时间轴高亮元素闪烁出错
        // document.getElementById('pageContainer').onscroll = this.dynamicHeight;
        // document.getElementById('pageContainer').addEventListener('scroll', this.throttledScrollHandler)
        // 监听鼠标滚动事件,已废弃
        // document.getElementById('pageContainer').onmousewheel = this.dynamicHeight;
        // 监听鼠标滚动事件
        document.getElementById('pageContainer').addEventListener('wheel', this.throttledScrollHandler);
      })
    },
    methods: {
      dynamicHeight (event) {
        // console.log(event)
        this.$nextTick(() => {
          // 可滚动高度
          let heightCanScroll = document.getElementById('pageContainer').scrollHeight - document.getElementById('pageContainer').clientHeight
          // 已经滚动的距离
          let heightHadScroll = document.getElementById('pageContainer').scrollTop
          // 占比
          let scrollRate = heightHadScroll / heightCanScroll
          this.tableHeightArr.forEach((value, index) => {
            if (scrollRate >= value.heightRate) {
              if (index < this.tableHeightArr.length - 1) {
                if (scrollRate < this.tableHeightArr[index + 1].heightRate) {
                  this.activeIndex = index
                }
              } else {
                this.activeIndex = index
              }
            }
            value.children.forEach((children, subIndex) => {
              if (scrollRate >= children.heightRate) {
                if (index < value.children.length - 1) {
                  if (scrollRate < value.children[subIndex + 1].heightRate) {
                    this.subIndex = subIndex
                  }
                } else {
                  this.subIndex = subIndex
                }
              }
            })
          })
          // console.log(scrollRate)
        })
      },
      getTables (h) {
        let tableList = []
        this.lineData.forEach((data,index) => {
          let childrenArr = []
          if (typeof data.children !== 'undefined' && data.children.length !== 0) {
            childrenArr = this.getChildrenTables(h, data.children)
          }
          let ele = h(
            'div',
            {
              style: {
                height: (index + 1) * 150 + 'px'
              },
              attrs: {
                id: data.id,
                style: 'width: 85%;box-sizing:border-box;padding-left:5%;padding-top:10px;background-color:grey;margin-bottom: 10px;'
              }
            },
            [
              ...childrenArr
            ]
          )
          tableList.push(ele)
        })
        return tableList
      },
      getChildrenTables (h, data) {
        let tableArr = []
        data.forEach((value, index) => {
          let ele = h(
            'div',
            {
              style: {
                height: (index + 1) * 60 + 'px'
              },
              attrs: {
                id: value.id,
                style: 'width: 90%;background-color:green;margin-bottom: 10px;'
              }
            }
          )
          tableArr.push(ele)
        })
        return tableArr
      },
      getTimeLine (h) {
        return h(
         'TimeLine',
          {
            props: {
              lineData: this.lineData,
              activeIndex: this.activeIndex,
              subActiveIndex: this.subIndex
            },
            on: {
              click: (id) => {
                this.anchorLocation(id)
              }
            }
          }
        )
      },
      getRefreshBtn (h) {
        return h(
          'el-button',
          {
            props: {
              plain: true
            },
            attrs: {
              style: 'position:fixed;top: 80px;right: 100px;',
              icon: 'el-icon-refresh-right',
              type: 'primary'
            }
          },
          [
            '刷新'
          ]
        )
      },
      getBackBtn (h) {
        return h(
          'el-button',
          {
            props: {
              plain: true
            },
            attrs: {
              style: 'position:fixed;top: 30px;right: 100px;',
              icon: 'el-icon-back',
              type: 'primary'
            },
            on: {
              click: () => {
                // this.$router.push('/')
              }
            }
          },
          [
            '返回'
          ]
        )
      },
      anchorLocation (id) {
        // console.log(id)
        let offsetTop = document.getElementById(id).offsetTop
        if (offsetTop === 20) {
          offsetTop = 10
        }
        this.$nextTick(() => {
          document.getElementById('pageContainer').scrollTop = offsetTop - 10
          // document.getElementById('pageContainer').addEventListener('scroll', this.dynamicHeight)
          // console.log(document.getElementById('pageContainer').scrollTop)
        })
      }
    }
  }
</script>

<style scoped>
  .page-container{
    height: 100vh;
    box-sizing: border-box;
    padding: 10px 150px 10px 10px;
    background-color: whitesmoke;
    overflow-y: auto;
    scroll-behavior: smooth;
  }
</style>
