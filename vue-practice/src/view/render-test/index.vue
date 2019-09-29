<template>
    <div>
      <render-start ref="RenderREF" :level="level">
        Hello World
      </render-start>
    </div>
</template>

<script>
  import RenderStart from './render-start'
  export default {
    components: {RenderStart},
    name: "index",
    data() {
      return {
        level: 1
      }
    },
    component: {
      RenderStart
    },
    created(){
    },
    mounted(){
      this.level = 1
      console.log(this.$refs)
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
