import zCreateFormItem from "./zCreateFormItem";
import { returnEvent } from "@/formDesigners/utils/utils";

export default {
  name: "zCreateForm",
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
      formData: {},
      copyRule: [],
    };
  },
  mounted() {
    this.copyRule = this.rule;
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      this.rule.forEach((i) => {
        this.formData[i.fileId] = i.value;
      });
      return this.formData;
    },
    //设置组件的rule
    // setFormRule(fileId, rule) {},
  },
  render() {
    return (
      <div class="zCreateForm">
        <a-form-model props={{ model: this.formData, ...this.formConfig }}>
          <a-row gutter={20}>
            {this.copyRule.map((i) => {
              console.log(returnEvent(this.$listeners, i.fileId));
              i.on = returnEvent(this.$listeners, i.fileId);
              return (
                <a-col span={i.col.span}>
                  <div
                    class={{
                      rule_item: true,
                    }}
                    onClick={() => {
                      // this.clickActive = i.fileId;
                      this.$emit("rowClick", i.fileId);
                      this.$emit("update:clickActive", i.fileId);
                    }}
                  >
                    <div class="rule_item_form">
                      <zCreateFormItem formItem={i}></zCreateFormItem>
                    </div>
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
