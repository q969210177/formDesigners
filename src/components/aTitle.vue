<template>
  <div class="aTitle" :class="setClass()">
    <div class="title_header flex-row-sb-c">
      <div class="title_header_left flex-col-c-c">
        <slot name="headerLeft">
          <span class="pl-10 font-size-18 font-weight-80">{{ title }}</span>
        </slot>
      </div>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div class="title_body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    // 设置class
    setClass() {
      const { className } = this.$attrs
      if (className) {
        return className
      }
      // console.log(attr)
      return 'width-100 height-100'
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/less/layOut.less';
.aTitle {
  .title_header {
    width: 100%;
    height: 42px;
    // padding: 0 32px;
    // padding-left: 20px;
    .title_header_left {
      height: 100%;
      position: relative;
      &::after {
        position: absolute;
        content: '';
        width: 5px;
        border-radius: 2px;
        background: #0084ff;
        height: 50%;
        top: 25%;
        left: 0;
      }
    }
  }
  .title_body {
    width: 100%;
    height: calc(~'100% - 42px');
  }
}
</style>
