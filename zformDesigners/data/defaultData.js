export let defaultFormConfig = {
  labelCol: { span: 6 },
  wrapperCol: {
    span: 18,
  },
  labelAlign: "left",
  labelWidth: 110,
  colonStatus: true,
};

export const setDefaultFormConfig = (newFormConfig) => {
  defaultFormConfig = Object.assign(defaultFormConfig, newFormConfig);
};
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
        activeValue: "datePicker",
        icon: "icon-Date",
        data: {
          type: "datePicker",
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
        icon: "icon-kaiguanguan",
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
    ],
  },
];

export let formRule = [];
export const setFormRule = (newRule) => {
  formRule = newRule;
};

export let compoentsRule = [];
export const setCompoentsRule = (newRule) => {
  compoentsRule = newRule;
};
