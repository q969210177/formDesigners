<template>
  <div class="componentsConfig">
    <header class="header">
      组件配置
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
import { setInstallRule } from "@/utils/utils"
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
        const props = ruleItem.props
        const propsKey = Object.keys(props)
        const compoentsRules = [
          {
            type: 'input',
            label: '展示的标题',
            fileId: 'text',
            value: "",
            span: 24,

            attrArr: ['divider']
          },
          {
            type: 'number',
            label: '高度',
            fileId: 'height',
            value: 50,
            span: 24,

            attrArr: ['divider']
          },
          {
            type: 'setSelectOption',
            label: '配置数据',
            fileId: 'options',
            value: [],
            span: 24,

            attrArr: ['select', 'checkbox', 'radio']
          },
          // 
          {
            type: 'switch',
            label: '是否虚线',
            fileId: 'dashed',
            value: false,
            span: 24,

            attrArr: ['divider']
          },
          {
            type: 'radio',
            label: '标题的位置',
            fileId: 'orientation',
            value: "",
            span: 24,
            options: [
              { label: '左', value: "left" },
              { label: '中', value: "center" },
              { label: '右', value: "right" },
            ],

            attrArr: ['divider']
          },
          {
            type: 'switch',
            label: '清楚图标',
            fileId: 'allowClear',
            value: false,
            span: 24,

            attrArr: ['input', 'select']
          },
          {
            type: 'activeIcon',
            label: '前置按钮',
            fileId: 'prefix',
            value: '',
            span: 24,
            attrArr: ['input', 'select']
          },
          {
            type: 'input',
            label: '未选中的文字内容',
            fileId: 'unCheckedChildren',
            value: "",
            span: 24,
            props: {
              maxLength: 2
            },

            attrArr: ['switch',]
          },
          {
            type: 'input',
            label: '选中的文字内容',
            fileId: 'checkedChildren',
            value: "",
            span: 24,
            props: {
              maxLength: 2
            },

            attrArr: ['switch',]
          },
          {
            type: 'number',
            label: '最大长度',
            fileId: 'maxLength',
            value: 10,
            span: 24,

            attrArr: ['input']
          },
          {
            type: 'number',
            label: '最大值',
            fileId: 'max',
            value: 10,
            span: 24,

            attrArr: ['slider']
          },
          {
            type: 'number',
            label: '最小值',
            fileId: 'min',
            value: 10,
            span: 24,

            attrArr: ['slider']
          },
          // max
          {
            type: 'switch',
            label: '禁用',
            fileId: 'disabled',
            value: false,
            span: 24,

            attrArr: [
              'input',
              'datePicker',
              'rangePicker',
              'select',
              'radio',
              'checkbox',
              'switch',
              'slider'
            ]
          },
          {
            type: 'radio',
            label: '组件大小',
            fileId: 'size',
            value: "",
            span: 24,
            options: [
              {
                label: "默认",
                value: "default"
              },
              {
                label: "小",
                value: "small"
              },
            ],

            attrArr: [
              'input',
              'datePicker',
              'rangePicker',
              'select',
              'switch',
              'slider'
            ]
          }
        ].concat(compoentsRule)

        return compoentsRules.filter(item => {
          if (propsKey.includes(item.fileId)) {
            item.value = props[item.fileId]
          }
          if (item.attrArr.includes(this.ruleItemType)) {
            return item
          }
        })
      }
      return []
    },
    formRule() {
      const value = getRuleItem(this.rule, this.activeValue)
      if (this.activeValue && value) {
        const { ruleItem } = value
        const formRules = [
          {
            type: 'input',
            label: 'fileId',
            fileId: 'fileId',
            value: ruleItem.fileId,
            props: {
              disabled: ruleItem.itemType === "style"
            },
            span: 24,
            attrArr: ["form", "style"],

          },
          {
            type: 'input',
            label: 'label',
            fileId: 'label',
            value: '',
            span: 24,
            attrArr: ["form",],

          },
          {
            type: 'setRulesValidate',
            label: '验证规则',
            fileId: 'rules',
            value: [],
            options: [],
            props: {
              validateType: this.ruleItemType
            },
            attrArr: ["form",],

            span: 24
          },

          {
            type: 'slider',
            label: '长度',
            fileId: 'span',
            value: 1,
            span: 24,
            props: {
              max: 24,
              min: 1
            },
            attrArr: ["form"],
          }
        ].concat(formRule)

        return formRules.filter(item => {
          item.value = ruleItem[item.fileId]

          if (item.attrArr.includes(ruleItem.itemType)) {
            return item
          }
        })
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
    this.init()
  },
  mounted() { },
  methods: {
    init() {
      // const value = getRuleItem(this.rule, this.activeValue)
      // if (this.activeValue && value) {
      //   const { ruleItem } = value
      //   // if (['select', 'checkbox', 'radio'].includes(this.ruleItemType)) {
      //   //   this.setSelectModel = ruleItem.options
      //   //   console.log(this.setSelectModel, " this.setSelectModel");
      //   // }
      // }
    },
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