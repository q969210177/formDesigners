<template>
  <div class="cSwitch">
    <a-switch v-model="activeValue" @change="handleSwitchChange" />
  </div>
</template>
<script>
export default {
  name: "cSwitch",
  props: {
    value: {
      type: [Boolean, Number],
      require: true,
    },
  },
  watch: {
    value(newV) {
      this.activeValue = newV;
    },
  },
  data() {
    return {
      activeValue: false,
    };
  },
  mounted() {
    this.activeValue = this.value;
  },
  methods: {
    handleSwitchChange(v) {
      this.$emit("input", v);
      this.$emit("change", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.cSwitch {
  width: 100%;
  height: 100%;
}
</style>
