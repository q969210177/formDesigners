/* eslint-disable no-unused-vars */
import "./style/componentsMenu.scss";
import { setCompoentId } from "@/formDesigners/utils/utils";
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
            label: "111",
            props: {},
            rules: [],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
          },
        },
        {
          name: "下拉框",
          activeValue: "select",
          data: {
            type: "select",
            value: "",
            label: "",
            props: {},
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
            rules: [],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
          },
        },
        {
          name: "单选框",
          activeValue: "radio",
          data: {
            type: "select",
            value: "",
            label: "",
            props: {},
            rules: [],
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
          },
        },
        {
          name: "复选框",
          activeValue: "checkbox",
          data: {
            type: "checkbox",
            value: "",
            label: "",
            props: {},
            rules: [],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
            options: [],
          },
        },
        {
          name: "时间选择器",
          activeValue: "datePicker",
          data: {
            type: "datePicker",
            value: "",
            label: "",
            props: {},
            rules: [],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
          },
        },
        {
          name: "开关",
          activeValue: "switch",
          data: {
            type: "switch",
            value: false,
            label: "",
            props: {
              size: "small",
            },
            rules: [],
            col: {
              span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
          },
        },
      ];

      return menuArr.map((i) => {
        const itemClass = {
          componentsMenuItem: true,
          // active_Item: i.activeValue === this.value,
        };
        return (
          <div
            class={itemClass}
            draggable
            onDragstart={($event) => {
              i.data.fileId = setCompoentId();
              $event.dataTransfer.setData("text/plain", JSON.stringify(i.data));
            }}
            onClick={() => {
              this.$emit("input", i.activeValue);
            }}
          >
            {i.activeValue}
            {i.name}
          </div>
        );
      });
    },
  },
  render() {
    // const cardStyle = {
    //   width: "100%",
    // };
    return (
      <div class="componentsMenu">
        <div class="card_body">{this.setCompoentsItem()}</div>
      </div>
    );
  },
};
