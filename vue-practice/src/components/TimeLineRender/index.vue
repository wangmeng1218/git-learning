<!--渲染函数嵌套的时候，this指向会发生改变，所以需要往下传递this对象-->
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
      },
      // 节点主键，默认为id
      itemKey: {
        type: String,
        default: 'id'
      },
      // 用于显示的属性名称，默认为label
      itemValue: {
        type: String,
        default: 'label'
      },
      // 子节点属性名称，默认为children
      itemChildren: {
        type: String,
        default: 'children'
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
      // 监听活动主键的变化
      activeId: {
        immediate: true,
        handler (val) {
          // 调用函数 重新获取活动叶子节点、获取活动叶子节点的上级节点集合等
          this.currentIdChanged(val);
        }
      },
      // 监听时间轴数据变化
      lineData: {
        immediate: true,
        deep: true,
        handler (val) {
          // 当数据变化，重新计算各一级节点对应的累计子节点数
          let num = 0;
          this.subNumArr = this.getNodesNumber(val, num);
        }
      }
    },
    // 渲染函数
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
      // 计算一级节点高亮侧边所在高度
      sliderTop () {
        // 如果是第一个一级节点高亮，则高度为0，否则高度为累计节点数（一级节点数+累计子节点数）乘以24
        return this.currentIndex === 0 ? this.currentIndex * 24 + 'px' : (this.currentIndex + this.subNumArr[this.currentIndex - 1]) * 24 + 'px'
      }
    },
    methods: {
      // 获取累计子节点数量
      getNodesNumber(data, num) {
        return data.map(value => {
          if (this.itemChildren in value) {
            num += value[this.itemChildren].length;
            // console.log(num);
            // 递归计算子节点数量，需要对num赋值，否则在getNumber中操作的num无法传递到当前函数
            num = this.getNumber(value[this.itemChildren], num);
            // console.log(num);
          }
          // 返回当前一级节点对应的累计子节点数
          return num;
        });
      },
      // 递归计算子节点数量
      getNumber (data, num) {
        data.map(value => {
          if (this.itemChildren in value) {
            // console.log('进入递归');
            // console.log('前' + num);
            num += value[this.itemChildren].length;
            // console.log('后' + num);
            num = this.getNumber(value[this.itemChildren], num);
          }
        });
        return num;
      },
      // 当活动id改变时触发，时间轴点击事件或者activeId参数变化时调用
      currentIdChanged(id) {
        // 重新查找叶子活动节点
        this.timeLineRefresh(this.lineData, id);
        // 获取活动叶子节点的所有上级节点集合
        this.getParentNodes(this.currentId, this.lineData);
        // 获取所有一级节点
        let parentIdArr = this.lineData.map(item => {
          return item[this.itemKey];
        });
        // 如果活动叶子节点不是一级节点
        if (this.nodes.length !== 0) {
          // 活动一级节点的索引就是 活动叶子节点的最上级节点在 所有一级节点集合中的位置
          this.currentIndex = parentIdArr.indexOf(this.nodes[0]);
        } else {
          // 否则，活动节点就是一级节点，那么活动一级节点的索引就是当前活动节点在一级节点集合中的位置
          this.currentIndex = parentIdArr.indexOf(this.currentId);
        }
      },
      // 时间轴点击事件，event对象，点击的节点主键，点击的节点对象
      itemClicked(event, id, item) {
        // 调用活动节点改变函数，使画面上高亮节点发生变化
        this.currentIdChanged(id);
        // 将点击的节点id及对应的整个节点传给父组件
        this.$emit('click', id, item);
        // 阻止事件冒泡
        event.stopPropagation();
      },
      // 获取给定id的叶子节点
      timeLineRefresh (data, id) {
        // 在当前层查找id
        let flag = data.find(item => {
          return item[this.itemKey] === id;
        });
        // 如果找到，查看当前节点是否是叶子节点
        if (flag) {
          data.forEach((value) => {
            // 找到id对应的一级节点，查看节点下是否还有子节点，如果有 递归查找子节点下的第一个节点，直到找到最终的叶子节点
            if (value[this.itemKey] === id) {
              if (typeof value[this.itemChildren] !== 'undefined' && value[this.itemChildren].length !== 0) {
                this.timeLineRefresh(value[this.itemChildren], value[this.itemChildren][0][this.itemKey]);
              } else {
                this.currentId = id;
              }
            }
          })
        } else { // 没找到，对数据的子节点执行查找函数
          data.forEach((value) => {
            if (typeof value[this.itemChildren] !== 'undefined' && value[this.itemChildren].length !== 0) {
              this.timeLineRefresh(value[this.itemChildren],id);
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
          const children = list[this.itemChildren] || [];
          if (list[this.itemKey] === targetId) {
            this.nodes = his;
            return true;
          } else if (children.length > 0) {
            const history = [...his];
            history.push(list[this.itemKey]);
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
                  _this.itemClicked(event, item[_this.itemKey], item)
                }
              }
            },
            [
              h(
                'a',
                {
                  class: _this.currentId === item[_this.itemKey] ? 'active' : ''
                },
                [
                  item[_this.itemValue]
                ]
              ),
              ..._this.getSubItems(h,item,_this)
            ]
          )
        })
      },
      getSubItems (h, item, _this) {
        if (typeof item[_this.itemChildren] !== 'undefined' && item[_this.itemChildren].length !== 0) {
          return item[_this.itemChildren].map(function(subItem, index){
            return h(
              'div',
              {
                key: index,
                attrs: {
                  class: 'time-line-sub-item'
                },
                on: {
                  click: function(event){
                    _this.itemClicked(event, subItem[_this.itemKey], subItem)
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
              'dot-span-active':_this.nodes.indexOf(item[_this.itemKey]) !== -1 || _this.currentId === item[_this.itemKey],
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
            class: _this.currentId === item[_this.itemKey] && (typeof item[_this.itemChildren] === 'undefined' || item[_this.itemChildren].length === 0) ? 'active' : ''
          },
          item[_this.itemValue]
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
