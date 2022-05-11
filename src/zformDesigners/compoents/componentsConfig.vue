<template>
  <div class="componentsConfig">
    <header class="header">组件配置{{activeValue}}</header>
    <main class="main" v-show="activeValue">
      <div class="form_config">
        <h3>表单项配置</h3>
        <a-form-model :model="formConfig">
          <a-form-model-item label="字段">
            <a-input @change="(e)=>handleInputChange(e,'fileId')" v-model="formConfig.fileId" />
          </a-form-model-item>
          <a-form-model-item label="字段名">
            <a-input @change="(e)=>handleInputChange(e,'label')" v-model="formConfig.label" />
          </a-form-model-item>
          <!-- <a-form-model-item label="Activity zone">
            <a-select v-model="form.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>-->
          <!-- <a-form-model-item label="Activity time">
            <a-date-picker
              v-model="form.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>-->
          <!-- <a-form-model-item label="Instant delivery">
            <a-switch v-model="form.delivery" />
          </a-form-model-item>
          <a-form-model-item label="Activity type">
            <a-checkbox-group v-model="form.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="Resources">
            <a-radio-group v-model="form.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Activity form">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>-->
        </a-form-model>
      </div>
      <div class="components_config">
        <h3>组件配置</h3>
      </div>
    </main>
  </div>
</template>
<script>
import { clone } from '@/utils/utils.js'

import {
  // returnEvent,
  getRuleItem,
  setCompoentId
  // returnSlots,
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
    // formConfig: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       labelCol: { span: 4 },
    //       wrapperCol: {
    //         span: 20
    //       },
    //       labelAlign: 'left',
    //       labelWidth: 130,
    //       colonStatus: true
    //     }
    //   }
    // },
    activeValue: {
      type: [String, Number]
    },
    ruleItemType: {
      type: [String, Number]
    }
  },
  watch: {
    activeValue() {
      this.init()
    }
  },
  data() {
    return {
      tabsModel: '',
      formConfig: {
        fileId: '',
        label: ''
        // name: '',
        // region: undefined,
        // date1: undefined,
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
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
      this.formConfig = {
        fileId: ruleItem.fileId,
        label: ruleItem.label
      }
      // activeValue
    },
    //fileId label的change事件
    // eslint-disable-next-line no-unused-vars
    handleInputChange(event, formKey) {
      const {
        target: { value }
      } = event
      if (!value) {
        this.formConfig.fileId = setCompoentId()
      }
      const { ruleItem, index } = getRuleItem(this.rule, this.activeValue)
      const newRuleItem = Object.assign(clone(ruleItem), this.formConfig)
      this.$emit('handleChangeConfig', newRuleItem, index)
      this.$emit('update:activeValue', this.formConfig.fileId)
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