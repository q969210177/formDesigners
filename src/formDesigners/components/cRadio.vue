<template>
  <div class="cRadio">cRadio</div>
</template>
<script>
export default {
  name: "cRadio",
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
.cRadio {
  width: 100%;
  height: 100%;
}
</style>
