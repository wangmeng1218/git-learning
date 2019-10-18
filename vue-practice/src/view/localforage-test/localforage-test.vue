<template>
  <div>
    <h1>啦啦啦啦</h1>
  </div>
</template>

<script>
  import localforage from 'localforage'
  export default {
    name: "localforage-test",
    data () {
      return {}
    },
    created () {
      localforage.setItem('levi','leviis160');
    },
    mounted () {},
    methods: {
    }
  }
</script>

<style scoped>

</style>
