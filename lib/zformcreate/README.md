
```html
<!-- 事件监听  fileId-事件名 
    距离 a-change 就是 fileId是a的组件触发的change事件
-->
<zFormCreate v-model="model" :rule="rule" @a-change="test"></zFormCreate>
<script>
  export default {
    data() {
      return {
        rule: [
          // datePicker
        ],
        model: {},
      };
    },
  };
</script>
```
### zFormCreate Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model | 表单组的操作方法 | object | — | {} |
| rule | 表单渲染的控件 [详见](#v-model)  | array | array | array |
| formConfig | 设置基础的表单配置 | {} | {wrapperCol:{span:20},labelCol:{span:4},labelAlign:"left}  |   同上|




### v-model
| 参数      | 说明          | 类型      | 可选值                           | 默认值  | 函数参数|
|---------- |-------------- |---------- |--------------------------------  |-------- | -----|
| getFormData | 获取表单的数据 | function | function | function |无|
| setValue | 设置表单某一项的value  |function | function | function | fileId,newValue |
| validate | 手动触发验证  |function | 无 | status:验证是否通过 | callback |
| resetRule | 重置表单到最初始的状态  |function | function | 无 | 无 |
| updateRule | 手动触发更新rule  |function | function | function | 无 |
| setRuleItemOptions | 设置表单某一项的options  |function | function | function |fileId,newOptions |
| getRuleItemSomeOne | 获取表单的某一项数据  |function | function | function |fileId,ruleItemkey  |
| updateRuleItemProps | 更新其中一项的props  |function | function | function | fileId,newProps |

> 当type是hide的时候 他不会展示在页面上,但是在getFormData的时候他会获取的到 用来存id啥的
### ruleItem
| 参数      |  说明  |  是否必填  |          类型      | 可选值                           | 默认值  |
| --------  | ---- | ------ |  ----------------------  |-------- | -------- | 
| type | 控制展示什么组件 |  必填 | string | input,datePicker等等以及你自己注册的所有值 | 无 |
| props | 组件的props  |非必填 | object | 组件的props(参见antd 组件的的props) | 无 |
| fileId | 提交数据的key  |必填 唯一值 | string/number | 无 | 无 |
| value | 组件的默认值  | 必填 | any | 组件双向绑定的value | 无 |
| label | 表单的label  |非必填 | string | 表单的label值 | 无 |
| formProps | 组件的表单配置项  |非必填 | object | a-form-item(如果该项有值则不会走formConfig的配置) | 无 |
| on | 组件的事件  |非必填 | object | 组件的事件 | 无 |
| span | 这一格所占据的长度  |非必填 | number | 1-24 | 8 |
| rules | 表单效验  |非必填 | array | 参见antd的form校验规则 | 无 |
| itemType | 表单的类型(主要区分是否放在form-item里面)  |非必填 | string | form or style | 无 |


### formConfig
| 参数      |  说明  |  是否必填  |          类型      | 可选值                           | 默认值  |
| --------  | ---- | ------ |  ----------------------  |-------- | -------- | 
| labelCol | label的col的设置 |  选填 | object | 参考antd的form-model | {span:4} |
| wrapperCol | 组件非label部分的col的设置 |  选填 | object | 参考antd的form-model | {span:20} |
| labelAlign | label的对齐方式  | 选填 | string | left right | left |
| labelWidth | label的长度  | 选填| number | label的最大长度,超出会展示... | 130 |
| colonStatus | 是否展示冒号  | 选填 | boolean |  | true |

### 插件提供的一些方法
| 参数      |  说明  |  是否必填  |          类型      | 可选值 | 默认值  | 函数参数  |
| --------  | ---- | ------ |  ----------------------  |-------- | -------- | --- |
| components | 在插件里面注册一个全新的type |  function | 无 | 注册一个组件,可以通过type渲染 props的标签会全局传进去,没接受的全部在attrs | 无 | Vnode(切必须需要有name,name会注册成为type的选项) |
