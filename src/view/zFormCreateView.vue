<template>
  <div class="zFormCreate">
    <div class="form_box">
      <ZFormCreate v-model="api" :rule="rule"></ZFormCreate>
    </div>
  </div>
</template>
<script>
export default {
  name: "zFormCreate",
  data() {
    return {
      api: {},
      rule: [],
    };
  },
  mounted() {
    const rule = localStorage.getItem("rule");
    if (rule) {
      this.rule = JSON.parse(rule);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";
.zFormCreate {
  width: 100%;
  height: 100%;
  @include flex-row-c-c;
  padding: 10px;
  flex-wrap: wrap;
  .form_box {
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    border: 1px solid #f7f7f7;
    padding: 10px;
  }
}
</style>