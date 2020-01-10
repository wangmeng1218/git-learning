<template>
    <div>
      children
      <grand-child v-bind="$attrs" v-on="$listeners"></grand-child>
    </div>
</template>

<script>
    import GrandChild from "./grand-child";

    export default {
      components: {GrandChild},
      name: "child-com",
      props: {
          content: {
            type: String,
            default: ''
          }
      },
      mounted(){
        console.log('child-com');
        console.log(this.$attrs);
      }
    }
</script>

<style scoped>

</style>
