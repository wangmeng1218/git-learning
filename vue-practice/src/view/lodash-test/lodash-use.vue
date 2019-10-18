<template>
  <div>
    <h1>原数组{{testArrSource}}</h1>
    <span>执行_.chunk(arr,2)方法后</span>
    <h1>目标数组{{testArrCp}}</h1>
  </div>
</template>

<script>
  let _ = require('lodash');
  export default {
    name: "lodash-use",
    data (){
      return {
        testArr: [1,2,3,4,5]
      }
    },
    created () {},
    computed: {
      testArrSource () {
        return JSON.stringify(this.testArr);
      },
      testArrCp () {
        return JSON.stringify(_.chunk(this.testArr,2));
      }
    },
    mounted () {},
    methods:{}
  }
</script>

<style scoped>

</style>
