<template>
  <div class="componentsConfig">
    <header class="header">组件配置{{ruleItemType}}</header>
    <main class="main" v-show="activeValue">
      <div class="form_config">
        <h3>表单项配置</h3>
        <ZFormCreate v-model="api" :formConfig="formRuleConfig" :rule="defaultRule"></ZFormCreate>
      </div>
      <div class="components_config">
        <h3>组件配置</h3>
        <div
          class="independent_dom_class"
          v-if="['select', 'checkbox', 'radio'].includes(ruleItemType)"
        >
          <span>配置数据:</span>
          <div class="width-70">
            <setSelectOption @handleSubmitOptions="handleChangeModel" v-model="setSelectModel"></setSelectOption>
          </div>
        </div>
        <!-- <div class="independent_dom_class" v-if="['input'].includes(ruleItemType)">
          <span>设置验证规则:</span>
          <div class="width-50"></div>
        </div>-->
        <ZFormCreate v-model="formModel" :formConfig="formRuleConfig" :rule="formRule"></ZFormCreate>
      </div>
    </main>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
const propsKeyArr = ['disabled']
import { clone } from '@/utils/utils.js'

import {
  getRuleItem,
  setCompoentId
  // getDataType
} from '@/zformcreate/utils/utils'
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
  watch: {},
  computed: {
    formRule() {
      if (this.activeValue) {
        const formRule = [
          {
            type: 'switch',
            label: '清楚图标',
            fileId: 'allowClear',
            value: false,
            span: 24,
            on: {
              change: () => {
                this.handleChangeModel()
              }
            },
            attrArr: ['input', 'select']
          },
          {
            type: 'number',
            label: '最大长度',
            fileId: 'maxLength',
            value: 10,
            span: 24,
            on: {
              change: () => {
                this.handleChangeModel()
              }
            },
            attrArr: ['input']
          },
          {
            type: 'number',
            label: '最大值',
            fileId: 'max',
            value: 10,
            span: 24,
            on: {
              change: () => {
                this.handleChangeModel()
              }
            },
            attrArr: ['slider']
          },
          {
            type: 'number',
            label: '最小值',
            fileId: 'min',
            value: 10,
            span: 24,
            on: {
              change: () => {
                this.handleChangeModel()
              }
            },
            attrArr: ['slider']
          },
          // max
          {
            type: 'switch',
            label: '禁用',
            fileId: 'disabled',
            value: false,
            span: 24,
            on: {
              change: () => {
                this.handleChangeModel()
              }
            },
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
          }
        ]
        return formRule.filter(v => {
          if (v.attrArr.includes(this.ruleItemType)) {
            return v
          }
        })
      }
      return []
    }
  },
  data() {
    return {
      setSelectModel: [],
      tabsModel: '',
      formModel: {},
      defaultRule: [
        {
          type: 'input',
          label: 'label',
          fileId: 'label',
          value: '',
          span: 24,
          on: {
            blur: $event => {
              let {
                target: { value }
              } = $event
              this.handleChangeModel(value, 'label')
            }
          }
        },
        {
          type: 'input',
          label: 'fileId',
          fileId: 'fileId',
          value: '',
          span: 24,
          on: {
            blur: $event => {
              let {
                target: { value }
              } = $event
              if (!value) {
                value = setCompoentId()
              }
              this.handleChangeModel(value, 'label')
            }
          }
        },
        {
          type: 'setRulesValidate',
          label: '验证规则',
          fileId: 'rules',
          value: [],
          options: [],
          on: {
            handleSubmitOptions: v => {
              this.handleChangeModel()
            }
          },
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
          on: {
            afterChange: () => {
              this.handleChangeModel()
            }
          }
        }
      ],
      formPropsRule: [],
      api: {},
      formRuleConfig: {
        labelCol: { span: 8 },
        wrapperCol: {
          span: 16
        },
        labelAlign: 'left',
        labelWidth: 130,
        colonStatus: true
      },
      col: {
        span: 0
      },
      formProps: {},
      formConfig: {},
      tabsOption: [
        {
          name: '表单配置',
          key: '1'
        },
        {
          name: '组件配置',
          key: '2'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      if (this.activeValue) {
        const { ruleItem } = getRuleItem(this.rule, this.activeValue)
        const props = ruleItem.props
        const propsKey = Object.keys(props)
        if (['select', 'checkbox', 'radio'].includes(this.ruleItemType)) {
          this.setSelectModel = ruleItem.options
        }
        this.defaultRule.forEach(item => {
          if (ruleItem[item.fileId] && this.api.setValue) {
            this.api.setValue(item.fileId, ruleItem[item.fileId])
          } else {
            item.value = ruleItem[item.fileId]
          }
        })
        this.formRule.forEach(item => {
          if (propsKey.includes(item.fileId)) {
            item.value = props[item.fileId]
          }
        })
      }
    },
    //change事件 用来改变外部的参数设置
    handleChangeModel() {
      const defaultFormData = this.api.getFormData()
      const componentsFormData = this.formModel.getFormData()
      const newRuleItem = {
        ...defaultFormData,
        props: {
          ...componentsFormData
        }
      }
      console.log(newRuleItem, 'newRuleItem')
      if (['select', 'checkbox', 'radio'].includes(this.ruleItemType)) {
        newRuleItem.options = this.setSelectModel
      }
      this.$emit('handleChangeConfig', newRuleItem)
      // this.$emit('update:activeValue', this.formConfig.fileId)
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