<template>
  <div>
    <h1>啦啦啦啦</h1>
  </div>
</template>

<script>
  export default {
    name: "localforage-test",
    data () {
      return {}
    },
    created () {
      $Cache.setItem('kajiang','最像反派的正派');
    },
    mounted () {},
    methods: {
    }
  }
</script>

<style scoped>

</style>
