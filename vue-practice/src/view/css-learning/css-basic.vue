<template>
    <div style="width: 100%; height: 100%;">
      <!--<div style="width: 100%;height: 20px;background-color: transparent;"></div>-->
      <!--<i class="iconfont icon-youting"></i>-->
      <!--<div ref="InputREF" class="input-border" :class="inputClass">-->
        <!--<input @focus="inputFocus" @blur="inputBlur"/><span></span>-->
      <!--</div>-->
      <excel-table :form-data="formData">
        <!--<template v-slot:label>-->
          <!--<span style="color:red;">jdlksfjd</span>-->
        <!--</template>-->
        <template v-slot:error="error">
          <h1>{{error.error}}</h1>
          <!--<slot name="error" :error="error"></slot>-->
        </template>
      </excel-table>
      <!--<el-form :model="formData">-->
        <!--<el-form-item prop="name" label-width="50px" label="姓名">-->
          <!--<template v-slot:label>-->
            <!--<span style="color:red;">jdlksfjd</span>-->
          <!--</template>-->
          <!--<el-input v-model="formData.name"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="formData.name"
        tabindex="-1"
        suffix-icon="el-icon-arrow-up"
        size="medium">
      </el-input>
      <table>
        <tbody>
          <tr v-for="(item) in content">
            <td>
              <img style="width: 1em; height: 1em;vertical-align: middle;" v-if="item.state =='1'" :src="icon1"></img>
              <img style="width: 1em; height: 1em;vertical-align: middle;" v-else-if="item.state =='2'" :src="icon2"></img>
              <img style="width: 1em; height: 1em;vertical-align: middle;" v-else-if="item.state =='3'" :src="icon3"></img>
              <span v-else>{{ item.state }}</span>
            </td>
            <td>{{item.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
  import logo from '../../assets/logo.png';
    export default {
      name: "css-basic",
      data () {
        return {
          inputActive: false,
          formData: {
            name: 'levi',
            age: '20'
          },
          icon1: logo,
          icon2: logo,
          icon3: logo,
          content: [
            {
              state: '1',
              name: 'xxxx'
            },
            {
              state: '2',
              name: 'xxxx'
            },
            {
              state: '3',
              name: 'xxxx'
            },
            {
              state: '4',
              name: 'xxxx'
            }
          ]
        }
      },
      computed: {
        inputClass() {
          return this.inputActive ? 'input-border-native' : 'input-border-active';
        }
      },
      methods: {
        inputFocus () {
          this.inputFocus = true;
        },
        inputBlur () {
          this.inputFocus = false;
        }
      }
    }
</script>

<!--&#xe8ad;-->
<style lang="stylus">
  /*.span-style::before {
    content: '\e8ab';
  }
  .span-style::after {
    content: '颜如玉';
  }
  .input-border {
    display flex
    flex-direction row
    margin:0 auto;
    width: 200px;
    height: auto;
    border-radius: 7px;
  }
   .input-border-native {
     border: whitesmoke 1px solid;
   }
  .input-border-active {
    border aqua solid 2px
  }
  .input-border input {
    border: none;
    outline: none;
    width: 100%;
  }
  span::after{
    content: '\e62a';
  }*/
</style>
