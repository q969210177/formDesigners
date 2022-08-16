<template>
  <div class="zformDesignersView">
    <zformDesigners>
      <template slot="header">
        <a-button type="link" @click="$router.push('/')">返回主页</a-button>
      </template>
    </zformDesigners>
  </div>
</template>
<script>
export default {
  name: "zformDesignersView",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.zformDesignersView {
  width: 100%;
  height: 100%;
}
</style>