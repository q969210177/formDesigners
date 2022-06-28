<template>
  <div class="cSlider">
    <a-slider
      :getTooltipPopupContainer="() => $el"
      @change="handleSelectChange"
      v-model="defaultValue"
      v-bind="$attrs"
      v-on="$listeners"
    ></a-slider>
  </div>
</template>
<script>
export default {
  name: "cSlider",
  props: {
    value: {},
  },
  watch: {
    value(newV) {
      this.defaultValue = newV;
    },
  },
  data() {
    return {
      defaultValue: 0,
    };
  },
  mounted() {
    this.defaultValue = this.value;
  },
  methods: {
    handleSelectChange(v) {
      this.$emit("input", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.cSlider {
  width: 100%;
  height: 100%;
}
</style>
