<template>
  <div class="cRadio">
    <a-radio-group v-model="radioValue" @change="handleChange">
      <a-radio :value="v[valueKey]" v-for="(v, k) in options" :key="v.value + k">{{ v[labelKey] }}</a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  name: 'CRadio',
  props: {
    value: {
      type: [String, Number],
      require: true
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      radioValue: null
    }
  },
  watch: {
    value(newV) {
      this.radioValue = newV
    }
  },
  mounted() {
    this.radioValue = this.value
  },
  methods: {
    handleChange(v) {
      const {
        target: { value }
      } = v
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.cRadio {
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
