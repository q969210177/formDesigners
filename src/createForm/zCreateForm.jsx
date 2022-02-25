export default {
  name: "zCreateForm",
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formConfig: {
      type: Object,
      default: () => {
        return {
          labelCol: { span: 4 },
          wrapperCol: {
            span: 20,
          },
          labelAlign: "left",
        };
      },
    },
    value: {
      type: Object,
      require: true,
    },
  },
  render() {
    return <div class="zCreateForm">1111</div>;
  },
};
