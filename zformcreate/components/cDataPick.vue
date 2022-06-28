<template>
  <div class="cDataPick">
    <a-month-picker
      v-if="type === 'month'"
      :getCalendarContainer="() => $el"
      v-on="$listeners"
      v-model="defaultValue"
      v-bind="$attrs"
      @change="handleChange"
    />
    <a-date-picker
      v-if="type === 'date'"
      :getCalendarContainer="() => $el"
      v-on="$listeners"
      v-model="defaultValue"
      v-bind="$attrs"
      @change="handleChange"
    />
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "CDataPick",
  props: {
    value: {},
    // format: {
    //   type: String,
    //   default: "YYYY-MM-DD",
    // },
    formatArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      default: "date",
      validator: (v) => {
        return ["date", "month"].includes(v);
      },
    },
    //是否需要emit一个时间戳
    isTimestamp: {
      type: Boolean,
      default: false,
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
  computed: {
    format() {
      if (this.formatArr.length) {
        const indexObj = {
          "YYYY-": "0",
          "MM-": "1",
          "DD ": "2",
          "HH:": "3",
          "mm:": "4",
          SS: "5",
        };
        let newArr = [];
        this.formatArr.forEach((v) => {
          newArr[indexObj[v]] = v;
        });
        if (newArr[newArr.length - 1].includes("-")) {
          const a = "";
          newArr[newArr.length - 1] = newArr[newArr.length - 1].replace(
            "-",
            ""
          );
        }
        return newArr.join("");
      }
      return "YYYY-MM-DD";
    },
  },
  mounted() {
    this.setDefaultValue();
  },
  methods: {
    //设置选择好的formArr
    setFormatArr() {
      // return newArr;
    },
    //setDefaultValue
    setDefaultValue() {
      if (this.value && moment(new Date(this.value)).isValid()) {
        this.defaultValue = moment(this.value);
        this.handleChange(moment(this.defaultValue));
      }
    },
    //datepicker
    handleChange(v) {
      if (!v) return this.$emit("input", "");
      let value = "";
      //当需要时间戳的时候 会抛出一个时间戳
      if (this.isTimestamp) {
        value = v.valueOf();
      } else {
        console.log(this.format, "format");
        // value = v.format(this.format);
        value = v.format(this.format);
      }
      this.$emit("input", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.cDataPick {
  width: 100%;
  height: 100%;
}
</style>
