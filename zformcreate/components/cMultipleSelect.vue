<template>
  <!-- 多选的下拉框 -->
  <div class="cmultipleSelect">
    <a-select
      mode="multiple"
      :getPopupContainer="() => $el"
      v-model="defaultValue"
      v-bind="$attrs"
      v-on="listeners"
      @change="handleSelectChange"
      style="width: 100%"
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
  name: "cmultipleSelect",
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
      require: true,
    },
  },
  computed: {
    listeners() {
      if (this.$listeners.change) {
        delete this.$listeners.change;
      }
      return {};
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
    handleSelectChange(v) {
      this.$emit("change", v);
      this.$emit("input", v);
    },
  },
};
</script>
<style lang="scss" scoped>
.cmultipleSelect {
  width: 100%;
  height: 100%;
}
</style>