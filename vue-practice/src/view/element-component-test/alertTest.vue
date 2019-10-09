<template>
    <div id="pageContainer" @mousedown="containerClicked" style="padding: 10px;">
      <el-alert
        title="警告框标题"
        type="success"
        effect="light">
      </el-alert>
    </div>
</template>

<script>
  import mixin from '../../mixins/mixin'
  export default {
    name: "alert-test",
    mixins: [mixin],
    data () {
      return {
        comment: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.triggerClick();
        this.testMixin();
        /*this.$Get('http://192.168.101.129:9000/user/api/v1/user/all').then((data) => {
          console.log(data);
        })*/
      })
    },
    methods: {
      triggerClick () {
        let elm = document.getElementById('pageContainer');
        this.triggerEvent('mousedown', elm);
        this.triggerEvent('mouseup', elm);
        return elm
      },
      triggerEvent (name, elm) {
        const evt = document.createEvent('MouseEvents')
        evt.initEvent(name, true, true)
        elm.dispatchEvent
          ? elm.dispatchEvent(evt)
          : elm.fireEvent('on' + name, evt);
        return elm
      },
      containerClicked () {
        console.log('点击事件');
      }
    }
  }
</script>

<style scoped>

</style>
