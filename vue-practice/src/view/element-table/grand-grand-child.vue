<template>
    <div @click="handleClick">
      <span>grand-grand-child</span>
    </div>
</template>

<script>
    export default {
        name: "grand-grand-child",
      props: {
          attr2:{
            type: String,
            default: ''
          }
      },
      mounted(){
          console.log('grand-grand-child');
          console.log(this.$attrs);
      },
      methods:{
          handleClick(){
            this.$emit('back', 'grand-grand-child返回');
          }
      }
    }
</script>

<style scoped>

</style>
