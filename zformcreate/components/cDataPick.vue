<template>
  <div class="cDataPick">
    <a-date-picker v-model="defaultValue" v-bind="$attrs" @change="handleChange" />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'CDataPick',
  props: {
    value: {},
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    //是否需要emit一个时间戳
    isTimestamp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultValue: null
    }
  },
  watch: {
    value(newV) {
      if (newV) {
        this.setDefaultValue()
      }
    }
  },
  mounted() {
    this.setDefaultValue()
  },
  methods: {
    //setDefaultValue
    setDefaultValue() {
      if (this.value && moment(new Date(this.value)).isValid()) {
        this.defaultValue = moment(this.value)
        this.handleChange(moment(this.defaultValue))
      }
    },
    //datepicker
    handleChange(v) {
      let value = ''
      //当需要时间戳的时候 会抛出一个时间戳
      if (this.isTimestamp) {
        value = v.valueOf()
      } else {
        value = v.format(this.format)
      }
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.cDataPick {
  width: 100%;
  height: 100%;
}
</style>
