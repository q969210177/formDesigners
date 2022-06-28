<template>
  <div class="cCheckbox">
    <a-checkbox-group
      v-model="checkBoxValue"
      @change="handleChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <a-checkbox
        :value="v[valueKey]"
        v-for="(v, k) in options"
        :key="v[valueKey] + k"
        >{{ v[labelKey] }}</a-checkbox
      >
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  name: "cCheckbox",
  props: {
    value: {
      type: [Array, String],
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
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
  },
  watch: {
    value(newV) {
      this.checkBoxValue = newV;
    },
  },
  data() {
    return {
      checkBoxValue: [],
    };
  },
  mounted() {
    this.checkBoxValue = this.value;
  },
  methods: {
    //多选框的change事件
    handleChange() {
      this.$emit("input", this.checkBoxValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.cCheckbox {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
