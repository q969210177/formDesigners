import "./style/componentsMenu.scss";
export default {
  name: "componentsMenu",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    //设置组件的item
    setCompoentsItem() {
      const menuArr = [
        {
          name: "输入框",
          activeValue: "input",
          data: {
            type: "input",
            value: "",
            props: {},
            rules: [],
          },
        },
        {
          name: "下拉框",
          activeValue: "select",
          data: {
            type: "select",
            value: "",
            props: {},
            rules: [],
          },
        },
      ];

      return menuArr.map((i) => {
        // active_Item
        const itemClass = {
          componentsMenuItem: true,
          active_Item: i.activeValue === this.value,
        };
        return (
          <div
            class={itemClass}
            onClick={() => {
              this.$emit("input", i.activeValue);
            }}
          >
            {i.name}
          </div>
        );
      });
    },
  },
  render() {
    return <div class="componentsMenu">{this.setCompoentsItem()}</div>;
  },
};
