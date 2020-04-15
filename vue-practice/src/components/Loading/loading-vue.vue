<template>
    <transition name="loading">
      <div v-show="visible" class="loading-shadow">
        <h1 class="loading-text">加载中。。。</h1>
      </div>
    </transition>
</template>

<script>
  export default {
    name: "loading-vue",
    data () {
      return {
        visible: false
      }
    }
  }
</script>

<style scoped>
  .loading-shadow {
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading-text {
    z-index: 9999;
    color: greenyellow;
  }
</style>
