import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import zformcreate from "../zformcreate/index";
// import zformcreate from "zformcreate";
import router from "@/router/index.js"
const requireComponent = require.context(
  "@/components/",
  false,
  /[a-zA-Z]{1,}\.vue|jsx$/
);
requireComponent.keys().forEach((name) => {
  const compoents = requireComponent(name).default;
  Vue.component(compoents.name, compoents);
  zformcreate.components(compoents);
});
// import zformDesigners from "../lib/zFormDesigners/index";
import zformDesigners from "../zformDesigners/index";
// import zformDesigners from "z-form-designers";
import "@/assets/iconFont/iconfont.css";
import "z-form-designers/index.css";
Vue.use(zformDesigners);
Vue.use(zformcreate);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
