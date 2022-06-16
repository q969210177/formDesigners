<template>
  <div class="cInputNumber">
    <a-input-number v-model="defaultValue" v-bind="$attrs" v-on="$listeners" @change="handleChange"></a-input-number>
  </div>
</template>
<script>
export default {
  name: 'cInputNumber',
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      defaultValue: null
    }
  },
  watch: {
    value(newV) {
      this.defaultValue = newV
    }
  },
  mounted() {
    this.defaultValue = this.value
  },
  methods: {
    handleChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>
<style lang="scss" scoped>
.cInputNumber {
  width: 100%;
  height: 100%;
}
</style>