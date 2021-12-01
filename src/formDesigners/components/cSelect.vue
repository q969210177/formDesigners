<template>
  <div class="cSelect">
    <a-select
      v-bind="$attrs"
      v-on="$listeners"
      style="width: 100%"
      @change="handleSelectChange"
    >
      <a-select-option
        :key="v[valueKey] + k"
        v-for="(v, k) in options"
        :value="v[valueKey]"
      >
        {{ v[labelKey] }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: "cSelect",
  props: {
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
    value: {
      default: undefined,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSelectChange(v) {
      this.$emit("input", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.cSelect {
  width: 100%;
  height: 100%;
}
</style>
