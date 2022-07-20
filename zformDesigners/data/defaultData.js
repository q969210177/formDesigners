export let defaultFormConfig = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 18,
  },
  labelAlign: "left",
  labelWidth: 110,
  colonStatus: true,
};

//设置默认的表单设置
export const setDefaultFormConfig = (newFormConfig) => {
  defaultFormConfig = Object.assign(defaultFormConfig, newFormConfig);
};
//左侧默认的菜单arr
export const defaultMenuArr = [
  {
    name: "表单组件",
    menuArr: [
      {
        name: "输入框",
        activeValue: "input",
        icon: "icon-danhangshurukuang",
        data: {
          type: "input",
          itemType: "form",
          value: "",
          label: "111",
          props: {},
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "下拉框",
        activeValue: "select",
        icon: "icon-xialakuang",
        data: {
          type: "select",
          value: "",
          itemType: "form",
          label: "",
          props: {},
          options: [],
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "多选下拉框",
        activeValue: "multipleselect",
        icon: "icon-xialakuang",
        data: {
          type: "multipleselect",
          value: [],
          itemType: "form",
          label: "",
          props: {},
          options: [],
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      //
      {
        name: "单选框",
        activeValue: "radio",
        icon: "icon-danxuanfill",
        data: {
          type: "radio",
          value: "",
          itemType: "form",
          label: "",
          props: {},
          rules: [],
          options: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "复选框",
        activeValue: "checkbox",
        icon: "icon-duoxuan",
        data: {
          type: "checkbox",
          value: "",
          itemType: "form",
          label: "",
          props: {},
          rules: [],
          span: 24,
          formProps: { isRequired: false },
          options: [],
        },
      },
      {
        name: "时间选择器",
        activeValue: "datapick",
        icon: "icon-Date",
        data: {
          type: "datapick",
          value: "",
          itemType: "form",
          label: "",
          props: {},
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "开关",
        activeValue: "switch",
        icon: "icon-kaiguanguan",
        data: {
          type: "switch",
          value: false,
          itemType: "form",
          label: "",
          props: {
            size: "small",
          },
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "滑块",
        activeValue: "slider",
        icon: "icon-ic_guiji",
        data: {
          type: "slider",
          itemType: "form",
          value: 0,
          label: "",
          props: {
            size: "small",
          },
          rules: [],
          span: 24,
          formProps: { isRequired: false },
        },
      },
      {
        name: "树",
        activeValue: "tree",
        icon: "icon-tree",
        data: {
          type: "tree",
          itemType: "form",
          value: [],
          label: "",
          options: [],
          props: {
            checkable: true,
          },
          rules: [],
          span: 24,
        },
      },
      {
        name: "级联",
        activeValue: "cascader",
        icon: "icon-tree",
        data: {
          type: "cascader",
          itemType: "form",
          value: [],
          label: "",
          props: {
            fieldNames: {
              label: "title",
              value: "key",
              children: "children",
            },
          },
          options: [],
          rules: [],
          span: 24,
        },
      },
    ],
  },
  {
    name: "样式组件",
    menuArr: [
      {
        name: "分割线",
        activeValue: "divider",
        icon: "icon-danhangshurukuang",
        data: {
          type: "divider",
          value: "",
          itemType: "style",
          label: "",
          props: {},
          span: 24,
        },
      },
      {
        name: "提示",
        activeValue: "alert",
        icon: "icon-danhangshurukuang",
        data: {
          type: "alert",
          value: "",
          itemType: "style",
          label: "",
          props: {},
          span: 24,
        },
      },
    ],
  },
];

//右侧的组件配置里面的form部分
export let formRule = [];
export const setFormRule = (newRule) => {
  formRule.concat(newRule);
};
//右侧的组件配置里面的组件部分  用注释分割了每一个组件的配置数据
export let compoentsRule = [
  //input开始
  {
    type: "switch",
    label: "清除图标",
    fileId: "allowClear",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["input", "select", "multipleselect", "datapick", "cascader"],
  },
  {
    type: "input",
    label: "默认提示语",
    fileId: "placeholder",
    value: "",
    on: {
      blur: () => {},
    },
    span: 24,
    attrArr: ["input", "datapick", "rangePicker", "select", "cascader"],
  },
  // {
  //   type: "activeIcon",
  //   label: "前置按钮",
  //   fileId: "prefix",
  //   value: "",
  //   span: 24,
  //   attrArr: ["input", "select"],
  // },
  {
    type: "inputnumber",
    label: "最大长度",
    fileId: "maxLength",
    value: 10,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["input"],
  },
  {
    type: "switch",
    label: "是否禁用",
    fileId: "disabled",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: [
      "input",
      "datapick",
      "rangePicker",
      "select",
      "radio",
      "checkbox",
      "switch",
      "slider",
      "tree",
      "cascader",
    ],
  },
  {
    type: "radio",
    label: "组件大小",
    fileId: "size",
    value: "",
    span: 24,
    on: {
      change: () => {},
    },
    options: [
      {
        label: "默认",
        value: "default",
      },
      {
        label: "小",
        value: "small",
      },
    ],

    attrArr: ["input", "datapick", "rangePicker", "select", "switch", "radio"],
  },
  // input结束
  //select结束开始
  {
    type: "setSelectOption",
    label: "配置数据",
    fileId: "options",
    value: [],
    span: 24,
    on: {
      handleSubmitOptions: () => {},
    },
    attrArr: ["select", "checkbox", "radio", "multipleselect"],
  },
  {
    type: "inputnumber",
    label: "最大显示的文本长度",
    fileId: "maxTagTextLength",
    value: 0,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["select", "multipleselect"],
  },
  // select结束

  //multipleselect结束开始
  {
    type: "inputnumber",
    label: "最多同时展示多少tag",
    fileId: "maxTagCount",
    value: 5,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["multipleselect"],
  },
  // multipleselect结束

  //radio开始
  {
    type: "radio",
    label: "显示模式",
    fileId: "isButton",
    value: "",
    options: [
      { label: "按钮", value: "btn" },
      { label: "radio", value: "radio" },
    ],
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["radio"],
  },
  // radio结束

  //checkbox开始
  //checkbox结束

  //datapick开始
  {
    type: "checkbox",
    fileId: "formatArr",
    label: "配置时间格式",
    value: [],
    on: {
      change: () => {},
    },
    options: [
      { label: "年", value: "YYYY-" },
      { label: "月", value: "MM-" },
      { label: "日", value: "DD " },
      { label: "时", value: "HH:" },
      { label: "分", value: "mm:" },
      { label: "秒", value: "SS" },
    ],
    attrArr: ["datapick"],
  },
  {
    type: "radio",
    fileId: "type",
    label: "展示模式",
    value: "",
    on: {
      change: () => {},
    },
    options: [
      { label: "日期选择器", value: "date" },
      { label: "月份选择器", value: "month" },
    ],
    attrArr: ["datapick"],
  },
  //datapick结束
  //switch开始
  {
    type: "input",
    label: "未选中的文字内容",
    fileId: "unCheckedChildren",
    value: "",
    span: 24,
    on: {
      blur: () => {},
    },
    props: {
      maxLength: 2,
    },
    attrArr: ["switch"],
  },
  {
    type: "input",
    label: "选中的文字内容",
    fileId: "checkedChildren",
    value: "",
    span: 24,
    on: {
      blur: () => {},
    },
    props: {
      maxLength: 2,
    },

    attrArr: ["switch"],
  },
  //switch结束

  //slider开始
  {
    type: "switch",
    fileId: "tooltipVisible",
    label: "是否显示tooltip",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["slider"],
  },
  {
    type: "inputnumber",
    label: "最大值",
    fileId: "max",
    value: 10,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["slider"],
  },
  {
    type: "inputnumber",
    label: "最小值",
    fileId: "min",
    value: 0,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["slider"],
  },
  //slider结束

  //tree开始
  {
    type: "switch",
    label: "复选框模式",
    fileId: "checkable",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["tree"],
  },
  {
    type: "setTreeRuleData",
    label: "配置数据",
    fileId: "options",
    value: [],
    span: 24,
    on: {
      handleSubmitOptions: () => {
        console.log(111);
      },
    },
    attrArr: ["tree", "cascader"],
  },
  {
    type: "switch",
    fileId: "blockNode",
    label: "子节点是否独占一行",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["tree"],
  },
  {
    type: "switch",
    fileId: "showLine",
    label: "是否展示连线",
    value: false,
    on: {
      change: () => {},
    },
    span: 24,
    attrArr: ["tree"],
  },
  //tree结束

  //cascader开始
  {
    type: "hide",
    fileId: "fieldNames",
    value: { label: "title", value: "key", children: "children" },
    span: 24,
    attrArr: ["cascader"],
  },
  {
    type: "switch",
    fileId: "changeOnSelect",
    value: false,
    on: {
      change: () => {},
    },
    label: "是否每级都可选择",
    attrArr: ["cascader"],
  },
  //cascader结束

  //divider开始
  {
    type: "input",
    label: "展示的标题",
    fileId: "text",
    value: "",
    span: 24,
    on: {
      blur: () => {},
    },
    attrArr: ["divider"],
  },
  {
    type: "inputnumber",
    label: "高度",
    fileId: "height",
    value: 50,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["divider"],
  },
  {
    type: "switch",
    label: "是否虚线",
    fileId: "dashed",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["divider"],
  },
  {
    type: "radio",
    label: "标题的位置",
    fileId: "orientation",
    value: "",
    span: 24,
    on: {
      change: () => {},
    },
    options: [
      { label: "左", value: "left" },
      { label: "中", value: "center" },
      { label: "右", value: "right" },
    ],

    attrArr: ["divider"],
  },
  //divider结束
  //alert 开始
  {
    type: "switch",
    label: "是否用作顶部公告",
    fileId: "banner",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["alert"],
  },
  {
    type: "switch",
    label: "显示关闭按钮",
    fileId: "closable",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["alert"],
  },
  // {
  //   type: "switch",
  //   label: "closeText",
  //   fileId: "closeText",
  //   value: false,
  //   span: 24,
  //   on: {
  //     change: () => {},
  //   },
  //   attrArr: ["alert"],
  // },
  {
    type: "input",
    label: "提示的文字",
    fileId: "description",
    value: "",
    span: 24,
    on: {
      blur: () => {},
    },
    attrArr: ["alert"],
  },
  {
    type: "switch",
    label: "是否显示辅助图标",
    fileId: "showIcon",
    value: false,
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["alert"],
  },
  {
    type: "radio",
    label: "提示展示类型",
    fileId: "type",
    value: "",
    options: [
      { label: "成功", value: "success" },
      { label: "普通", value: "info" },
      { label: "警告", value: "warning" },
      { label: "错误", value: "error" },
    ],
    span: 24,
    on: {
      change: () => {},
    },
    attrArr: ["alert"],
  },
  //alert结束
];
export const setCompoentsRule = (newRule) => {
  compoentsRule.concat(newRule);
};
