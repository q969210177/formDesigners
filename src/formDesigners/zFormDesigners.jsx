/* eslint-disable no-unused-vars */
import { componentsObj } from "./data/compoents";
import { validatorOption, getDataType } from "./utils/utils";

export default {
  name: "zFormDesigners",
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: Object,
      require: true,
    },
  },
  methods: {
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
            },
            attrs: {
              ...i.props,
            },
          };
        }
      } else {
        return {
          props: {
            ...i.props,
          },
        };
      }
    },
    //分发input事件的默认值
    validatorIsEvent(type, event) {
      const typeArr = ["InputEvent"];
      if (typeArr.includes(type)) {
        const {
          target: { value },
        } = event;
        return value;
      } else {
        return event;
      }
    },
    //返回组件
    renderCompoents(i, h) {
      const com = componentsObj[i.type];
      return h(com, {
        ...this.returnCompoentsProps(i),
        on: {
          input: (v) => {
            const value = this.validatorIsEvent(getDataType(v), v);
            console.log(value, "value");
            i.value = value;
          },
        },
      });
    },
    //获取json格式的数据
    getFormData() {
      const formData = {};
      this.rule.forEach((i) => {
        formData[i.fileId] = i.value;
      });
      return formData;
    },
  },
  mounted() {
    this.$emit("input", { getFormData: this.getFormData });
  },
  render(h) {
    return (
      <div class="zFormDesigners">
        <a-form-model props={{ model: this.formData }}>
          <a-row>
            {this.rule.map((i) => {
              return this.renderCompoents(i, h);
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
