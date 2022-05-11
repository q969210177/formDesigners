<template>
  <div class="defaultformConfig">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="label长度"></a-form-model-item>
      <a-form-model-item label="wrapper长度"></a-form-model-item>
      <a-form-model-item label="label最长长度">
        <a-input-number id="inputNumber" v-model="form.labelWidth" :min="1" />
      </a-form-model-item>
      <a-form-model-item label="label位置">
        <a-radio-group name="radioGroup" v-model="form.labelAlign">
          <a-radio value="left">左</a-radio>
          <a-radio value="right">右</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-button @click="handleSubmitClick">确定</a-button>
      <a-button @click="$emit('cancal')">取消</a-button>
    </div>
  </div>
</template>
<script>
import { clone } from '@/utils/utils.js'
export default {
  name: 'defaultformConfig',
  props: {
    formConfig: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.form = clone(this.formConfig)
    },
    //点击确定
    handleSubmitClick() {
      this.$emit('handleSubmit', this.form)
    }
  }
}
</script>
<style lang="scss" scoped>
.defaultformConfig {
  width: 100%;
  height: 100%;
}
</style>