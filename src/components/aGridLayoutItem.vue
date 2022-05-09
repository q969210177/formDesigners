<template>
  <div class="aGridLayoutItem" :class="setFlex()">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'aGridLayoutItem',
  provide() {
    return {
      elFormItem: this
    }
  },
  props: {
    //占据几行几列
    layOut: {
      type: Object,
      default: () => {
        return { col: 1, row: 1 }
      }
    },
    //设定排列方式 主要是flex模型布局
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$emit('layOut', this.layOut)
  },
  methods: {
    setFlex() {
      const flexClassObj = {
        rowSS: 'flex-row-s-s',
        rowSE: 'flex-row-s-e',
        rowSC: 'flex-row-s-c',
        rowES: 'flex-row-e-s',
        rowEE: 'flex-row-e-e',
        rowEC: 'flex-row-e-c',
        rowCS: 'flex-row-c-s',
        rowCE: 'flex-row-c-e',
        rowCC: 'flex-row-c-c',
        rowSBS: 'flex-row-sb-s',
        rowSBC: 'flex-row-sb-c',
        rowSBE: 'flex-row-sb-e',
        rowSAS: 'flex-row-sa-s',
        rowSAC: 'flex-row-sa-c',
        rowSAE: 'flex-row-sa-e',
        colSS: 'flex-col-s-s',
        colSE: 'flex-col-s-e',
        colSC: 'flex-col-s-c',
        colES: 'flex-col-e-s',
        colEE: 'flex-col-e-e',
        colEC: 'flex-col-e-c',
        colCS: 'flex-col-c-s',
        colCE: 'flex-col-c-e',
        colCC: 'flex-col-c-c',
        colSBS: 'flex-col-sb-s',
        colSBC: 'flex-col-sb-c',
        colSBE: 'flex-col-sb-e',
        colSAS: 'flex-col-sa-s',
        colSAC: 'flex-col-sa-c',
        colSAE: 'flex-col-sa-e'
      }
      if (flexClassObj[this.type]) {
        return flexClassObj[this.type]
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.aGridLayoutItem {
  width: 100%;
  height: 100%;
  // border: 0.5px solid #999;
  // border-left: 1px solid #999;
  // border-top: 1px solid #999;
  // border: 1px solid red;
}
</style>
