<template>
    <div class="content-center">
      <h1 class="loading-text">{{loadingData}}</h1>
      <el-button type="primary" @click="closeLoading">关闭</el-button>
    </div>
</template>

<script>
  export default {
    name: "LoadingContent",
    props: {
      testData: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        loadingData: '加载中。。。。'
      }
    },
    mounted () {
      console.log('测试数据' + this.testData);
    },
    methods: {
      closeLoading () {
        this.$emit('close', this.loadingData);
      }
    }
  }
</script>

<style scoped>
  .loading-text {
    color: greenyellow;
  }
  .content-center {
    width:300px;
    height:200px;
    background-color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
