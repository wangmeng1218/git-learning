<template>
    <div id="pageContainer" @mousedown="containerClicked" class="alert-test-container">
      <el-alert
        title="给定标题"
        type="success"
        effect="light">
      </el-alert>
      <el-alert
        type="info"
        effect="light">
        <template slot="title"><h1>具名插槽</h1></template>
      </el-alert>
      <el-alert
        type="warning"
        effect="light">
        <template slot><span style="color:greenyellow;">匿名插槽</span></template>
      </el-alert>
      <el-alert
        description="描述内容"
        type="error"
        effect="light">
      </el-alert>
      <el-alert
        title="关闭描述"
        close-text="关闭"
        type="error"
        effect="light">
      </el-alert>
      <el-alert
        title="不可关闭"
        :closable="false"
        type="error"
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
      let script = document.createElement('script');
      script.type = 'text/javascript';

      script.src = 'https://www.runoob.com/try/ajax/jsonp.php?&jsoncallback=handleData';
      document.body.appendChild(script);
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
.alert-test-container{
  height: 50%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
