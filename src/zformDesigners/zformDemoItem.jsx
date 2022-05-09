import {
  isHaveDefaultValue,
  getWordsWidth,
} from "@/zformcreate/utils/utils.js";
import { componentsObj } from "@/zformcreate/data/compoents.js";
import "./style/zformDemoItem.scss";
export default {
  name: "zformDemoItem",
  props: {
    formItem: {
      type: Object,
      require: true,
    },
    eventLoop: {
      type: Object,
      require: true,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    activeValue: {
      type: Boolean,
    },
    formConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {},
  methods: {
    //返回组件
    renderCompoents(i, h) {
      const com = componentsObj[i.type];
      return h(
        com,
        {
          ...this.returnCompoentsProps(i),
          on: {
            ...this.eventLoop,
            input: ($event) => {
              const value = this.validatorIsEvent(i.type, $event);
              i.value = value;
              this.$emit("valueChange");
            },
          },
        },
        {}
      );
    },
    //分发input事件的默认值
    validatorIsEvent(type, event) {
      // const typeArr = ['InputEvent', 'PointerEvent']
      if (event instanceof Event) {
        const {
          target: { value },
        } = event;
        if (value) {
          return value;
        }
        return "";
      } else {
        return event;
      }
    },
    //返回props
    returnCompoentsProps(i) {
      //需要options的组件
      const needOptions = ["select", "radio", "checkbox"];
      //当他是一个需要数据去渲染的组件的时候
      if (needOptions.includes(i.type)) {
        //当options的时候 给他报错
        if (i.options) {
          return {
            props: {
              options: i.options,
              value: i.value,
            },
            attrs: {
              ...i.props,
            },
          };
        }
      } else {
        return {
          props: {
            value: i.value,
            ...i.props,
          },
        };
      }
    },
    //返回操作区按钮
    returnOperateDom() {
      return (
        <div class="operate_btn">
          <span
            onClick={() => {
              this.$emit("handleZformDemoItemCopyClick", this.formItem);
            }}
            class="square_box_btn"
            style={{ color: "#2e73ff" }}
          >
            <span class=" iconfont icon-fuzhi1"></span>
          </span>
          <span class="square_box_btn " style={{ color: "#ff2e2e" }}>
            <span class=" iconfont icon-Delete"></span>
          </span>
        </div>
      );
    },
  },
  render(h) {
    const { labelAlign, colonStatus, labelWidth } = this.formConfig;
    //设置 formItem的props 并给上默认值
    const formModelItemProps = {
      labelAlign: isHaveDefaultValue(
        this.formItem.formProps,
        "labelAlign",
        labelAlign
      ),
      required: isHaveDefaultValue(this.formItem.formProps, "required", false),
      labelCol: isHaveDefaultValue(
        this.formItem.formProps,
        "labelCol",
        isHaveDefaultValue(this.formConfig, "labelCol", { span: 4 })
      ),
      wrapperCol: isHaveDefaultValue(
        this.formItem.formProps,
        "wrapperCol",
        isHaveDefaultValue(this.formConfig, "wrapperCol", { span: 20 })
      ),
      prop: this.formItem.fileId,
      rules: this.formItem.rules,
    };
    const labelSlot = {
      label: () => {
        //获取字体长度
        const labelWordWidth = getWordsWidth(this.formItem.label) + 10;
        //判断这个字体是不是超长的
        const status = labelWordWidth > labelWidth;
        let text = "";
        if (status) {
          //这里主要是计算一格大概能放下多少个字
          text =
            this.formItem.label.slice(0, Math.floor(labelWidth / 12) - 2) +
            "... ";
        } else {
          text = this.formItem.label;
        }
        //如果需要加冒号就加冒号
        text = colonStatus ? text + ":" : text;
        return (
          <span class={["ZFormCreatetem_label"]} title={this.formItem.label}>
            {text}
          </span>
        );
      },
    };
    return (
      <div
        class={{
          zformDemoItem: true,
          active: this.activeValue,
        }}
      >
        <a-form-model-item
          scopedSlots={labelSlot}
          props={{ ...formModelItemProps }}
        >
          {this.renderCompoents(this.formItem, h)}
        </a-form-model-item>
        {this.activeValue ? this.returnOperateDom() : ""}
      </div>
    );
  },
};