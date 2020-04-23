<template>
  <div v-show="visible" class="loading-show">
    <div class="cover"></div>
    <div class="modal">
      <component v-bind="componentProps" :is="componentName" @close="dialogClose" @confirm="dialogConfirm"></component>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shadow-frame",
    inheritAttrs: false,
    props: {},
    data () {
      return {
        visible: false,
        componentName: '',
        componentProps: {}
      }
    },
    methods: {
      dialogConfirm (data) {
        this.$emit('confirm', data);
      },
      dialogClose () {
        this.$emit('close');
      }
    },
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
</style>
