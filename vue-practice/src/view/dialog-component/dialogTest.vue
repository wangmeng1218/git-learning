<template>
    <div style="width:100%;height:100%;position: relative;" ref="FULLPAGE">
      <el-button @click="showLoading">showLoading</el-button>
      <el-button @click="showTable">showTable</el-button>
      <div style="width:100%;height:calc(100% - 40px);position: relative;" ref="mountNode"></div>

    </div>
</template>

<script>
  import { LOAD_ROOT_OPTIONS } from '@riophae/vue-treeselect';
  export default {
    name: "dialog-test",
    data () {
      return {
        hide: ''
      }
    },
    methods: {
      getCheckedKeys () {
        console.log(this.$refs.ElementTree.getCheckedKeys());
      },
      showLoading () {
        this.$LoadingContent.show({
          mountNode:this.$refs.mountNode,
          testData: '2342342',
          on: {
            confirm: this.confirmMethod
          }
        });
      },
      showTable () {
        this.$tableSelect.show({
          mountNode:this.$refs.mountNode,
          on: {
            confirm: this.confirmMethod,
            close: this.closeMethod
          }
        });
      },
      confirmMethod (data1, data2, hide) {
        console.log(data1);
        console.log(data2);
        hide();
      },
      closeMethod (hide) {
        console.log('closeMethod');
        hide();
      }
    }
  }
</script>

<style scoped>

</style>
