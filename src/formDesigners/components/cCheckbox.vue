<template>
  <div class="cCheckbox">cCheckbox</div>
</template>
<script>
export default {
  name: "cCheckbox",
  data() {
    return {};
  },
  methods: {
    handleChange() {
      this.$emit("input", 11);
    },
  },
};
</script>
<style lang="scss" scoped>
.cCheckbox {
  width: 100%;
  height: 100%;
}
</style>
