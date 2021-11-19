/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./style/cForm.scss";
import { componentsObj } from "./data/compoents";
export default {
  name: "cForm",
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formOptions: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      formData: {
        // name: "111",
      },
    };
  },
  methods: {
    //setFormData
    setFormData() {
      this.rule.forEach((i) => {
        this.formData[i.paramsId] = i.value;
      });
      // this.formData = this.rule.map(i=>{
      //   return i
      // })
    },
    //
    setFormCompoents(i) {
      const formModelItemProps = {
        prop: i.paramsId,
        rules: i.rules ? i.rules : [],
        labelCol: 4,
        label: i.label,
      };
      // console.log(i.type);
      // console.log(componentsObj);
      if (componentsObj[i.type]) {
        return (
          <a-col props={i.layout}>
            <a-form-model-item props={{ ...formModelItemProps }}>
              {h(componentsObj[i.type], {
                props: { ...i.props },
              })}
            </a-form-model-item>
          </a-col>
        );
      }
    },
  },
  render() {
    this.setFormData();
    // label-col={this.formOptions.labelCol}
    // wrapper-col={this.formOptions.wrapperCol}
    return (
      <div class="cForm">
        <a-form-model props={{ model: this.formData }}>
          <a-row>
            {this.rule.map((i) => {
              return this.setFormCompoents(i);
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
