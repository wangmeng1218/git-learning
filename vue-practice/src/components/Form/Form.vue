<template>
  <div class="form-container" :style="{flexDirection:itemDirection}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide () {
      return {
        form: this
      };
    },
    name: "cusForm",
    props: {
      model: {
        type: Object,
        default: () => {}
      },
      rules: {
        type: Object,
        default: () => {}
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      itemDirection () {
        return this.inline ? 'row' : 'column';
      }
    },
    methods: {
      validate (callback) {
        let tasks = this.$children.filter(item => item.prop).map(children => children.validate());
        Promise.all(tasks).then(() => {
          callback(true);
        }).catch(() => {
          callback(false);
        });
      }
    }
  }
</script>

<style scoped>
  .form-container {
    display: flex;
  }
</style>
