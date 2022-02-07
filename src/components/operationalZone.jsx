import "./style/operationalZone.scss";
export default {
  name: "operationalZone",
  props: {
    //单选框多选框输入框
    formType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formApi: {},
    };
  },
  methods: {
    //根据formType设置不同的rule
    // select
    //input
    //radio
    //datePicker
    //switch
    // checkbox
    //
    setShowRule() {
      const allCompoent = [
        {
          type: "input",
          label: "字段名",
          fileId: "fileId",
          on: {
            change: (event) => {
              const {
                target: { value },
              } = event;
              this.$emit("handleLabelChange", "fileId", value);
            },
          },
          attrformTypeArr: [],
        },
        {
          type: "input",
          label: "表单label",
          fileId: "label",
          on: {
            change: (event) => {
              const {
                target: { value },
              } = event;
              this.$emit("handleLabelChange", "label", value);
            },
          },
          attrformTypeArr: [],
        },
      ];
      return allCompoent;
    },
  },
  render() {
    return (
      <div class="operationalZone">
        <div class="width-100 height-30">
          <aTitle title="参数配置">
            <zFormDesigners
              value={this.formApi}
              onInput={(v) => {
                this.formApi = v;
              }}
              rule={this.setShowRule()}
            ></zFormDesigners>
          </aTitle>
        </div>
      </div>
    );
  },
};
