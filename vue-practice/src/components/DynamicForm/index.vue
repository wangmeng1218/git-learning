
<script>
  import methods from './form-methods';
  const DEFAULT_PREFIX = 'el-';
  export default {
    name: "dynamic-form",
    props: {
      formConfigData: {
        type: Object,
        required: true
      },
      formData: {
        type: Object,
        required: true
      }
    },
    mixins: [methods],
    render(h) {
      let formItems = this.getFormItems(h);
      let children = formItems;
      if (this.formConfigData.form.layout && this.formConfigData.form.layout.row) {
        children = h(
          'el-row',
          {
            props: this.formConfigData.form.layout.row
          },
          [
            formItems
          ]
        )
      }
      let self = this;
      return h(
        'el-form',
        {
          props: {
            ...this.formConfigData.form,
            model: this.formData
          },
          ref: 'DynamicForm',
          on: {
            validate: function(event) {
              self.$emit('validate', event);
            }
          }
        },
        [
          children
        ]
      )
    },
    methods: {
      getFormItems (h) {
        let self = this;
        return this.formConfigData.formItems.map(item => {
          let formitem = h(
            'el-form-item',
            {
              props: item,
              scopedSlots: {
                error: function(error){
                  if(self.$scopedSlots[item.prop + '-error']) {
                    return self.$scopedSlots[item.prop + '-error']({
                      error: error.error
                    });
                  } else {
                    return;
                  }
                }
              }
            },
            [
              ...self.getFormItemContent(h,item)
            ]
          );
          if(item.colLayout){
            return h(
              'el-col',
              {
                props: typeof item.colLayout === 'number' ? {
                  xs: item.colLayout,
                  sm: item.colLayout,
                  md: item.colLayout,
                  lg: item.colLayout
                } : item.colLayout
              },
              [
                formitem
              ]
            )
          } else if(this.formConfigData.form.layout && this.formConfigData.form.layout.col){
            return h(
              'el-col',
              {
                props: typeof this.formConfigData.form.layout.col === 'number' ? {
                  xs: this.formConfigData.form.layout.col,
                  sm: this.formConfigData.form.layout.col,
                  md: this.formConfigData.form.layout.col,
                  lg: this.formConfigData.form.layout.col
                } : this.formConfigData.form.layout.col
              },
              [
                formitem
              ]
            )
          } else {
            return formitem;
          }
        })
      },
      getFormItemContent(h,item){
        let children = [];
        if (this.$slots[item.prop + '-label']){
          children.push(h(
            'template',
            {
              slot: 'label'
            },
            [
              this.$slots[item.prop + '-label']
            ]
          ))
        }
        if (this.$slots[item.prop]) {
          children.push(this.$slots[item.prop])
        } else {
          children.push(this.getItemContent(h,item))
        }
        return children;
      },
      getItemContent(h,item){
        let listener = {};
        if (item.on){
          Object.keys(item.on).map(key => {
            if (typeof item.on[key] === 'function') {
              const uniformItem = key.replace(/([A-Z])/g,'-$1').toLowerCase();
              listener[uniformItem] = item.on[key];
            }
          })
        }
        let self = this;
        let componentName = item.prefix ? item.prefix + item.type : DEFAULT_PREFIX +item.type;
        return h(
          componentName,
          {
            props: {
              ...item.props
            },
            attrs: {
              ...item.attrs,
              value: self.formData[item.prop]
            },
            on: {
              input: function(value){
                self.formData[item.prop] = value;
              },
              ...listener
            }
          }
        )
      }
    }
  }
</script>
