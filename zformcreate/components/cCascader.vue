<template>
  <div class="cCascader">
    <a-cascader
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
      }
    },
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      defaultValue: []
    };
  },
  watch: {
    value(newV) {
      this.defaultValue = newV;
    }
  },
  mounted() {
    this.defaultValue = this.value;
  },
  methods: {
    handleChange(v) {
      console.log(v, "v");
      this.$emit("input", v);
    }
  }
};
</script>
<style lang="less" scoped>
.cCascader {
  width: 100%;
  height: 100%;
}
</style>
