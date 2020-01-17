<template>
  <div>
    father  {{name}}
    <child-com v-bind="bindValue" v-on="$listeners"></child-com>
  </div>
</template>

<script>
    import ChildCom from "./child-com";

    export default {
      components: {ChildCom},
      name: "father-com",
      data(){
        return {
          bindValue: {}
        }
      },
      props: {
          name: {
            type: String,
            default: ''
          }
      },
      watch: {
        $attrs: {
          deep: true,
          immediate: true,
          handler(val) {
            if(val) {
              this.bindValue = Object.assign({},val);
            }
          }
        }
      },
      mounted(){
          console.log('father-com');
          console.log(this.$attrs);
         this.$emit('update:name','sync测试')
      }
    }
</script>

<style scoped>

</style>
