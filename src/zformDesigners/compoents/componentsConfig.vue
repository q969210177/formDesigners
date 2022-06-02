<template>
  <div class="componentsConfig">
    <header class="header">组件配置</header>
    <main class="main" v-show="activeValue">
      <div class="form_config">
        <h3>表单项配置</h3>
        <ZFormCreate v-model="api" :formConfig="formRuleConfig" :rule="defaultRule"></ZFormCreate>
      </div>
      <div class="components_config">
        <h3>组件配置</h3>
        <ZFormCreate
          @options-handleSubmitOptions="optionsHandleSubmitOptions"
          v-model="formModel"
          :formConfig="formRuleConfig"
          :rule="formRule"
        ></ZFormCreate>
      </div>
    </main>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
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
    }
  },
  watch: {
    activeValue() {
      this.init()
    }
  },
  computed: {
    formRule() {
      if (this.activeValue) {
        const {
          ruleItem: { type }
        } = getRuleItem(this.rule, this.activeValue)
        const formRule = [
          {
            type: 'setSelectOption',
            label: '配置数据',
            fileId: 'options',
            value: '',
            options: [],
            span: 24,
            attts: ['select', 'checkbox']
          }
        ]
        return formRule.filter(v => {
          if (v.attts.includes(type)) {
            return v
          }
        })
      }
      return []
    }
  },
  data() {
    return {
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
            blur: ($event, v) => {
              const {
                target: { value }
              } = $event
              console.log(v)
              console.log(this.handleInputChange)
            }
          }
        },
        {
          type: 'input',
          label: 'fileId',
          fileId: 'fileId',
          value: '',
          span: 24
        }
      ],
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
      props: {},
      formConfig: {
        // fileId: '',
        // label: '',
        // options: []
      },
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
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      const { ruleItem } = getRuleItem(this.rule, this.activeValue)
      console.log(ruleItem, 'ruleItem')
      //       col: Object
      // fileId: "l3wlkxee360"
      // formProps: Object
      // label: ""
      // options: Array(1)
      // props: Object
      // rules: Array(0)
      // type: "select"
      // value: ""
      // if (ruleItem.options && getDataType(ruleItem.options)) {
      //   //
      // }
      // console.log(getDataType(ruleItem.options), 'ruleItem')
      this.props = ruleItem.props
      this.formConfig = {
        fileId: ruleItem.fileId,
        label: ruleItem.label,
        ...ruleItem
      }
      //这里主要是为了一会儿提交的时候 不影响组件的参数设置
      delete this.formConfig.props
    },
    //点击修改组件options newOptions
    optionsHandleSubmitOptions() {
      // this.formConfig.options = newOptions
      // const { ruleItem, index } = getRuleItem(this.rule, this.activeValue)
      // const newRuleItem = Object.assign(clone(ruleItem), this.formConfig)
      // this.$emit('handleChangeConfig', newRuleItem, index)
      // this.$emit('update:activeValue', this.formConfig.fileId)
    },
    //fileId label的change事件
    // eslint-disable-next-line no-unused-vars
    handleInputChange(value, formKey) {
      // const {
      //   target: { value }
      // } = event
      // if (!value) {
      //   this.formConfig.fileId = setCompoentId()
      // }
      const { ruleItem, index } = getRuleItem(this.rule, this.activeValue)
      // const newRuleItem = Object.assign(clone(ruleItem), this.formConfig)
      // this.$emit('handleChangeConfig', newRuleItem, index)
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
    .form_config {
      width: 100%;
    }
    .components_config {
      width: 100%;
    }
  }
}
</style>