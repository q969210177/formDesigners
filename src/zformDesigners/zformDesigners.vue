<template>
  <div class="zformDesigners">
    <header class="header">
      <slot name="header"></slot>
      <a-button @click="handleSetFormConfigClick">设置表单默认配置</a-button>
      <a-button @click="handleLookVueCode">下载vue文件</a-button>
    </header>
    <div class="main">
      <div class="left_menu_box">
        <componentsMenu></componentsMenu>
      </div>
      <div class="main_content" @drop="handleDropEvent" @dragover="handleDragoverEvent">
        <div class="main_content_operating">
          <a-button size="small" @click="handleOpenForm">预览</a-button>
          <!-- <a-button size="small">清空{{ruleItemType}}</a-button> -->
        </div>
        <div class="main_content_form">
          <zformDemo style="background: #fff;padding:4px" v-model="userInfoModel"
            @handleZformDemoItemDownClick="handleZformDemoItemDownClick"
            @handleZformDemoItemUpClick="handleZformDemoItemUpClick"
            @handleZformDemoCopyClick="handleZformDemoCopyClick" @handleZformDemoDelClick="handleZformDemoDelClick"
            :activeValue.sync="activeValue" :ruleItemType.sync="ruleItemType" :formConfig="formConfig"
            :rule="userInfoRule"></zformDemo>
        </div>
      </div>
      <div class="right_rule_config">
        <componentsConfig :key="componentsKey" @handleChangeConfig="handleChangeConfig" :activeValue.sync="activeValue"
          :rule="userInfoRule" :ruleItemType="ruleItemType"></componentsConfig>
      </div>
    </div>
    <footer></footer>
    <a-modal :footer="null" :destroyOnClose="true" title="设置表单默认配置" v-model="formModelConfig.show">
      <defaultformConfig @cancal="formModelConfig.show = false" @handleSubmit="handleDefaultformConfigSubmitClick"
        :formConfig="formConfig"></defaultformConfig>
    </a-modal>

    <a-modal :footer="null" :destroyOnClose="true" title="查看vue的代码" v-model="vueCodeModel.show">
      <div>{{ vueCodeModel.value }}</div>
    </a-modal>
    <a-modal :width="1000" :footer="null" :destroyOnClose="true" title="预览" v-model="formModel.show">
      <ZFormCreate v-model="userInfoModel" :formConfig="formConfig" :rule="userInfoRule"></ZFormCreate>
    </a-modal>
  </div>
</template>
<script>
import componentsMenu from './compoents/componentsMenu.vue'
import componentsConfig from './compoents/componentsConfig.vue'
import defaultformConfig from './compoents/defaultformConfig.vue'
import zformDemo from './zformDemo'
import { defaultFormConfig, setDefaultFormConfig } from './data/defaultData.js'
import {
  setCompoentId,
  getRuleItem,
  setRuleItem
} from '@/zformcreate/utils/utils'
export default {
  name: 'zformDesigners',
  components: {
    componentsMenu,
    zformDemo,
    componentsConfig,
    defaultformConfig
  },
  data() {
    return {
      formModelConfig: {
        show: false
      },
      vueCodeModel: {
        show: false,
        value: ''
      },
      formModel: {
        show: false
      },
      componentsKey: 0,
      userInfoModel: {},
      formConfig: defaultFormConfig,
      userInfoRule: [],
      activeValue: '',
      ruleItemType: ''
    }
  },
  watch: {
    activeValue() {
      this.componentsKey++
    }
  },
  mounted() {
    const userInfoRule = localStorage.getItem('rule')
    if (userInfoRule) {
      this.userInfoRule = JSON.parse(userInfoRule)
    }

  },
  methods: {
    //点击下移位置
    handleZformDemoItemDownClick(ruleItem, index) {
      if (index === this.userInfoRule.length - 1) return
      const newRuleItem = this.userInfoRule[index + 1]
      this.userInfoRule.splice(index, 1, newRuleItem)
      this.userInfoRule.splice(index + 1, 1, ruleItem)
      this.storageRule()
    },
    //点击上移位置
    handleZformDemoItemUpClick(ruleItem, index) {
      if (index === 0) return
      const newRuleItem = this.userInfoRule[index - 1]
      this.userInfoRule.splice(index, 1, newRuleItem)
      this.userInfoRule.splice(index - 1, 1, ruleItem)
      // console.log(newRuleItem, 'up')
      this.storageRule()
    },
    //点击复制表单
    handleZformDemoCopyClick(ruleItem, index) {
      const newRuleItem = JSON.parse(JSON.stringify(ruleItem))
      newRuleItem.fileId = setCompoentId()
      this.userInfoRule.splice(index, 0, newRuleItem)
      this.storageRule()
    },
    //点击设置表单的默认配置
    handleSetFormConfigClick() {
      this.formModelConfig.show = true
    },
    //表单的点击删除事件
    handleZformDemoDelClick({ fileId }, index) {
      if (fileId) {
        // const { index } = getRuleItem(this.userInfoRule, fileId)
        this.userInfoRule.splice(index, 1)
        // this.clickActive = null
        this.storageRule()
      }
    },
    handleRetuenForm(ruleKey, value, ruleItemKey) {
      const { ruleItem } = getRuleItem(this.userInfoRule, this.activeValue)
      setRuleItem(ruleItem, ruleKey, value, ruleItemKey)
    },
    //把数据存到 locas
    storageRule() {
      localStorage.removeItem('rule')
      localStorage.setItem('rule', JSON.stringify(this.userInfoRule))
    },
    //   //释放区域的拖拽结束事件
    handleDropEvent($event) {
      $event.preventDefault()
      $event.dataTransfer.dropEffect = 'move'
      const data = JSON.parse($event.dataTransfer.getData('text/plain'))
      data.fileId = setCompoentId()
      this.userInfoRule.push(data)
      this.storageRule()
      // this.userInfoModel.updateRule()
    },
    //   //拖拽中的事件
    handleDragoverEvent($event) {
      $event.preventDefault()
    },
    //设置表单config的弹窗确定事件
    handleDefaultformConfigSubmitClick(newFormConfig) {
      this.formConfig = newFormConfig
      this.formModelConfig.show = false
      setDefaultFormConfig(newFormConfig)
    },
    //当表单的配置项发生修改的时候 newFormConfig
    handleChangeConfig(newFormConfig) {
      const { ruleItem, index } = getRuleItem(
        this.userInfoRule,
        this.activeValue
      )
      for (const key in newFormConfig) {
        if (Object.hasOwnProperty.call(newFormConfig, key)) {
          const element = newFormConfig[key]
          ruleItem[key] = element
        }
      }
      this.userInfoRule.splice(index, 1, ruleItem)
      this.storageRule()
    },
    //打开预览的弹窗
    handleOpenForm() {
      this.formModel.show = true
    },
    //点击下载vue的文件
    handleLookVueCode() {
      function returnRuleStr(userInfoRule) {
        let str = '['
        userInfoRule.forEach(v => {
          str += JSON.stringify(v).replaceAll('"', '')
        })
        return str + ']'
      }
      function returnFormConfigStr(defaultFormConfig) {
        console.log(defaultFormConfig, 'defaultFormConfig')
        const returnObj = {
          ...defaultFormConfig
        }
        return JSON.stringify(returnObj).replaceAll('"', '')
      }
      const aTag = document.createElement('a')
      const s = '<' + '/script' + '>'
      const str =
        `
      <template>
        <div class="zFormCreate">
        <zFormCreate v-model="api" :formConfig="formConfig" :rule="rule"></zFormCreate>
        </div>
      </template>
      <script>
        export default {
          data() {
            api: {},
            formConfig:${returnFormConfigStr(defaultFormConfig)},
            rule: ${returnRuleStr(this.userInfoRule)}
          }
        }
      ` +
        s +
        `<style lang="css" scoped>
          .zFormCreate{
            width:100%;
            height:100%
          }
        </style>`
      const blob = new Blob([str])
      aTag.download = 'zFormCreate.vue'
      aTag.href = URL.createObjectURL(blob)
      aTag.click()
      URL.revokeObjectURL(blob)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';

.zformDesigners {
  width: 100vw;
  height: 100vh;

  .ant-btn+.ant-btn {
    margin-left: 4px;
  }

  .header {
    height: 50px;
    width: 100%;
    @include flex-row-s-c;
    padding: 4px 8px;
    border: 1px solid #ececec;
  }

  .main {
    width: 100%;
    height: calc(100% - 80px);
    //
    // .flex-row-sb-c();
    @include flex-row-sb-c;
    border-right: 1px solid #ececec;
    border-left: 1px solid #ececec;
    border-bottom: 1px solid #ececec;

    .left_menu_box {
      width: 15%;
      height: 100%;
      border-right: 1px solid #ececec;
    }

    .right_rule_config {
      width: 15%;
      height: 100%;
      border-left: 1px solid #ececec;
    }

    .main_content {
      width: 70%;
      height: 100%;

      .main_content_operating {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #ececec;
        @include flex-row-e-c;
        padding: 0 8px;
        // border-left: 1px solid #ececec;
      }

      .main_content_form {
        padding: 8px 12px;
        width: 100%;
        // min-height: calc(100% - 40px);
        height: calc(100% - 40px);
        // background: #f7f7f7;
        overflow-y: auto;
        border: dashed 1px red;

      }
    }
  }

  footer {
    height: 30px;
    border-right: 1px solid #ececec;
    border-left: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
  }
}
</style>
