<template>
  <div class="input-container" :style="{width: width}">
    <input :value="value" @input="onInput" v-bind="$attrs"/>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ""
      },
      size: {
        type: String,
        default: 'small'
      }
    },
    computed: {
      width () {
        return this.size === 'small' ? '150px' : this.size === 'normal' ? '250px' : this.size + 'px';
      }
    },
    name: "CusInput",
    methods: {
      onInput (e) {
        console.log('触发input事件');
        this.$emit('input', e.target.value);
        this.$parent.$emit('validate');
      }
    }
  }
</script>

<style scoped>
  .input-container{
    display: flex;
    flex-direction: column;
  }
</style>
