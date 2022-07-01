<template>
  <div class="cCascader">
    <a-cascader
      :getPopupContainer="() => $el"
      v-model="defaultValue"
      @change="handleChange"
      :options="options"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>
<script>
export default {
  name: "cCascader",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      defaultValue: [],
    };
  },
  watch: {
    value(newV) {
      this.defaultValue = newV;
    },
  },
  mounted() {
    this.defaultValue = this.value;
  },
  methods: {
    handleChange(v) {
      this.$emit("input", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.cCascader {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
