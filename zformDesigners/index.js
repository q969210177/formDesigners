import zformDesigners from "./zformDesigners.vue";
import "@/assets/iconFont/iconfont.css";
import {
  setDefaultFormConfig,
  setFormRule,
  setCompoentsRule,
} from "./data/defaultData.js";
const exportObj = {
  install: (Vue) => {
    Vue.component(zformDesigners.name, zformDesigners);
  },
  setDefaultFormConfig: (newFormConfig) => {
    setDefaultFormConfig(newFormConfig);
  },
  addFormRule: function (newRule) {
    setFormRule(newRule);
  },
  addCompoentsRule(newRule) {
    setCompoentsRule(newRule);
  },
};
export default exportObj;
