import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import zformDesigners from "@/zformDesigners/index.js";
import "@/assets/iconFont/iconfont.css"
Vue.use(zformDesigners);
import CreateForm from "@/zformcreate/index.js";
// import createForm from "../ccc/formCreate.common.js";
// // import CreateForm from "@/createForm/index.js";
Vue.use(CreateForm);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
