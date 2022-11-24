import zFormCreate from "./zFormCreate.jsx";
import { componentsObj } from "./data/compoents";
import { getDataType } from "@/utils/utils.js";
import { setDefaultUI, UIList } from "./data/defaultData";
const exportObj = {
  install: (Vue, options) => {
    Vue.component(zFormCreate.name, zFormCreate);
    // 当传入的是一个string类型 并且 是在限定的UI库之一的时候
    if (getDataType(options) === "String" && UIList.includes(options)) {
      setDefaultUI(options);
    }
    // 当传入的是一个obj类型 并且 并且传入了 UI这个字段的时候
    if (getDataType(options) === "Object" && UIList.includes(options.UI)) {
      setDefaultUI(options.UI);
    }
  },
  components: (Vnode) => {
    if (
      componentsObj[Vnode.name] ||
      Object.hasOwnProperty.call(componentsObj, Vnode.name)
    ) {
      return console.error(`重复注册了${Vnode.name} 组件`);
    }
    componentsObj[Vnode.name] = Vnode;
    // const attrsArr = [
    //   "input",
    //   "datePicker",
    //   "select",
    //   "radio",
    //   "checkbox",
    //   "switch",
    // ];
    // if (
    //   Vnode.name &&
    //   !attrsArr.includes(Vnode.name) &&
    //   !Object.hasOwnProperty.call(componentsObj, Vnode.name)
    // ) {
    //   componentsObj[Vnode.name] = Vnode;
    //   return;
    // }
    // return console.error(`重复注册了${Vnode.name} 组件`);
    // console.log(Vnode, 'Vnode')
    // console.log(componentsObj, 'componentsData')
  },
};
export default exportObj;
