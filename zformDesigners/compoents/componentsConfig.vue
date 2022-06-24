<template>
  <div class="componentsConfig">
    <header class="header">
      组件配置{{ ruleItemType }}
      <a-button type="primary" size="small" @click="handleChangeModel">确定</a-button>
    </header>
    <main class="main">
      <div class="form_config">
        <h3>表单项配置</h3>
        <ZFormCreate v-model="formModel" :formConfig="formRuleConfig" :rule="formRule">
        </ZFormCreate>
      </div>
      <div class="components_config">
        <h3>组件配置</h3>
        <ZFormCreate v-model="compoentsModel" :formConfig="formRuleConfig" :rule="compoentsRule">
        </ZFormCreate>
      </div>
    </main>
    <!-- <footer>
      <div>

      </div>
    </footer> -->
  </div>
</template>
<script>
import { formRule, compoentsRule } from "../data/defaultData.js"
import {
  setCompoentId,
  getRuleItem,
} from '@/utils/utils.js'

export default {
  name: 'componentsConfig',
  props: {
    rule: {
      type: Array,
      default: () => {
        return []
      }
    },

    activeValue: {
      type: [String, Number]
    },
    ruleItemType: {
      type: [String, Number]
    }
  },
  computed: {
    compoentsRule() {
      const value = getRuleItem(this.rule, this.activeValue)
      if (this.activeValue && value) {
        const { ruleItem } = value
        console.log(ruleItem, "ruleItem");
        const props = ruleItem.props
        const propsKey = Object.keys(props)
        let returnArr = []
        console.log(propsKey, 'propsKey');
        returnArr = compoentsRule.filter(item => {
          if (propsKey.includes(item.fileId)) {
            item.value = props[item.fileId]
          }
          if (item.attrArr.includes(this.ruleItemType)) {
            return item
          }
        })

        return returnArr
      }
      return []
    },
    formRule() {
      const value = getRuleItem(this.rule, this.activeValue)
      if (this.activeValue && value) {
        const { ruleItem } = value
        let returnArr = []
        const defaultFormRule = [
          {
            type: "input",
            label: "fileId",
            fileId: "fileId",
            value: ruleItem.fileId,
            props: {
              disabled: ruleItem.itemType === "style",
            },
            span: 24,
            attrArr: ["form", "style"],
          },
          {
            type: "input",
            label: "label",
            fileId: "label",
            value: "",
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
              validateType: this.ruleItemType,
            },
            attrArr: ["form"],
            span: 24,
          },
          {
            type: "slider",
            label: "长度",
            fileId: "span",
            value: 1,
            span: 24,
            props: {
              max: 24,
              min: 1,
            },
            attrArr: ["form"],
          }].concat(formRule)
        returnArr = defaultFormRule.filter(item => {
          item.value = ruleItem[item.fileId]
          if (item.attrArr.includes(ruleItem.itemType)) {
            return item
          }
        })
        return returnArr
      }
      return []
    }
  },
  data() {
    return {
      compoentsModel: {},
      formModel: {},
      formRuleConfig: {
        labelCol: { span: 8 },
        wrapperCol: {
          span: 16
        },
        labelAlign: 'left',
        labelWidth: 80,
        colonStatus: true
      },
    }
  },
  created() {
    // this.init()
  },
  mounted() { },
  methods: {
    init() { },
    //change事件 用来改变外部的参数设置
    handleChangeModel() {
      const defaultFormData = this.formModel.getFormData()
      const componentsFormData = this.compoentsModel.getFormData()
      if (!defaultFormData.fileId) {
        defaultFormData.fileId = setCompoentId()
      }
      //清洗一下props
      for (const key in componentsFormData) {
        if (Object.hasOwnProperty.call(componentsFormData, key)) {
          const element = componentsFormData[key];
          if (!element) {
            delete componentsFormData[key]
          }
        }
      }

      const newRuleItem = {
        ...defaultFormData,
        props: {
          ...componentsFormData
        }
      }
      if (componentsFormData.options) {
        newRuleItem.options = componentsFormData.options
        // delete componentsFormData.options
      }
      // if (['select', 'checkbox', 'radio'].includes(this.ruleItemType)) {
      //   newRuleItem.options = this.setSelectModel
      // }
      this.$emit('handleChangeConfig', newRuleItem, this.activeValue)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';

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
    @include flex-row-sb-c;
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