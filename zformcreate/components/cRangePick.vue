<template>
  <div class="cRangePick">
    {{ test }}
    <a-range-picker
      v-model="defaultValue"
      v-bind="$attrs"
      v-on="$listeners"
      @change="handleChange"
    />
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "CRangePick",
  props: {
    value: {},
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
    formatArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      defaultValue: null,
    };
  },
  watch: {
    value(newV) {
      if (newV) {
        this.setDefaultValue();
      }
    },
  },

  mounted() {
    this.setDefaultValue();
  },
  methods: {
    //setDefaultValue
    setDefaultValue() {
      if (
        Array.isArray(this.value) &&
        this.value.every((v) => moment(v).isValid())
      ) {
        this.defaultValue = this.value.map((v) => moment(v));
      }
    },
    //datepicker
    handleChange(v) {
      const value = v.map((item) => item.format(this.format));
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.cRangePick {
  width: 100%;
  height: 100%;
}
</style>
