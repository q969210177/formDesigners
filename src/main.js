import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import "@/utils/autoCompoents.js";
import zformDesigners from "../zformDesigners/index.js";
import "@/assets/iconFont/iconfont.css";
Vue.use(zformDesigners);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
