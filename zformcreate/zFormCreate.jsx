import cForm from "./formLayout/cForm.vue";
import cFormItem from "./formLayout/cFormItem.vue";
import {
  returnEvent,
  getRuleItem,
  returnSlots,
  isHaveDefaultValue,
  setInstallRule,
} from "@/utils/utils";
import { componentsObj } from "./data/compoents.js";
export default {
  name: "ZFormCreate",
  components: {
    cForm,
    cFormItem,
  },
  props: {
    rule: {
      type: Array,
    },
    formConfig: {
      type: Object,
      default: () => {
        return {
          labelCol: { span: 4 },
          wrapperCol: {
            span: 20,
          },
          labelAlign: "left",
          // labelWidth: 130,
          colonStatus: true,
        };
      },
    },
    value: {
      type: Object,
      require: true,
    },
    //外部改变了rule 需要内部也同步进行改变的时候
    //比如说formCreate放在了弹窗里面 然后需要动态的设计option 给默认值回显 等等..
    changeRule: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    //当外界需要改变这个rule的时候 比如说弹窗 或者说在弹窗打开之前
    changeRule(newV) {
      if (newV) {
        this.updateRule();
      }
    },
    rule() {
      this.updateRule();
    },
    // 在还没有渲染完组件的时候也可以对数据进行操作
    value(newV) {
      if (Object.keys(newV).length === 0) {
        this.$emit("input", {
          getFormData: this.getFormData,
          setValue: this.setValue,
          validate: this.zCreateFormValidate,
          resetRule: this.resetRule,
          updateRule: this.updateRule,
          setRuleItemOptions: this.setRuleItemOptions,
          getRuleItemSomeOne: this.getRuleItemSomeOne,
          updateRuleItemProps: this.updateRuleItemProps,
        });
      }
    },
    formData(newV) {
      this.$emit("formDataChange", newV);
    },
  },
  data() {
    return {
      formData: {},
      copyRule: [],
    };
  },
  methods: {},
  render(h) {
    return (
      <div class="zFormCreate">
        <cForm>
          <el-row>
            <cFormItem></cFormItem>
          </el-row>
        </cForm>
      </div>
    );
  },
};
