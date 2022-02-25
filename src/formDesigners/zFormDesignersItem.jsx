/* eslint-disable no-unused-vars */
import { getDataType } from "./utils/utils";
import { componentsObj } from "./data/compoents";
import "./style/zFormDesignersItem.scss";
export default {
  name: "zFormDesignersItem",
  props: {
    formItem: {
      type: Object,
      require: true,
    },
    value: {},
    clickActiveValue: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    //返回组件
    renderCompoents(i, h) {
      const com = componentsObj[i.type];
      return h(com, {
        ...this.returnCompoentsProps(i),
        on: {
          input: ($event) => {
            const value = this.validatorIsEvent(getDataType($event), $event);
            i.value = value;
          },
          ...i.on,
        },
      });
    },
    //分发input事件的默认值
    validatorIsEvent(type, event) {
      const typeArr = ["InputEvent", "PointerEvent"];
      if (typeArr.includes(type)) {
        const {
          target: { value },
        } = event;
        if (value) {
          return value;
        }
        console.log(event, "event");
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
  },
  render(h) {
    const divItemAbsDom =
      this.clickActiveValue === this.formItem.fileId ? (
        <div>
          <a-button
            onClick={() => {
              this.$emit("handleRowDelect", this.formItem);
            }}
            type="danger"
            shape="circle"
            icon="delete"
          />
          <a-button type="link" shape="circle" icon="check" />
        </div>
      ) : (
        ""
      );
    const divItemActiveDom =
      this.clickActiveValue === this.formItem.fileId ? (
        <a-button type="link" shape="circle" icon="check" />
      ) : (
        ""
      );
    return (
      <div class="zFormDesignersItem">
        <a-form-model-item
          label={this.formItem.label}
          prop={this.formItem.fileId}
          labelAlign={this.formItem.formProps.labelAlign}
          required={this.formItem.formProps.isRequired}
        >
          {this.renderCompoents(this.formItem, h)}
        </a-form-model-item>
      </div>
    );
  },
};
