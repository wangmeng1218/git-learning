<script>
export default {
  name: "render-start",
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      testData: this.level
    }
  },
  components: {},
  watch: {},
  computed: {},
  render: function (h) {
    let self = this;
    return h(
      'div',
      {
        attrs: {
          id: 'container'
        },
        on: {
          click: this.elementClicked,
          input: function (event) {
            self.$emit('input',event.target.value)
          }
        },
        domProps: {
          value: self.testData
        }
      },
      [
        h('input',{
          on: {
            input: function (event) {
              self.testData = event.target.value
              self.$emit('input',event.target.value)
            }
          },
          domProps: {
            value: self.testData
          }
        }),
        h('p','hello'),
        h('h1','World')
      ]
    )
  },
  /*render: function (createElement) {
    // 创建kebab-case风格的ID
    let headingId = this.getChildrenTextContent(this.$slots.default).toLowerCase().replace(/\W+/g, '-').replace(/(^-|-$)/g, '');

    return createElement(
      'h' + this.level,//标签名称
      [
        createElement('a',{
          attrs: {
            name: headingId,
            href: '#' + headingId
          }
        }, this.$slots.default)
      ]
    )
  },*/
  methods: {
    getChildrenTextContent (children) {
      return children.map(node => {
        return node.children ? getChildrenTextContent(node.children) : node.text;
      }).join('');
    },
    elementClicked () {
      console.log(this.testData);
    }
  }
}
</script>

<style scoped>

</style>
