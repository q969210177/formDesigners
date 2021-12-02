<template>
  <div class="cDataPick">
    <a-date-picker v-bind="$attrs" @change="handleChange" />
  </div>
</template>
<script>
export default {
  name: "cDataPick",
  props: {
    value: {},
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange(v) {
      const value = v.format(this.format);
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layOut.scss";
.cDataPick {
  width: 100%;
  height: 100%;
  @include flex-row-s-c;
}
</style>
