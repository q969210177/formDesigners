import Vue from "vue";
import App from "./App.vue";
import "@/utils/installAntdFormCompoent.js";
import "@/utils/autoCompoents.js";
import zformDesigners from "../zformDesigners/index.js";
// import zformDesigners from "../ccc/zformDesigners.umd.js";
import "../ccc/zformDesigners.css";
import "@/assets/iconFont/iconfont.css";
zformDesigners.addFormRule([
  {
    type: "input",
    label: "展示的标题zzz",
    fileId: "text1",
    value: "",
    span: 24,
    on: {
      // blur: function () {
      //   console.log(this, "this");
      // },
      blur: () => {
        // this.handleChangeModel()
      },
    },
    attrArr: ["form"],
  },
]);
Vue.use(zformDesigners);
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
