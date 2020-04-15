// 表单方法名
const METHOD_NAMES = [
  'validate',
  'validateField',
  'resetFields',
  'clearValidate'
];

const methods = {};

// 生成表单方法
METHOD_NAMES.forEach(name => {
  methods[name] = function(...args) {
    const { DynamicForm } = this.$refs;
    if (DynamicForm && DynamicForm[name]) {
      DynamicForm[name](...args);
    }
  }
});

export default { methods };
