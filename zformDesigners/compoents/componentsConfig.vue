<template>
  <div class="componentsConfig">
    <header class="header">
      组件配置{{ ruleItemType }}
      <!-- <a-button type="primary" size="small" @click="handleChangeModel">
        确定
        </a-button> -->
    </header>
    <main class="main">
      <div class="form_config" v-show="formRule.length > 1">
        <h3>表单项配置</h3>
        <ZFormCreate
          v-model="formModel"
          :formConfig="formRuleConfig"
          :rule="formRule"
        >
        </ZFormCreate>
      </div>
      <div class="components_config">
        <h3>组件配置</h3>
        <ZFormCreate
          v-model="compoentsModel"
          :formConfig="formRuleConfig"
          :rule="compoentsRule"
        >
        </ZFormCreate>
      </div>
    </main>
  </div>
</template>
<script>
import { formRule, compoentsRule } from "../data/defaultData.js";
import { setCompoentId, getRuleItem } from "@/utils/utils.js";

export default {
  name: "componentsConfig",
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },

    activeValue: {
      type: [String, Number],
    },
    ruleItemType: {
      type: [String, Number],
    },
  },

  data() {
    return {
      compoentsModel: {},
      formModel: {},
      formRuleConfig: {
        labelCol: { span: 8 },
        wrapperCol: {
          span: 16,
        },
        labelAlign: "left",
        labelWidth: 80,
        colonStatus: true,
      },
      compoentsRule: [],
      formRule: [],
      eventObj: {},
    };
  },
  created() {
    // this.init();
  },
  mounted() {},
  methods: {
    init(activeValue) {
      const value = getRuleItem(this.rule, activeValue);
      if (activeValue && value) {
        const { ruleItem } = value;
        console.log(ruleItem, "ruleItem");
        this.setCompoentsRule(ruleItem);
        this.setFormRule(ruleItem);
      }
    },
    //通过外部的ref事件来更新数据吧  不能有缓存 不然奇奇怪怪
    setCompoentsRule(ruleItem) {
      const props = ruleItem.props;
      const propsKey = Object.keys(props);
      this.compoentsRule = compoentsRule.filter((item) => {
        if (item.on) {
          for (const key in item.on) {
            if (Object.hasOwnProperty.call(item.on, key)) {
              const callback = item.on[key];
              item.on[key] = (...arg) => {
                callback(...arg);
                this.handleChangeModel();
                return;
              };
            }
          }
        }
        if (propsKey.includes(item.fileId)) {
          item.value = props[item.fileId];
        }
        if (item.fileId === "options" && ruleItem.options) {
          item.value = ruleItem.options;
        }
        if (item.attrArr.includes(ruleItem.type)) {
          return item;
        }
      });
    },
    setFormRule(ruleItem) {
      const defaultArr = ["fileId", "label", "rules", "span"];
      const defaultFormRule = [
        {
          type: ruleItem.itemType === "style" ? "hide" : "input",
          label: "fileId",
          fileId: "fileId",
          value: ruleItem.fileId,
          props: {
            disabled: ruleItem.itemType === "style",
          },
          on: {
            blur: () => {
              this.handleChangeModel();
            },
          },
          span: 24,
          attrArr: ["form", "style"],
        },
        {
          type: "input",
          label: "label",
          fileId: "label",
          value: "",
          on: {
            blur: () => {
              this.handleChangeModel();
            },
          },
          span: 24,
          attrArr: ["form"],
        },
        {
          type: "setRulesValidate",
          label: "验证规则",
          fileId: "rules",
          value: [],
          options: [],
          props: {
            validateType: ruleItem.type,
          },
          attrArr: ["form"],
          span: 24,
        },
        {
          type: "slider",
          label: "长度",
          fileId: "span",
          on: {
            afterChange: () => {
              this.handleChangeModel();
            },
          },
          value: 1,
          span: 24,
          props: {
            max: 24,
            min: 1,
          },
          attrArr: ["form"],
        },
      ].concat(formRule);
      this.formRule = defaultFormRule.filter((item) => {
        item.value = ruleItem[item.fileId];
        if (item.on && !defaultArr.includes(item.fileId)) {
          for (const key in item.on) {
            if (Object.hasOwnProperty.call(item.on, key)) {
              const callback = item.on[key];
              item.on[key] = (...arg) => {
                callback(...arg);
                this.handleChangeModel();
                return;
              };
            }
          }
        }
        if (item.attrArr.includes(ruleItem.itemType)) {
          return item;
        }
      });
    },
    //change事件 用来改变外部的参数设置
    handleChangeModel() {
      const defaultFormData = this.formModel.getFormData();
      const componentsFormData = this.compoentsModel.getFormData();
      if (!defaultFormData.fileId) {
        defaultFormData.fileId = setCompoentId();
      }
      //清洗一下props 这种清洗会把 switch的值给清洗掉
      const switchKeyArr = ["allowClear"];
      for (const key in componentsFormData) {
        if (Object.hasOwnProperty.call(componentsFormData, key)) {
          const element = componentsFormData[key];
          if (!element && !switchKeyArr.includes(key)) {
            delete componentsFormData[key];
          }
        }
      }

      const newRuleItem = {
        ...defaultFormData,
        props: {
          ...componentsFormData,
        },
      };
      if (componentsFormData.options) {
        newRuleItem.options = componentsFormData.options;
      }
      this.$emit("handleChangeConfig", newRuleItem, this.activeValue);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";

.componentsConfig {
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 40px;
    font-weight: 500;
    font-size: 18px;
    border-bottom: 1px solid #ececec;
    padding: 0 8px;
    @include flex-row-c-c;
  }

  .main {
    width: 100%;
    height: calc(100% - 40px);
    padding: 8px 12px;

    .independent_dom_class {
      width: 100%;
      @include flex-row-s-c;
    }

    .form_config {
      width: 100%;
    }

    .components_config {
      width: 100%;
    }
  }
}
</style>
