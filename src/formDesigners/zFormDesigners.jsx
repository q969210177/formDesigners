/* eslint-disable no-unused-vars */
import { componentsObj } from "./data/compoents";
import { validatorOption, getDataType,setCompoentId } from "./utils/utils";
import "./style/zFormDesigners.scss";
export default {
  name: "zFormDesigners",
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
            i.value = value;
          },
          ...i.on,
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
    //
    return (
      <div class="zFormDesigners">
        <a-form-model props={{ model: this.formData, ...this.formConfig }}>
          <a-row>
            {this.rule.map((i) => {
              return (
                <a-col {...i.col}>
                  <div
                    class="div_item"
                    onClick={() => {
                      console.log(i);
                    }}
                  >
                    <a-form-model-item label={i.label}>
                      {this.renderCompoents(i, h)}
                    </a-form-model-item>
                  </div>
                </a-col>
              );
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
