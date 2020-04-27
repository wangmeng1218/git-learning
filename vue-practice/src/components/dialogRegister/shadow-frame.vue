<template>
  <transition name="fade">
    <div v-show="visible" class="loading-show">
      <div class="cover"></div>
      <div class="modal">
        <component v-bind="componentProps" :is="componentName" v-on="componentListeners"></component>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "shadow-frame",
    props: {
      componentName: {
        required: true
      },
      componentProps: Object,
      componentListeners: Object
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {},
    mounted () {}
  }
</script>

<style scoped>
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.4);
    width: 100%;
    height: 100%;
    opacity: 0.6;
    z-index: 2000;
  }
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2001;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
