/* eslint-disable no-unused-vars */
// import zformDemoItem from "./zformDemoItem";
// import aGridLayout from "@/components/aGridLayout";
// import aGridLayoutItem from "@/components/aGridLayoutItem";
import {
  returnEvent,
  getRuleItem,
  returnSlots,
  isHaveDefaultValue,
  getWordsWidth,
  setInstallRule,
} from "@/utils/utils";
import { componentsObj } from "../zformcreate/data/compoents";
import "./style/zformDemo.scss";
export default {
  name: "zformDemo",
  components: {
    // zformDemoItem,
    // aGridLayout,
    // aGridLayoutItem,
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
      this.copyRule = this.rule;
    },
    // formData(newV){
    //   console.log(newV,"newV");
    //   this.$emit("formDataChange",newV)
    // }
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
    this.copyRule =this.rule
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      const formData={}
      this.copyRule.forEach((i) => {
        formData[i.fileId] = i.value
        this.$set(this.formData, i.fileId, i.value);
      });
      return  formData
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
      this.copyRule = (this.rule);
    },
    //重新给copyrule赋值
    updateRule() {
      this.copyRule =(this.rule);
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
    //返回组件
    renderCompoents(type, h, ruleItem,index) {
      const returnObj = {
        form: this.returnFormItem,
        style: this.returnStyleItem,
      };
      if (returnObj[type]) {
        return returnObj[type](h, ruleItem,index);
      }
      return this.returnFormItem(h, ruleItem,index);
    },
    //返回样式组件
    returnStyleItem(h, ruleItem,index) {
      const com = componentsObj[ruleItem.type];
      const { fileId } = ruleItem;
      const dom = h(com, {
        ...this.returnCompoentsProps(ruleItem),
      });
      return (
        <div class="rule_item_form">
          <div class="item_form">{dom}</div>
          <div
            class={[
              ruleItem.fileId,
              "item_form_mask",
              { rule_item_form_active: this.activeValue === fileId },
              { rule_item_form_noactive: this.activeValue !== fileId },
            ]}
          ></div>
          {this.returnOperateDom(ruleItem,index)}
        </div>
      );
    },
    //返回form组件
    returnFormItem(h, ruleItem,index) {
      const { colonStatus, labelWidth } = this.formConfig;
      const { fileId } = ruleItem;
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
      return (
        <div class="rule_item_form">
          <div class="item_form">
            <a-form-model-item
              scopedSlots={labelSlot}
              props={{ ...formModelItemProps }}
            >
              {h(
                com,
                {
                  ...this.returnCompoentsProps(ruleItem),
                  on: {
                    ...eventLoop,
                    input: ($event) => {
                      const value = this.validatorIsEvent(
                        ruleItem.type,
                        $event
                      );
                      ruleItem.value = value;
                      this.$emit("valueChange");
                    },
                  },
                },
                {}
              )}
            </a-form-model-item>
          </div>
          <div
            class={[
              ruleItem.fileId,
              "item_form_mask",
              { rule_item_form_active: this.activeValue === fileId },
              { rule_item_form_noactive: this.activeValue !== fileId },
            ]}
          ></div>
          {this.returnOperateDom(ruleItem,index)}
        </div>
      );
    },
    //分发input事件的默认值
    validatorIsEvent(type, event) {
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
    //返回操作区按钮
    returnOperateDom(ruleItem,index) {
      return (
        <div class="operate_btn">
          <span
            title="下降"
            onClick={() => {
              this.$emit("handleZformDemoDownClick", ruleItem,index);
            }}
            class="square_box_btn "
            style={{ color: "#2e73ff" }}
          >
            <span class=" iconfont icon-xiajiang"></span>
          </span>

          <span
            title="上升"
            onClick={() => {
              this.$emit("handleZformDemoUpClick", ruleItem,index);
            }}
            class="square_box_btn "
            style={{ color: "#2e73ff" }}
          >
            <span class="iconfont icon-shangsheng"></span>
          </span>
          <span
            title="复制"
            onClick={() => {
              this.$emit("handleZformDemoCopyClick", ruleItem);
            }}
            class="square_box_btn"
            style={{ color: "#2e73ff" }}
          >
            <span class=" iconfont icon-fuzhi1"></span>
          </span>
          <span
            title="删除"
            onClick={() => {
              this.$emit("handleZformDemoDelClick", ruleItem,index);
            }}
            class="square_box_btn "
            style={{ color: "#ff2e2e" }}
          >
            <span class=" iconfont icon-Delete"></span>
          </span>
        </div>
      );
    },
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
      <div class="zformDemo" {...{ style: { ...this.$attrs.style } }}>
        <a-form-model
          ref="zCreateForm"
          props={{ model: this.formData, ...formConfig }}
          colon={false}
        >
          <a-row>
            {this.copyRule.map((ruleItem, k) => {
              // if (ruleItem.on) {
              //   eventLoop = {
              //     ...returnEvent(this.$listeners, ruleItem.fileId),
              //     ...ruleItem.on,
              //   };
              //  draggable
              // } else {
              //   eventLoop = returnEvent(this.$listeners, ruleItem.fileId);
              // }
              if (ruleItem.type !== "hide") {
                return (
                  <a-col span={ruleItem.span ? ruleItem.span : 24}>
                    <div
                      class="rule_item"
                      onClick={() => {
                        this.$emit("rowClick", ruleItem.fileId);
                        this.$emit("update:activeValue", ruleItem.fileId);
                        this.$emit("update:ruleItemType", ruleItem.type);
                      }}
                    >
                      {/* 用来展示显示的组件部分 但是是在z轴的最下层 */}
                        {this.renderCompoents(ruleItem.itemType, h, ruleItem,k)}                    
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
