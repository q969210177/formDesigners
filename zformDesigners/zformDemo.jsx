/* eslint-disable no-unused-vars */
import zformDemoItem from "./zformDemoItem";
import aGridLayout from "@/components/aGridLayout";
import aGridLayoutItem from "@/components/aGridLayoutItem";
import { returnEvent, getRuleItem, returnSlots } from "@/utils/utils";
import "./style/zformDemo.scss";
import _ from "lodash";

export default {
  name: "zformDemo",
  components: {
    zformDemoItem,
    aGridLayout,
    aGridLayoutItem,
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
    activeValue: {
      type: [String, Number],
    },
    ruleItemType: {
      type: [String, Number],
    },
  },
  watch: {
    rule(newV) {
      this.copyRule = _.cloneDeep(this.rule);
    },
  },
  data() {
    return {
      formData: {},
      copyRule: [],
    };
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
      <div class="zformDemo" {...{ style: { ...this.$attrs.style } }}>
        <a-form-model
          ref="zCreateForm"
          props={{ model: this.formData, ...formConfig }}
          colon={false}
        >
          <a-row>
            {this.copyRule.map((i, k) => {
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
                        this.$emit("update:activeValue", i.fileId);
                        this.$emit("update:ruleItemType", i.type);
                      }}
                    >
                      <div
                        class={{
                          rule_item_form: true,
                        }}
                        style={{ "margin-bottom": "2px" }}
                      >
                        <slot name={i.fileId} data={i}>
                          <zformDemoItem
                            onHandleZformDemoItemCopyClick={(formItem) => {
                              this.$emit(
                                "handleZformDemoCopyClick",
                                formItem,
                                k
                              );
                            }}
                            onHandleZformDemoItemDelClick={(formItem) => {
                              this.$emit(
                                "handleZformDemoDelClick",
                                formItem,
                                k
                              );
                            }}
                            onHandleZformDemoItemUpClick={(formItem) => {
                              this.$emit(
                                "handleZformDemoItemUpClick",
                                formItem,
                                k
                              );
                            }}
                            onHandleZformDemoItemDownClick={(formItem) => {
                              this.$emit(
                                "handleZformDemoItemDownClick",
                                formItem,
                                k
                              );
                            }}
                            // onValueChange={() => this.getFormData()}
                            formConfig={formConfig}
                            formItem={i}
                            eventLoop={eventLoop}
                            activeValue={i.fileId === this.activeValue}
                          >
                            {returnSlots(this.$slots, i.fileId)
                              ? returnSlots(this.$slots, i.fileId)
                              : ""}
                          </zformDemoItem>
                        </slot>
                      </div>
                      <div class={[i.fileId, "default_item_hover"]}></div>
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
