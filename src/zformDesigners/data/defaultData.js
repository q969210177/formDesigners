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
    defaultFormConfig = newFormConfig;
};

export const defaultMenuArr = [
    {
        name: "输入框",
        activeValue: "input",
        icon: "form",
        data: {
            type: "input",
            value: "",
            label: "111",
            props: {},
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
    {
        name: "下拉框",
        activeValue: "select",
        icon: "form",
        data: {
            type: "select",
            value: "",
            label: "",
            props: {},
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
    {
        name: "单选框",
        activeValue: "radio",
        icon: "form",
        data: {
            type: "select",
            value: "",
            label: "",
            props: {},
            rules: [],
            options: [{ label: "这是一个简单的表单设计器", value: "22" }],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
    {
        name: "复选框",
        activeValue: "checkbox",
        icon: "form",
        data: {
            type: "checkbox",
            value: "",
            label: "",
            props: {},
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
            options: [],
        },
    },
    {
        name: "时间选择器",
        activeValue: "datePicker",
        icon: "form",
        data: {
            type: "datePicker",
            value: "",
            label: "",
            props: {},
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
    {
        name: "开关",
        activeValue: "switch",
        icon: "form",
        data: {
            type: "switch",
            value: false,
            label: "",
            props: {
                size: "small",
            },
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
    {
        name: "字典",
        activeValue: "dic",
        icon: "diff",
        data: {
            type: "select",
            value: "",
            label: "",
            props: {},
            options: [
                { label: "男", value: "1" },
                { label: "女", value: "2" },
            ],
            rules: [],
            col: {
                span: 24,
            },
            formProps: { isRequired: false, labelAlign: "left" },
        },
    },
];
