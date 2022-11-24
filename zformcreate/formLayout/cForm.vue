<template>
  <div class="cForm">
    <form class="form">
      <slot></slot>
    </form>
  </div>
</template>
<script>
import { objectAssign } from "@/utils/utils";
export default {
  name: "cForm",
  componentName: "cForm",
  provide() {
    return {
      cForm: this,
    };
  },
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    showMessage: {
      type: Boolean,
      default: true,
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0;
      const max = Math.max(...this.potentialLabelWidthArr);
      return max ? `${max}px` : "";
    },
  },
  watch: {
    // 当 验证规则发生变化的时候 把子组件的验证全部去掉然后全部重新加一遍
    rules() {
      // remove then add event listeners on form-item after form rules change
      this.fields.forEach((field) => {
        field.removeValidateEvents();
        field.addValidateEvents();
      });
      //
      if (this.validateOnRuleChange) {
        this.validate(() => {});
      }
    },
  },

  data() {
    return {
      fields: [],
      potentialLabelWidthArr: [], // use this array to calculate auto width
    };
  },
  created() {
    // field是 form-item的实例
    this.$on("c.form.addField", (field) => {
      debugger;
      if (field) {
        this.fields.push(field);
      }
    });
    /* istanbul ignore next */
    this.$on("c.form.removeField", (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  },
  mounted() {},
  methods: {
    resetFields() {
      if (!this.model) {
        console.warn(
          "[CForm Warn][Form]model is required for resetFields to work."
        );
        return;
      }
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    clearValidate(props = []) {
      const fields = props.length
        ? typeof props === "string"
          ? this.fields.filter((field) => props === field.prop)
          : this.fields.filter((field) => props.indexOf(field.prop) > -1)
        : this.fields;
      fields.forEach((field) => {
        field.clearValidate();
      });
    },
    validate(callback) {
      if (!this.model) {
        console.warn(
          "[CForm Warn][Form]model is required for validate to work!"
        );
        return;
      }

      let promise;
      // if no callback, return promise
      if (typeof callback !== "function" && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (valid) {
            valid ? resolve(valid) : reject(valid);
          };
        });
      }

      let valid = true;
      let count = 0;
      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.fields.length === 0 && callback) {
        callback(true);
      }
      let invalidFields = {};
      this.fields.forEach((field) => {
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = objectAssign({}, invalidFields, field);
          if (
            typeof callback === "function" &&
            ++count === this.fields.length
          ) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    validateField(props, cb) {
      props = [].concat(props);
      const fields = this.fields.filter(
        (field) => props.indexOf(field.prop) !== -1
      );
      if (!fields.length) {
        console.warn("[CForm Warn]please pass correct props!");
        return;
      }

      fields.forEach((field) => {
        field.validate("", cb);
      });
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width);
      // it's impossible
      if (index === -1) {
        throw new Error("[CForm]unpected width ", width);
      }
      return index;
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal);
        this.potentialLabelWidthArr.splice(index, 1, val);
      } else if (val) {
        this.potentialLabelWidthArr.push(val);
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val);
      this.potentialLabelWidthArr.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.cForm {
  width: 100%;
  height: 100%;
  .form {
    border: 1px solid red;
  }
}
</style>