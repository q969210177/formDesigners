import zformDesigners from './zformDesigners.vue'
import { setDefaultFormConfig } from './data/defaultData.js'
const exportObj = {
    install: Vue => {
        Vue.component(zformDesigners.name, zformDesigners)
    },
    setDefaultFormConfig: (newFormConfig) => {
        setDefaultFormConfig(newFormConfig)
    }
    //   components: Vnode => {
    //     const attrsArr = ['input', 'datePicker', 'select', 'radio', 'checkbox', 'switch']

    //     if (Vnode.name && !attrsArr.includes(Vnode.name) && !Object.hasOwnProperty.call(componentsObj, Vnode.name)) {
    //       componentsObj[Vnode.name] = Vnode
    //       return
    //     }
    //     return console.error(`重复注册了${Vnode.name} 组件`)
    //     // console.log(Vnode, 'Vnode')
    //     // console.log(componentsObj, 'componentsData')
    //   }
}
export default exportObj
