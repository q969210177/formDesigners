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
            label: "",
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
            label: "",
            props: {},
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
            rules: [],
            col: {},
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
            col: {},
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
            col: {},
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
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
            col: {},
          },
        },
        {
          name: "开关",
          activeValue: "switch",
          data: {
            type: "switch",
            value: false,
            label: "",
            props: {},
            rules: [],
          },
        },
      ];

      return menuArr.map((i) => {
        const itemClass = {
          componentsMenuItem: true,
          active_Item: i.activeValue === this.value,
          //   "mt-20": k > 1,
        };
        return (
          <div
            class={itemClass}
            draggable
            onDragstart={($event) => {
              i.data.compoentId = setCompoentId();
              //
              $event.dataTransfer.setData("text/plain", JSON.stringify(i.data));
            }}
            onClick={() => {
              this.$emit("input", i.activeValue);
              // const compoentId = setCompoentId();
              // this.activeValue = i;
              // this.activeValue.data.compoentId = compoentId;
            }}
          >
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
        <div class="card_header">
          <div class="header_title"></div>
          <div class="header_btn">
            <a-button
              onClick={() => {
                this.$emit("confirmClick", this.activeValue);
              }}
              type="primary"
            >
              确定
            </a-button>
          </div>
        </div>
        <div class="card_body">{this.setCompoentsItem()}</div>
      </div>
    );
  },
};
