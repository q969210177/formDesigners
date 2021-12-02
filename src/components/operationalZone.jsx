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
    setShowRule() {
      const allCompoent = {
        type: "input",
        label: "字段名",
        fileId: "label",
        on: {
          change: (event) => {
            const {
              target: { value },
            } = event;
            this.$emit("handleLabelChange", value);
            console.log(value, "字段名change");
          },
        },
      };
      console.log(this.formType, "formType");
      return [allCompoent];
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
