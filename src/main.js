import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import "@/utils/autoCompoents.js";
import formDesigners from "@/formDesigners/index.js";
Vue.use(formDesigners);
import CreateForm from "@/createForm/index.js";
Vue.use(CreateForm);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
