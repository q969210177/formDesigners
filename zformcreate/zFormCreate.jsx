/* eslint-disable no-unused-vars */
import {
  returnEvent,
  getRuleItem,
  returnSlots,
  isHaveDefaultValue,
  getWordsWidth,
  setInstallRule,
} from "@/utils/utils";
import { componentsObj } from "./data/compoents.js";
import "./style/zFormCreate.scss";
import _ from "lodash";

export default {
  name: "ZFormCreate",
  components: {},
  props: {
    rule: {
      type: Array,
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
  computed: {
   
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
    value(newV){
      if (Object.keys(newV).length===0) {
        this.$emit("input", {
          getFormData: this.getFormData,
          setValue: this.setValue,
          validate: this.zCreateFormValidate,
          resetRule: this.resetRule,
          updateRule: this.updateRule,
          setRuleItemOptions: this.setRuleItemOptions,
          getRuleItemSomeOne: this.getRuleItemSomeOne,
          updateRuleItemProps: this.updateRuleItemProps,
        });
      }
    },
    formData(newV){
      this.$emit("formDataChange",newV)
    }
  },
  created() {
    this.$emit("input", {
      getFormData: this.getFormData,
      setValue: this.setValue,
      validate: this.zCreateFormValidate,
      resetRule: this.resetRule,
      updateRule: this.updateRule,
      setRuleItemOptions: this.setRuleItemOptions,
      getRuleItemSomeOne: this.getRuleItemSomeOne,
      updateRuleItemProps: this.updateRuleItemProps,
    });
  },
  beforeMount() {},
  mounted() {
    this.copyRule = this.rule;
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      const formData = {}
      this.copyRule.forEach((i) => {
        this.$set(this.formData, i.fileId, i.value);
        this.$set(formData, i.fileId, i.value);
      });
      return formData
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
      this.copyRule = this.rule;
    },
    //重新给copyrule赋值
    updateRule() {
      this.copyRule = this.rule;
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
    //更新组件的Props
    updateRuleItemProps(fileId, newProps) {
      const { ruleItem } = getRuleItem(this.copyRule, fileId);
      Object.assign(ruleItem.props, newProps);
    },
    //返回组件
    renderCompoents(type, h, ruleItem) {
      const returnObj = {
        form: this.returnFormItem,
        style: this.returnStyleItem,
      };

   
      if (returnObj[type]) {
        return returnObj[type](h, ruleItem);
      }
      return this.returnFormItem(h, ruleItem);
    },
    //返回样式组件
    returnStyleItem(h, ruleItem) {
      //当 样式组件需要走插槽的时候 直接走插槽
      if (returnSlots(this.$scopedSlots,ruleItem.fileId)) {
        return this.$scopedSlots[ruleItem.fileId](ruleItem)
      }
      const com = componentsObj[ruleItem.type];
      const dom = h(com, {
        ...this.returnCompoentsProps(ruleItem),
      });
      return dom;
    },
    //返回form组件
    returnFormItem(h, ruleItem) {
      const { colonStatus, labelWidth } = this.formConfig;
      //设置 formItem的props 并给上默认值
      const formModelItemProps = {
        required: isHaveDefaultValue(ruleItem.formProps, "required", false),
        labelCol: isHaveDefaultValue(
          ruleItem.formProps,
          "labelCol",
          isHaveDefaultValue(this.formConfig, "labelCol", { span: 4 })
        ),
        wrapperCol: isHaveDefaultValue(
          ruleItem.formProps,
          "wrapperCol",
          isHaveDefaultValue(this.formConfig, "wrapperCol", { span: 20 })
        ),
        prop: ruleItem.fileId,
        rules: ruleItem.rules,
      };
      const labelSlot = {
        label: () => {
          //获取字体长度
          const labelWordWidth = getWordsWidth(ruleItem.label) + 10;
          //判断这个字体是不是超长的
          const status = labelWordWidth > labelWidth;
          let text = "";
          if (status) {
            //这里主要是计算一格大概能放下多少个字
            text =
              ruleItem.label.slice(0, Math.floor(labelWidth / 12) - 2) + "... ";
          } else {
            text = ruleItem.label;
          }
          //如果需要加冒号就加冒号
          text = colonStatus ? text + ":" : text;
          return (
            <span class={["ZFormCreatetem_label"]} title={ruleItem.label}>
              {text}
            </span>
          );
        },
      };
      let eventLoop = {};
      if (ruleItem.on) {
        eventLoop = {
          ...returnEvent(this.$listeners, ruleItem.fileId),
          ...ruleItem.on,
        };
      } else {
        eventLoop = returnEvent(this.$listeners, ruleItem.fileId);
      }
      const com = componentsObj[ruleItem.type];
      const isSlots = returnSlots(this.$scopedSlots,ruleItem.fileId)
      //判断是不是存在插槽
      // if (returnSlots(this.$scopedSlots,ruleItem.fileId)) {
      //   // com= this.$scopedSlots[ruleItem.fileId](ruleItem)
      // }
      return (
        <div class="item_form">
          <a-form-model-item
            scopedSlots={labelSlot}
            props={{ ...formModelItemProps }}
          > 
            {/* 当存在插槽的时候直接渲染插槽 没有插槽才渲染 vnode */}
            { isSlots?this.$scopedSlots[ruleItem.fileId](ruleItem): h(
              com,
              {
                ...this.returnCompoentsProps(ruleItem),
                on: {
                  ...eventLoop,
                  input: ($event) => {
                    const value = this.validatorIsEvent(ruleItem.type, $event);
                    this.$set(this.formData, ruleItem.fileId, value);
                    ruleItem.value = value;
                    this.$emit("valueChange");
                  },
                },
              },
              {}
            )}
          </a-form-model-item>
        </div>
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
        return value;
      } else {
        return event;
      }
    },
    //返回props
    returnCompoentsProps(i) {
      //需要options的组件
      const returnObj = {
        props: {
          value: i.value,
          ...i.props,
        },
        attrs: {
          ...i.props,
        },
      };
      if (i.options) {
        returnObj.props.options = i.options;
      }
      //当他是一个需要数据去渲染的组件的时候
      return returnObj;
    },
    //设置组件的rule
    // setFormRule(fileId, rule) {},
  },
  render(h) {
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
                        {this.renderCompoents(i.itemType, h, i)}
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
