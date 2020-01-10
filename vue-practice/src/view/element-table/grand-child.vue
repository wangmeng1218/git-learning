<template>
    <div>
      grand-child
      <grand-grand-child v-bind="$attrs" v-on="$listeners"></grand-grand-child>
    </div>
</template>

<script>
    import GrandGrandChild from "./grand-grand-child";

    export default {
      components: {GrandGrandChild},
      name: "grand-child",
      props: {
          attr1:{
            type: String,
            default: ''
          }
      },
      mounted(){
        console.log('grand-child');
        console.log(this.$attrs);
      }
    }
</script>

<style scoped>

</style>
