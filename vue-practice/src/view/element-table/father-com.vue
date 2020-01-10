<template>
  <div>
    father
    <child-com v-bind="$attrs" v-on="$listeners"></child-com>
  </div>
</template>

<script>
    import ChildCom from "./child-com";

    export default {
      components: {ChildCom},
      name: "father-com",
      props: {
          name: {
            type: String,
            default: ''
          }
      },
      mounted(){
        console.log('father-com');
          console.log(this.$attrs);
      }
    }
</script>

<style scoped>

</style>
