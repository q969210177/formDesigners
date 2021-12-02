<template>
  <div class="cRadio">
    <a-radio-group v-model="value" @change="handleChange">
      <a-radio :value="1"> A </a-radio>
      <a-radio :value="2"> B </a-radio>
      <a-radio :value="3"> C </a-radio>
      <a-radio :value="4"> D </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  name: "cRadio",
  props: {
    value: {
      type: [String, Number],
      require: true,
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

  data() {
    return {};
  },
  methods: {
    handleChange(v) {
      const {
        target: { value },
      } = v;
      console.log(value, "radio");

      this.$emit("input", value);
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
