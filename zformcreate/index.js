import zFormCreate from "./zFormCreate.jsx";
import { componentsObj } from "./data/compoents";
const exportObj = {
  install: (Vue) => {
    Vue.component(zFormCreate.name, zFormCreate);
  },
  components: (Vnode) => {
    const attrsArr = [
      "input",
      "datePicker",
      "select",
      "radio",
      "checkbox",
      "switch",
    ];
    if (
      Vnode.name &&
      !attrsArr.includes(Vnode.name) &&
      !Object.hasOwnProperty.call(componentsObj, Vnode.name)
    ) {
      componentsObj[Vnode.name] = Vnode;
      return;
    }
    return console.error(`重复注册了${Vnode.name} 组件`);
    // console.log(Vnode, 'Vnode')
    // console.log(componentsObj, 'componentsData')
  },
};
export default exportObj;
