<template>
  <div class="cDataPick">cDataPick</div>
</template>
<script>
export default {
  name: "cDataPick",
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
.cDataPick {
  width: 100%;
  height: 100%;
}
</style>
