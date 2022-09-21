### [支持的组件可以参考](https://q969210177.github.io/formDesigners/#/zformDesignersView)
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
### 默认的组件完整版
```html
<zFormCreate v-model="model" :rule="rule" @a-change="test"></zFormCreate>
<script>
  const bankAccountReg = new RegExp(/[^\u4e00-\u9fa5a-zA-Z]/);
  export default {
    data() {
      return {
        rule: [

          {
            type: "hide",
            fileId: "ID", //type 为 hide的时候不会展示在页面上 但是会参与提交
            value: "",
          },
          {
            type: "input",// 渲染什么类型的组件
            label: "输入框",//form的文字提示部分
            fileId: "input",// 参与提交的json的key
            value: "",// 参与提交的json的value
            props: {},//需要传递给组件的props
            span: 8,// 定义表格的长度 取值范围 1 - 24
            itemType:"form",// 有style 和 form 两种模式  默认是form style 不会参与提交 仅做展示
            rules: [ //参考  async-validator
              { required: true, message: "请输入开户行账号", trigger: "blur" },//参考
              {
                pattern: bankAccountReg,
                message: "仅支持数字和特殊字符",
                trigger: "blur",
              },
            ],
          },
          //{"type":"alert","value":"","itemType":"style","label":"","props":{"description":"111","showIcon":true,"type":"info"},"span":24,"fileId":"l7zuphghe99"}
          {
            type: "select",
            label: "下拉框",
            fileId: "select",
            value: "",
            // 当是下拉 或者 tree 这种 需要一个list去循环的组件 请传入一个options(如果rule里面有这个 都会放在props里面传下去)
            options:[
              {
                dictName:"下拉框的名字",
                dictValue:"下拉框的值"
              }
            ],
            //所有的props 都会传递给组件  attrs 里面也会有props的内容(后续会做区分 把他分开)
            props: {
              labelKey: "dictName",// 默认 是label
              valueKey: "dictValue", // 默认是value
            },
            span: 8,
          },
          {
            type: "multipleselect",
            label: "多选下拉框",
            fileId: "multipleselect",
            value: [],//select传参数也可以多选 但是 单独放一个组件出来 更加容易 遵循组件单一原则
            // 当是下拉 或者 tree 这种 需要一个list去循环的组件 请传入一个options(如果rule里面有这个 都会放在props里面传下去)
            options:[ // 默认渲染的key是 label 和 value
              {
                label:"下拉框的名字1",
                value:"下拉框的值1"
              },
              {
                label:"下拉框的名字2",
                value:"下拉框的值2"
              }
            ],
            span: 8,
          },
          {
            type: "radio",
            label: "单选框",
            fileId: "radio",
            value: "",
            options:[ // 默认渲染的key是 label 和 value
              {
                label:"单选框的名字1",
                value:"单选框的值1"
              },
              {
                label:"单选框的名字2",
                value:"单选框的值2"
              }
            ],
            span: 8,
          },
          {
            type: "checkbox",
            label: "多选框",
            fileId: "checkbox",
            value: [],
            options:[ 
              {
                label:"多选框的名字1",
                value:"多选框的值1"
              },
              {
                label:"多选框的名字2",
                value:"多选框的值2"
              }
            ],
            span: 8,
          },
          {
            type:"datapick",
            label:"时间选择器",
            fileId:"datapick",
            value:"",//默认输出的是字符串
            props:{
              // isTimestamp 是否输出时间戳开关 打开之后 value 会变成时间戳的数字
              //type 目前仅支持 "date", "month" 两种 一种是时间模式 一种是月份模式
            }
          },
          {
            type:"switch",
            label:"开关",
            fileId:"switch",
            value:false,
            props:{}
          },
          {
            type:"slider",
            label:"滑块",
            fileId:"slider",
            value:0,//number类型
            props:{}
          },
          {
            type:"divider",
            label:"分割线",
            fileId:"divider",
            value:0,//number类型
            props:{
              text:"需要放在分割线里面的标题",
              // dashed: 是否虚线 boolean 默认false
              // height 占位的高度 number 默认50
              // orientation 文字的展示位置  left center right 默认center
            },
            itemType:"style"
          },
          /** 
           * banner
: 
true
closable
: 
true
description
: 
"111"
showIcon
: 
true
type
: 
"success"
          */
        ],
        model: {},
      };
    },
    methods:{
      // 查看提交的数据
      getFormData(){
        //所有的操作方法 全部通过v-model 绑定出来 是一个 key=>void 的对象
        console.log(this.model.getFormData())
      }
    }
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
