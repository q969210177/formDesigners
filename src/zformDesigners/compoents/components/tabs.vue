<template>
  <div class="tabs">
    <div
      :class="['tabs_item',{tabsItemActive:value===v.key},`width-${Math.ceil(100/tabsOption.length)}`]"
      v-for="(v,k) in tabsOption"
      @click="$emit('input',v.key)"
      :key="k"
    >{{v.name}}</div>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    value: {
      type: [String, Number, Boolean]
    },
    tabsOption: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';
.tabs {
  width: 100%;
  height: 100%;
  @include flex-row-s-c;
  .tabs_item {
    width: 100%;
    height: 100%;
    border-bottom: 2px solid transparent;
    @include flex-row-c-c;
    transition: 0.8s all;
  }
  .tabsItemActive {
    border-bottom: 2px solid #409eff;
  }
}
</style>