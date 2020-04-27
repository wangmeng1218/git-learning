<template>
  <div>
    father  {{name}}
    <child-com @back="back" v-bind="bindValue" v-on="$listeners"></child-com>
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
        this.$on('fatherTest',() => {
        });
        console.log('father-com');
        console.log(this.$attrs);
        this.$emit('update:name','sync测试');
        console.log('打印$listeners');
        console.log(this.$listeners);
      },
      methods: {
        back (data1, data2) {
          console.log(data1,data2);
        }
      }
    }
</script>

<style scoped>

</style>
