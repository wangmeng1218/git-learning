export default {
  methods: {
    testMixin () {
      console.log('混入mixin')
      console.log(this.formData);
    }
  },
  mounted () {
    console.log('混入mounted');
    console.log(this.formData);
  }
}
