<template>
  <div style="display: flex;flex-direction: column;">
    <div style="display: flex;flex-direction: row;">
      <label v-if="label">{{label}}</label>
      <slot></slot>
    </div>
    <label class="error-message" v-if="errorMessage">{{errorMessage}}</label>
  </div>
</template>

<script>
  import Schema from 'async-validator'
  export default {
    inject: ['form'],
    name: "cus-form-item",
    props: {
      label: {
        type: String,
        default: ''
      },
      prop: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        errorMessage: ''
      }
    },
    mounted() {
      this.$on('validate', () => {
        this.validate();
      })
    },
    methods: {
      validate () {
        let value = this.form.model[this.prop];
        let rules = this.form.rules[this.prop];
        const desc = {[this.prop]: rules};
        const schema = new Schema(desc);
        // return的是校验结果的Promise
        return schema.validate({[this.prop]: value}, errors => {
          if (errors) {
            this.errorMessage = errors[0].message;
          }else {
            this.errorMessage = ''
          }
        });
      }
    }
  }
</script>

<style scoped>
  /*.form-item-container{*/
    /*display: flex;*/
    /*flex-direction: row;*/
  /*}*/
  .error-message{
    color: darkred;
    text-align: left;
  }
</style>
