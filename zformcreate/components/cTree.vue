<template>
  <div class="cTree">
    <a-tree
      v-bind="$attrs"
      v-on="listeners"
      @check="handleCheckChange"
      v-model="checkedKeys"
      :tree-data="options"
    />
  </div>
</template>
<script>
export default {
  name: "cTree",
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {},
  },
  watch: {
    value() {
      this.checkedKeys = this.value;
    },
  },
  computed: {
    listeners() {
      if (this.$listeners.check) {
        delete this.$listeners.check;
      }
      return {};
    },
  },
  mounted() {
    this.checkedKeys = this.value;
  },
  data() {
    return {
      checkedKeys: [],
    };
  },
  methods: {
    handleCheckChange(v, $e) {
      this.$emit("input", v);
      this.$emit("check", v, $e);
    },
  },
};
</script>
<style lang="scss" scoped>
.cTree {
  width: 100%;
  height: 100%;
}
</style>
