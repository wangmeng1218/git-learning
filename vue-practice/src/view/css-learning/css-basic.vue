<template>
    <div style="width: 100%; height: 100%;">
      <!--<div style="width: 100%;height: 20px;background-color: transparent;"></div>-->
      <!--<i class="iconfont icon-youting"></i>-->
      <div ref="InputREF" class="input-border" :class="inputClass">
        <input @focus="inputFocus" @blur="inputBlur"/><span></span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "css-basic",
      data () {
        return {
          inputActive: false
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
  .span-style::before {
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
  }
</style>
