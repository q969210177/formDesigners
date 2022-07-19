<template>
  <div class="cAlert">
    <a-alert v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  name: "cAlert",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.cAlert {
  width: 100%;
  height: 100%;
}
</style>