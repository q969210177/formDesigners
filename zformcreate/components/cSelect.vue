<template>
  <div class="cSelect">
    <a-select
      :getPopupContainer="() => $el"
      v-model="defaultValue"
      v-bind="$attrs"
      v-on="listeners"
      @change="handleSelectChange"
      style="width: 100%"
    >
      <a-select-option
        :key="v[valueKey]"
        v-for="v in options"
        v-bind="v"
        :value="v[valueKey]"
      >
        {{ v[labelKey] }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: "CSelect",
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
      default: undefined,
    },
  },
  data() {
    return {
      defaultValue: "",
    };
  },
  computed: {
    listeners() {
      if (this.$listeners.change) {
        delete this.$listeners.change;
      }
      return {};
    },
  },
  watch: {
    value(newV) {
      this.defaultValue = newV;
      // this.defaultValue = newV === "" ? undefined : newV;
    },
  },
  mounted() {
    this.defaultValue = this.value;
    // this.defaultValue = this.value === "" ? undefined : this.value;
  },
  methods: {
    handleSelectChange(v, selectNode) {
      this.$emit("input", v);
      this.$emit("change", v, selectNode, this.options);
    },
  },
};
</script>
<style lang="scss" scoped>
.cSelect {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
