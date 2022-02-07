/* eslint-disable no-unused-vars */
import { componentsObj } from "./data/compoents";
import zFormDesignersItem from "./zFormDesignersItem";
import { validatorOption, getDataType, setCompoentId } from "./utils/utils";
import "./style/zFormDesigners.scss";
export default {
  name: "zFormDesigners",
  components: {
    zFormDesignersItem,
  },
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
  data() {
    return {
      clickActive: null,
    };
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      const formData = {};
      this.rule.forEach((i) => {
        formData[i.fileId] = i.value;
      });
      return formData;
    },
    //设置组件的rule
    setFormRule(fileId, rule) {},
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
                <zFormDesignersItem
                  onRowClick={() => {
                    this.clickActive = i.compoentId;
                    this.$emit("rowClick", this.clickActive);
                  }}
                  formItem={i}
                  clickActiveValue={this.clickActive}
                ></zFormDesignersItem>
              );
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
