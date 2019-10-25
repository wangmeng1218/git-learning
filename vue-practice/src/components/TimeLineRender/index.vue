
<script>
  export default {
    name: "time-line-render",
    props: {
      // 时间轴数据
      lineData: {
        type: Array,
        required: true
      },
      // 当前活动的id
      activeId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // 需要高亮的叶子节点id
        currentId: '',
        // 高亮的叶子节点 的所有父节点id集合
        nodes: [],
        // 第一层数据 当前高亮的index
        currentIndex: 0,
        // 保存累计子节点数量的数组
        subNumArr: []
      }
    },
    watch: {
      activeId: {
        immediate: true,
        handler (val) {
          this.currentIdChanged(val);
        }
      },
      lineData: {
        immediate: true,
        deep: true,
        handler (val) {
          let num = 0;
          this.subNumArr = this.getNodesNumber(val, num);
        }
      }
    },
    render: function (h){
      let componentsArr = [];
      let firstSpan = this.getFirstSpan(h);
      let timeLineItem = this.getTimeLineItem(h);
      if (firstSpan) {
        componentsArr.push(firstSpan)
      }
      componentsArr.push(timeLineItem)
      return h(
        'div',
        {
          attrs: {
            class: 'time-line-box'
          }
        },
        [
          ...componentsArr
        ]
      )
    },
    computed: {
      sliderTop () {
        return this.currentIndex === 0 ? this.currentIndex * 24 + 'px' : (this.currentIndex + this.subNumArr[this.currentIndex - 1]) * 24 + 'px'
      }
    },
    methods: {
      getNodesNumber(data, num) {
        return data.map(value => {
          if ('children' in value) {
            num += value.children.length;
            // console.log(num);
            num = this.getNumber(value.children, num);
            // console.log(num);
          }
          return num;
        });
      },
      // 递归计算子节点数量
      getNumber (data, num) {
        data.map(value => {
          if ('children' in value) {
            // console.log('进入递归');
            // console.log('前' + num);
            num += value.children.length;
            // console.log('后' + num);
            num = this.getNumber(value.children, num);
          }
        });
        return num;
      },
      // 当活动id改变时触发，时间轴点击事件或者activeId参数变化时调用
      currentIdChanged(id) {
        this.timeLineRefresh(this.lineData, id);
        this.getParentNodes(this.currentId, this.lineData);
        let parentIdArr = this.lineData.map(item => {
          return item.id;
        });
        if (parentIdArr.indexOf(this.nodes[0]) !== -1) {
          this.currentIndex = parentIdArr.indexOf(this.nodes[0]);
        } else {
          this.currentIndex = parentIdArr.indexOf(this.currentId);
        }
      },
      // 时间轴点击事件
      itemClicked(event, id, item) {
        this.currentIdChanged(id);
        this.$emit('click', id, item);
        event.stopPropagation();
      },
      // 获取给定id的叶子节点
      timeLineRefresh (data, id) {
        // 在当前层查找id
        let flag = data.find(item => {
          return item.id === id;
        });
        // 如果找到，查看当前节点是否是叶子节点
        if (flag) {
          data.forEach((value) => {
            if (value.id === id) {
              if (typeof value.children !== 'undefined' && value.children.length !== 0) {
                this.timeLineRefresh(value.children, value.children[0].id);
              } else {
                this.currentId = id;
              }
            }
          })
        } else { // 没找到，对数据的子节点执行查找函数
          data.forEach((value) => {
            if (typeof value.children !== 'undefined' && value.children.length !== 0) {
              this.timeLineRefresh(value.children,id);
            }
          })
        }
      },
      // 获取给定id和数据的所有上级节点的id集合
      getParentNodes(id, tree) {
        this._getParentNodes([], id, tree);
        return this.nodes;
      },
      _getParentNodes(his, targetId, tree) {
        tree.some((list) => {
          const children = list.children || [];
          if (list.id === targetId) {
            this.nodes = his;
            return true;
          } else if (children.length > 0) {
            const history = [...his];
            history.push(list.id);
            return this._getParentNodes(history, targetId, children);
          }
        })
      },
      getFirstSpan (h) {
        if (this.currentId !== '') {
          return h(
            'span',
            {
              style: {
                top: this.sliderTop
              },
              attrs: {
                class: 'slider'
              }
            }
          )
        } else {
          return false;
        }
      },
      getTimeLineItem (h) {
        let _this = this;
        return this.lineData.map(function(item, index) {
          return h(
            'div',
            {
              key: index,
              attrs: {
                class: 'time-line-item'
              },
              on: {
                click: function(event){
                  _this.itemClicked(event, item.id, item)
                }
              }
            },
            [
              h(
                'a',
                {
                  class: _this.currentId === item.id ? 'active' : ''
                },
                [
                  item.label
                ]
              ),
              ..._this.getSubItems(h,item,_this)
            ]
          )
        })
      },
      getSubItems (h, item, _this) {
        if (typeof item.children !== 'undefined' && item.children.length !== 0) {
          return item.children.map(function(subItem, index){
            return h(
              'div',
              {
                key: index,
                attrs: {
                  class: 'time-line-sub-item'
                },
                on: {
                  click: function(event){
                    _this.itemClicked(event, subItem.id, subItem)
                  }
                }
              },
              [
                h(
                  'div',
                  {
                    attrs: {
                      class: 'flex-row'
                    }
                  },
                  [
                    ..._this.getSubLabels(h, subItem, _this)
                  ]
                ),
                ..._this.getSubItems(h, subItem, _this)
              ]
            )
          })
        } else {
          return [];
        }
      },
      getSubLabels (h, item, _this) {
        let arr = [];
        let span = _this.getSubSpans(h, item, _this);
        let a = _this.getSubA(h, item, _this);
        if (span) {
          // arr.push(span);
        }
        arr.push(a);
        return arr;
      },
      getSubSpans (h, item, _this) {
        return h(
          'span',
          {
            'class': {
              'dot-span-active':_this.nodes.indexOf(item.id) !== -1 || _this.currentId === item.id,
              'dot-span': true
            }
          },
          []
        )
        /*if (typeof item.children !== 'undefined') {

        } else {
          return false;
        }*/
      },
      getSubA (h, item, _this) {
        return h(
          'a',
          {
            class: _this.currentId === item.id && (typeof item.children === 'undefined' || item.children.length === 0) ? 'active' : ''
          },
          item.label
        )
      }
    }
  }
</script>

<style scoped>
  .time-line-box {
    width: 300px;
    position: relative;
    border-left:1px solid #a2a9b6;
    margin-left: 20px;
    /*box-sizing: border-box;*/
    font-size: 14px;
  }
  .time-line-box>.slider{
    content: ' ';
    display: inline-block;
    position: absolute;
    width: 4px;
    height: 24px;
    background-color: #2d8cf0;
    left: -2px;
    top: 0;
    transition: top .2s ease-in-out;
  }
  .time-line-item {
    padding: 0 8px;
    color: #515a6e;
    transition: opacity .2s;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
    cursor: pointer;
  }
  .time-line-item .active {
    color: #2d8cf0;
  }
  .time-line-sub-item {
    display: flex;
    flex-direction: column;
    line-height: 24px;
    padding-left: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .time-line-sub-item .active{
    color: #2d8cf0;
  }
  a {
    padding: 0 10px;
    letter-spacing: 1px;
    display: block;
    text-decoration:none;
  }
  .dot-span {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #666666;
    border-radius: 5px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .dot-span-active {
    background-color: dodgerblue;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
</style>
