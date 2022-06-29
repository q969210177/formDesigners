//自动注册compoents下的组件
import Vue from "vue";
// import CreateForm from "../../zformcreate/index";
import CreateForm from "../../lib/zformcreate/index";
Vue.use(CreateForm);

const requireComponent = require.context(
  "@/components/",
  false,
  /[a-zA-Z]{1,}\.vue|jsx$/
);
requireComponent.keys().forEach((name) => {
  const compoents = requireComponent(name).default;
  Vue.component(compoents.name, compoents);
  CreateForm.components(compoents);
});
