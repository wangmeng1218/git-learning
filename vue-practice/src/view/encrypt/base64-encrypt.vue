<template>
  <div>
    <el-col>
      <el-card>
        <span>加密前：{{beforeEncrypt}}</span>
      </el-card>
      <el-card>
        <span>加密后： {{afterEncrypt}}</span>
      </el-card>
      <el-card>
        <span>解密后： {{afterDecrypt}}</span>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "base64-encrypt",
    data () {
      return {
        beforeEncrypt: '鬼灭之刃',
        afterEncrypt: '',
        afterDecrypt: ''
      }
    },
    mounted () {
      let Base64 = require('js-base64').Base64;
      this.afterEncrypt = Base64.encode(this.beforeEncrypt);
      this.afterDecrypt = Base64.decode(this.afterEncrypt);
      this.$Cache.setItem('string','鬼灭之刃');
      this.$Cache.setItem('arr',[1,3,4]);
      this.$Cache.setItem('obj',{name: 'levi'});
      this.$Cache.getItems()['test'] = '啦啦啦';
      console.log(this.$Cache.getItems());
      // this.$Cache.removeItem('obj');
      console.log(this.$Cache.getItems());
      // this.$Cache.removeItem('test');
    },
    methods: {}
  }
</script>

<style scoped>
  span {
    display: inline-block;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
  }
</style>
