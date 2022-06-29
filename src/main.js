import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import "@/utils/autoCompoents.js";
// import zformDesigners from "../zformDesigners/index.js";
import zformDesigners from "../lib/zFormDesigners/index";
import "@/assets/iconFont/iconfont.css";
// zformDesigners.addFormRule();
Vue.use(zformDesigners);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
