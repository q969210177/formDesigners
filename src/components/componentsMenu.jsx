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
        {
          name: "单选框",
          activeValue: "radio",
          data: {
            type: "select",
            value: "",
            props: {},
            rules: [],
          },
        },
        {
          name: "复选框",
          activeValue: "checkbox",
          data: {
            type: "checkbox",
            value: "",
            props: {},
            rules: [],
          },
        },
        {
          name: "时间选择器",
          activeValue: "datePick",
          data: {
            type: "datePick",
            value: "",
            props: {},
            rules: [],
          },
        },
        {
          name: "开关",
          activeValue: "switch",
          data: {
            type: "switch",
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
          //   "mt-20": k > 1,
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
    const cardStyle = {
      width: "100%",
    };
    return (
      <div class="componentsMenu">
        {this.setCompoentsItem()}

        <a-card
          class="width-100"
          style={cardStyle}
          title="Default size card"
        ></a-card>
      </div>
    );
  },
};
