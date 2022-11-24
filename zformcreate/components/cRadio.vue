<template>
  <div class="cRadio">
    <template v-if="isButton === 'btn'">
      <a-radio-group
        v-model="radioValue"
        @change="handleChange"
        v-bind="attrs"
        buttonStyle="solid"
        v-on="$listeners"
      >
        <a-radio-button
          :value="v[valueKey]"
          v-for="(v, k) in options"
          :key="v[valueKey] + k"
        >
          {{ v[labelKey] }}
        </a-radio-button>
      </a-radio-group>
    </template>
    <template v-else>
      <a-radio-group
        v-model="radioValue"
        @change="handleChange"
        v-bind="attrs"
        buttonStyle="solid"
        v-on="listeners"
      >
        <a-radio
          :value="v[valueKey]"
          v-for="(v, k) in options"
          :key="v[valueKey] + k"
        >
          {{ v[labelKey] }}
        </a-radio>
      </a-radio-group>
    </template>
    <!-- </a-radio-group> -->
  </div>
</template>
<script>
export default {
  name: "CRadio",
  props: {
    value: {
      type: [String, Number],
      require: true,
    },
    isButton: {
      type: String,
      validator: (v) => {
        return ["btn", "radio"].includes(v);
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
  data() {
    return {
      radioValue: null,
    };
  },
  computed: {
    attrs() {
      if (this.$attrs.options) {
        delete this.$attrs.options;
      }
      return this.$attrs;
    },
    listeners() {
      if (this.$listeners.change) {
        delete this.$listeners.change;
      }
      return this.$listeners;
    },
  },
  watch: {
    value(newV) {
      this.radioValue = newV;
    },
  },
  mounted() {
    this.radioValue = this.value;
  },
  methods: {
    handleChange(v) {
      const {
        target: { value },
      } = v;
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.cRadio {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
