<template>
  <div class="cFormItem">
    <div @click="dispatch('cForm', 'el.form.addField', [this])">222</div>
  </div>
</template>
<script>
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
import AsyncValidator from "async-validator";
import { noop, getPropByPath, objectAssign } from "@/utils/utils";
import LabelWrap from "./label-wrap";
export default {
  name: "cFormItem",
  componentName: "cFormItem",

  provide() {
    return {
      cFormItem: this,
    };
  },
  inject: ["cForm"],
  props: {
    label: String,
    labelWidth: String,
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: "",
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== "cForm") {
        if (parentName === "cFormItem") {
          this.setIsNested();
        }
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
  },
  data() {
    return {
      validateState: "",
      validateMessage: "",
      validateDisabled: false,
      validator: {},
      isNested: false,
      computedLabelWidth: "",
    };
  },
  mounted() {
    // this.$emit("c.form.addField");
    this.dispatch("cForm", "el.form.addField", [this]);
    // this.$on("el.form.blur", () => {
    //   console.log(222);
    // });
    // this.$on("el.form.change", () => {
    //   console.log(222);
    // });
    // this.validate("change");
  },
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      console.log(parent);
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    setIsNested() {
      this.isNested = true;
    },
    // blur or change
    validate(trigger, callback = noop) {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }

      this.validateState = "validating";

      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";

          callback(this.validateMessage, invalidFields);
          this.elForm &&
            this.elForm.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
        }
      );
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger === "") return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((rule) => objectAssign({}, rule));
    },
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : [];

      const prop = getPropByPath(formRules, this.prop || "");
      formRules = formRules ? prop.o[this.prop || ""] || prop.v : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
  },
};
</script>
<style lang="scss" scoped>
.cFormItem {
  width: 100%;
  height: 100%;
}
</style>