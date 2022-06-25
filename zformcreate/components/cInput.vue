<template>
  <div class="cInput">
    <a-input
      v-model="defaultValue"
      v-bind="returnAttrs"
      v-on="$listeners"
      @change="handleChange"
      style="width: 100%"
    >
      <template slot="prefix" v-if="prefix">
        <i :class="['iconfont', prefix]"></i>
      </template>
    </a-input>
  </div>
</template>
<script>
export default {
  name: "cInput",
  props: {
    value: {
      require: true,
    },
    prefix: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      defaultValue: "",
    };
  },
  computed: {
    returnAttrs() {
      if (this.$attrs.prefix) {
        delete this.$attrs.prefix;
      }
      return this.$attrs;
    },
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
    handleChange($event) {
      const {
        target: { value },
      } = $event;
      // this.$emit("change", value, $event)
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.cInput {
  width: 100%;
  height: 100%;
}
</style>
