<template>
    <div style="width:100%;height:100%;position: relative;" ref="mountNode">
      <el-button @click="showLoading">showLoading</el-button>
      <el-button @click="shownotification">shownotification</el-button>
      <el-button @click="showTable">showTable</el-button>
    </div>
</template>

<script>
  export default {
    name: "dialog-test",
    methods: {
      shownotification () {
        this.$notification.show({
          content: '提示信息'
        },function (data) {
          console.log('loadingData' + data);
        });
      },
      showLoading () {
        this.$LoadingContent.show({
          mountNode:this.$refs.mountNode,
          testData: '2342342'
        },function (data) {
          console.log('loadingData' + data);
        });
      },
      showTable () {
        this.$tableSelect.show({
          mountNode:this.$refs.mountNode
        },function(data){
          console.log(data);
        })
      }
    }
  }
</script>

<style scoped>

</style>
