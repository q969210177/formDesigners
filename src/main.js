import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import "@/utils/autoCompoents.js";
import zformDesigners from "../lib/zFormDesigners/index";
// import zformDesigners from "z-form-designers";
import "@/assets/iconFont/iconfont.css";
import "z-form-designers/index.css";
Vue.use(zformDesigners);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
