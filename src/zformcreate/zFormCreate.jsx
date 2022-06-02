/* eslint-disable no-unused-vars */
import zFormCreateItem from "./zFormCreateItem";
import { returnEvent, getRuleItem, returnSlots } from "./utils/utils";
import "./style/zFormCreate.scss";
import _ from "lodash";

export default {
  name: "ZFormCreate",
  components: {
    zFormCreateItem,
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
          labelWidth: 130,
          colonStatus: true,
        };
      },
    },
    value: {
      type: Object,
      require: true,
    },
    //外部改变了rule 需要内部也同步进行改变的时候
    //比如说formCreate放在了弹窗里面 然后需要动态的设计option 给默认值回显 等等..
    changeRule: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      copyRule: [],
    };
  },
  watch: {
    //当外界需要改变这个rule的时候 比如说弹窗 或者说在弹窗打开之前
    changeRule(newV) {
      if (newV) {
        this.updateRule();
      }
    },
    rule() {
      this.updateRule();
    },
  },
  beforeMount() {
    this.$emit("input", {
      getFormData: this.getFormData,
      setValue: this.setValue,
      validate: this.zCreateFormValidate,
      resetRule: this.resetRule,
      updateRule: this.updateRule,
      setRuleItemOptions: this.setRuleItemOptions,
      getRuleItemSomeOne: this.getRuleItemSomeOne,
    });
  },
  mounted() {
    this.copyRule = _.cloneDeep(this.rule);
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      this.copyRule.forEach((i) => {
        // this.formData[i.fileId] = i.value
        this.$set(this.formData, i.fileId, i.value);
      });
      return _.cloneDeep(this.formData);
    },
    //设置组件的value
    setValue(fileId, newV) {
      const { ruleItem } = getRuleItem(this.copyRule, fileId);
      ruleItem.value = newV;
    },
    //表单验证的回调函数
    zCreateFormValidate(callback) {
      return this.$refs.zCreateForm.validate((v) => callback(v));
    },
    //将rule重置成最开始的状态
    resetRule() {
      this.copyRule = _.cloneDeep(this.rule);
    },
    //重新给copyrule赋值
    updateRule() {
      this.copyRule = _.cloneDeep(this.rule);
    },
    //设置组件的option
    setRuleItemOptions(fileId, data) {
      const { ruleItem } = getRuleItem(this.copyRule, fileId);
      ruleItem.options = data;
      // this.updateRule()
    },
    //返回组件的某一个字段的属性
    getRuleItemSomeOne(fileId, ruleItemkey) {
      const { ruleItem } = getRuleItem(this.copyRule, fileId);
      if (ruleItem[ruleItemkey]) {
        return ruleItem[ruleItemkey];
      }
      return {};
      // this.updateRule()
    },
    //设置组件的rule
    // setFormRule(fileId, rule) {},
  },
  render() {
    const formConfig = Object.assign(
      {
        labelCol: { span: 4 },
        wrapperCol: {
          span: 20,
        },
        labelAlign: "left",
        labelWidth: 130,
      },
      this.formConfig
    );
    this.getFormData();
    return (
      <div class="zCreateForm" {...{ style: { ...this.$attrs.style } }}>
        <a-form-model
          ref="zCreateForm"
          props={{ model: this.formData, ...formConfig }}
          colon={false}
        >
          <a-row gutter={20}>
            {this.copyRule.map((i) => {
              let eventLoop = {};
              if (i.on) {
                eventLoop = {
                  ...returnEvent(this.$listeners, i.fileId),
                  ...i.on,
                };
              } else {
                eventLoop = returnEvent(this.$listeners, i.fileId);
              }
              if (i.type !== "hide") {
                return (
                  <a-col span={i.span ? i.span : 24}>
                    <div
                      class={{
                        rule_item: true,
                      }}
                      onClick={() => {
                        this.$emit("rowClick", i.fileId);
                        this.$emit("update:clickActive", i.fileId);
                      }}
                    >
                      <div class="rule_item_form">
                        <slot name={i.fileId} data={i}>
                          <zFormCreateItem
                            // onValueChange={() => this.getFormData()}
                            formConfig={formConfig}
                            formItem={i}
                            eventLoop={eventLoop}
                          >
                            {returnSlots(this.$slots, i.fileId)
                              ? returnSlots(this.$slots, i.fileId)
                              : ""}
                          </zFormCreateItem>
                        </slot>
                      </div>
                    </div>
                  </a-col>
                );
              }
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
