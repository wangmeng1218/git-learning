<template>
  <div class="time-line-box">
    <span v-if="currentIndex !== -1" class="slider" :style="[{top: sliderTop}]"></span>
    <div class="time-line-item" v-for="(item, index) in lineData" :key="index" @click="itemClick(index)">
      <a :class="{'active' : currentIndex === index && item.children.length === 0}">{{item.label}}</a>
      <div class="time-line-sub-item" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click.stop="subItemClick(index, subIndex)">
        <span class="dot-span" :class="{'dot-span-active' : currentIndex === index && currentSubIndex === subIndex}"></span>
        <a :class="{'active': currentIndex === index && currentSubIndex === subIndex}">{{subItem.label}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    lineData: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    subActiveIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentIndex: 0,
      currentSubIndex: 0
    }
  },
  watch: {
    activeIndex: {
      immediate: true,
      handler (val) {
        this.currentIndex = val
      }
    },
    subActiveIndex: {
      immediate: true,
      handler (val) {
        this.currentSubIndex = val
      }
    }
  },
  computed: {
    sliderTop () {
      let num = 0
      let subNumArr = this.lineData.map(value => {
        num += value.children.length
        return num
      })
      return this.currentIndex === 0 ? this.currentIndex * 24 + 'px' : (this.currentIndex + subNumArr[this.currentIndex - 1]) * 24 + 'px'
      // return this.currentIndex * 24 + 'px'
    }
  },
  methods: {
    itemClick (index, ...subs) {
      this.currentIndex = index
      if (subs.length === 0) {
        this.currentSubIndex = 0
        this.$emit('click', this.lineData[index].id)
      } else {
        this.$emit('click', this.lineData[index].children[subs[0]].id)
      }
    },
    subItemClick (index, subIndex) {
      this.currentSubIndex = subIndex
      if (index !== this.currentIndex) {
        this.itemClick(index, subIndex)
      } else {
        this.$emit('click', this.lineData[index].children[subIndex].id)
      }
    }
  }
}
</script>

<style scoped>
  .time-line-box {
    width: 150px;
    position: relative;
    border-left:4px lightgrey solid;
    box-sizing: border-box;
  }
  .time-line-box .slider{
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
    flex-direction: row;
    line-height: 24px;
    padding-left: 15px;
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
</style>
