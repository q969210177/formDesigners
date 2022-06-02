<template>
  <div class="defaultformConfig">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="label长度">
        <a-slider
          :max="24"
          @afterChange="(v)=>
          handleColChange(v,'label')"
          v-model="form.labelCol.span"
        />
      </a-form-model-item>
      <a-form-model-item label="wrapper长度">
        <a-slider
          @afterChange="(v)=>
          handleColChange(v,'wrap')"
          v-model="form.wrapperCol.span"
          :max="24"
        />
      </a-form-model-item>
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
      form: {
        labelCol: { span: 0 },
        wrapperCol: { span: 0 }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.form = clone(this.formConfig)
    },
    //lable和warap的change事件
    handleColChange(v, type) {
      if (type === 'label' && v + this.form.wrapperCol.span > 24) {
        console.log(this.$message)
        this.$message.warning('两者之和最大值为24')
        this.form.wrapperCol.span = 24 - v
        return
      }
      if (type === 'wrap' && v + this.form.labelCol.span > 24) {
        console.log(this.$message)
        this.$message.warning('两者之和最大值为24')
        this.form.labelCol.span = 24 - v
        return
      }
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