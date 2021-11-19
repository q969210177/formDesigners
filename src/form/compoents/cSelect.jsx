export default {
  name: "cSelect",
  props: {
    options: {
      type: Array,
      default: () => {},
    },
    lableKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      default: "value",
    },
  },
  methods: {
    returnTemplat() {
      const vnode = <div>111</div>;
      return vnode;
    },
  },
  render() {
    return <div class="cSelect">{this.returnTemplat()}</div>;
  },
};
