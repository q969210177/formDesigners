import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
// import { TForm } from "../ccc/index.umd";
// console.log(TForm);
// Vue.use(TForm);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
