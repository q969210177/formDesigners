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
        icon: "icon-danhangshurukuang",
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
        icon: "icon-xialakuang",
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
        icon: "icon-danxuanfill",
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
        icon: "icon-duoxuan",
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
        icon: "icon-Date",
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
        icon: "icon-kaiguanguan",
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
        icon: "icon-ic_shenqingkaoqin",
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



/**
 * @props
 *  公用部分
 *  isRequired:是否必填
 * 
 *  input
 *  allowClear:boolean 可以点击清除图标删除内容
 *  size:large default small 控件大小
 *  maxLength:最大长度
 * 
 * radio
 *  size:large default small 控件大小
 * 
 * 
 * checkbox
 *   size:large default small 控件大小
 * 
 * select
 *  allowClear:boolean 可以点击清除图标删除内容
 *  notFoundContent:string 当下拉列表为空时显示的内容
 *  placeholder:string 选择框默认展示的内容
 *  size:large default small 控件大小
 */
