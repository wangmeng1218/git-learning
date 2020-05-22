<template>
    <div id="pageContainer" @mousedown="containerClicked" class="alert-test-container">
      <!--<el-input resize="none" v-model="inputValue" type="textarea" :disabled="true"></el-input>-->
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
     <!-- <div style="width:160px;height:160px;position: relative;">
        <img :src="logo"/>
        <div style="position:absolute;bottom:6rem;left:2rem;width: 30px;height:30px;background:#fff;background:rgba(255, 255, 255, 0.5) none repeat scroll 0 0 !important;">12</div>
      </div>-->
      <!--<div style="width:30%;height:10%;display: flex;flex-direction: row;">
        <div style="width:60%;">
          <img style="width:auto;height:auto;max-width: 100%;max-height:100%;" :src="logo"/>
        </div>
        <div style="width:40%;">啦啦啦啦啦啦</div>
      </div>-->
      <el-input
        placeholder="input事件中加入额外参数"
        v-model="inputValue"
        clearable
        @input="value => inputChange(value,input,'llll')">
      </el-input>
      <dynamic-form :formData="formData" :formConfigData="formConfigData"></dynamic-form>
      <el-dialog
        :modal="false"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
  import logo from '../../assets/logo.png'
  import mixin from '../../mixins/mixin'
  import DynamicComponent from "./dynamicComponent";
  export default {
    components: {DynamicComponent},
    name: "alert-test",
    mixins: [mixin],
    data () {
      return {
        dialogVisible:false,
        comment: '',
        logo: logo,
        inputValue: '司施工路口',
        formData: {
          type: '',
          code: '',
          number: '',
          result: '',
          remark: ''
        },
        input: 'input',
        formRules: {
          type: [{ required: true, message: '请输入类型', trigger: 'blur'}],
          code: [{ required: true, message: '请输入编号', trigger: 'blur'}],
          number: [{ required: true, message: '请输入数据', trigger: 'blur'}],
          result: [{ required: true, message: '请输入结果', trigger: 'blur'}]
        },
        formData: {
          name: 'bilibili',
          age: '10',
          address: '3',
          country: 'China'
        },
        formConfigData: {
          form: {
            labelWidth: '80px',
            labelSuffix: ':',
            size: 'mini',
            rules: {
              name: [{ required:true, message: '请输入姓名', trigger: 'blur'}],
              age: [{ required:true, message: '请选择年龄', trigger: 'blur'}],
              country: [{ required:true, message: '请输入国家', trigger: 'blur'}]
            },
            layout: {
              row: {
                gutter: 30
              },
              col: {
                xs: 24,
                sm: 12,
                md: 8,
                lg: 6
              }
            }
          },
          formItems: [
            {
              prop: 'name',
              label: '姓名',
              type: 'input',
              props: {},
              attrs: {
                type: 'textarea',
                placeholder: '请输入姓名'
              },
              on: {
                focus: this.inputFocus
              },
              colLayout: 24
            },
            {
              prop: 'age',
              label: '年龄',
              type: 'input',
              props: {},
              attrs: {
                type: 'text',
                placeholder: '请输入年龄'
              }
            },
            {
              prop: 'address',
              label: '地址',
              type: 'input',
              props: {},
              attrs: {
                type: 'text',
                placeholder: '请输入地址'
              }
            },
            {
              prop: 'country',
              label: '国家',
              type: 'input',
              props: {},
              attrs: {
                type: 'textarea',
                placeholder: '请输入国家'
              }
            }
          ]
        }
      }
    },
    mounted () {
      console.log('组件mounted');
      console.log(this.$route.matched);
      let script = document.createElement('script');
      script.type = 'text/javascript';

      script.src = 'https://www.runoob.com/try/ajax/jsonp.php?&jsoncallback=handleData';
      document.body.appendChild(script);
      this.$nextTick(() => {
        this.triggerClick();
        this.testMixin();
        // this.$Get('http://192.168.101.129:9000/user/api/v1/user/all').then((data) => {
        //   console.log(data);
        // })
      });
    },
    methods: {
      inputFocus(){
        this.dialogVisible = true;
      },
      inputChange(...args){
        console.log(args);
      },
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
      },
      testMixin () {
        console.log('组件testMixin');
      },
      confirmInfo () {
        this.$refs['SimpleFormREF'].validate(valid => {
          console.log("校验结果：" + valid);
        });
      }
    }
  }
</script>

<style lang="stylus">
  .alert-test-container{
    height: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
      .el-textarea.is-disabled .el-textarea__inner {
        background-color: #f7f7f7;
        border: none;
        border-radius 2px;
        color: #666;
        cursor: not-allowed;
      }
  }
</style>
