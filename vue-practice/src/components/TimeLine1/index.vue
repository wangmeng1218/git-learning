<template>
  <div class="time-line-box">
    <span v-if="currentId !== ''" class="slider" :style="[{top: sliderTop}]"></span>
    <div class="time-line-item" v-for="(item, index) in lineData" :key="index" @click="itemClicked(item.id)">
      <a :class="{'active' : currentId === item.id}">{{item.label}}</a>
      <div v-if="typeof item.children !== 'undefined'">
        <div class="time-line-sub-item" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click.stop="itemClicked(subItem.id)">
          <div style="display:flex;flex-direction: row;">
            <span class="dot-span" :class="{'dot-span-active' : nodes.indexOf(subItem.id) !== -1 || currentId === subItem.id}"></span>
            <a :class="{'active': currentId === subItem.id && (typeof subItem.children === 'undefined' || subItem.children.length === 0)}">{{subItem.label}}</a>
          </div>
          <div class="time-line-grand-item" v-for="(grandItem, grandIndex) in subItem.children" :key="grandIndex" @click.stop="itemClicked(grandItem.id)">
            <!--<span class="dot-span" :class="{'dot-span-active' : currentIndex === index && currentSubIndex === subIndex}"></span>-->
            <a :class="{'active': currentId === grandItem.id}">{{grandItem.label}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline1',
  props: {
    lineData: {
      type: Array,
      required: true
    },
    activeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentId: '',
      nodes: [],
      currentIndex: 0,
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
        console.log(this.subNumArr);
      }
    }
  },
  computed: {
    sliderTop () {
      return this.currentIndex === 0 ? this.currentIndex * 24 + 'px' : (this.currentIndex + this.subNumArr[this.currentIndex - 1]) * 24 + 'px'
    }
  },
  mounted () {
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
    getNumber (data, num) {
      data.map(value => {
        if ('children' in value) {
          // console.log('进入递归');
          // console.log('前' + num);
          num += value.children.length;
          // console.log('后' + num);
          num = this.getNumber(value.children, num);
        }
      })
      return num;
    },
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
    itemClicked(id) {
      this.currentIdChanged(id);
      this.$emit('click', id);
    },
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
    itemClick (index) {
      this.currentIndex = index;
      this.currentSubIndex = 0;
      this.currentGrandIndex = 0;
      this.$emit('click', this.lineData[index].id);
    },
    subItemClick (index, subIndex) {
      this.currentSubIndex = subIndex;
      this.currentIndex = index;
      this.currentGrandIndex = 0;
      this.$emit('click', this.lineData[index].children[subIndex].id)
    },
    grandItemClick(index, subIndex, grandIndex) {
      this.currentGrandIndex = grandIndex;
      this.currentSubIndex = subIndex;
      this.currentIndex = index;
      this.$emit('click', this.lineData[index].children[subIndex].children[grandIndex].id)
    }
  }
}
</script>

<style scoped>
  .time-line-box {
    width: 300px;
    position: relative;
    border-left:4px lightgrey solid;
    box-sizing: border-box;
  }
  .time-line-box>.slider{
    display: inline-block;
    width: 4px;
    height: 24px;
    position: absolute;
    left: -4px;
    background-color: dodgerblue;
  }
  .time-line-item {
    padding: 0 8px;
    color: #000;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 24px;
    cursor: pointer;
  }
  .time-line-item .active {
    color: dodgerblue;
  }
  .time-line-sub-item .active{
    color: dodgerblue;
  }
  .time-line-sub-item {
    display: flex;
    flex-direction: column;
    line-height: 24px;
    padding-left: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
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
  .time-line-grand-item{
    line-height: 24px;
    padding-left: 20px;
  }
</style>
