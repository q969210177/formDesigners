<template>
  <div class="operationalZone">
    <div>
      {{ formConfingModel }}
      <a-tabs type="card" v-if="clickActive" default-active-key="2">
        <a-tab-pane key="1" tab="表单配置">
          <a-form-model :model="formConfingModel">
            <a-form-model-item label="设置表单的字段名">
              <a-input
                v-model="formConfingModel.label"
                :max="10"
                @blur="(event) => handleInputBlur(event, 'label')"
              />
            </a-form-model-item>
            <a-form-model-item label="设置表单的fileId(请不要重复)">
              <a-input
                v-model="formConfingModel.fileId"
                :max="10"
                @blur="(event) => handleInputBlur(event, 'fileId')"
              />
            </a-form-model-item>

            <a-form-model-item label="标签位置">
              <cRadio
                v-model="formConfingModel.formProps.labelAlign"
                :options="[
                  {
                    label: '左',
                    value: 'left',
                  },
                  { label: '右', value: 'right' },
                ]"
                @change="(v) => handleRetuenForm('formProps', v, 'labelAlign')"
              ></cRadio>
            </a-form-model-item>
            <a-form-model-item label="是否必填">
              <a-switch
                v-model="formConfingModel.formProps.isRequired"
                @change="(v) => handleRetuenForm('formProps', v, 'isRequired')"
              ></a-switch>
            </a-form-model-item>
            <a-form-model-item label="设置表单的长度">
              <a-slider
                v-model="formConfingModel.col.span"
                :max="24"
                @afterChange="(v) => handleRetuenForm('col', v, 'span')"
              />
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="组件配置">
          {{ formType }}
          <zCreateForm
            @allowClear-change="allowClearChange"
            @disabled-change="allowClearChange"
            :rule="componentsRule"
            v-model="zCreateFormModel"
          ></zCreateForm>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */
import cSelect from "@/formDesigners/components/cSelect.vue";
import cRadio from "@/formDesigners/components/cRadio.vue";
import cDataPick from "@/formDesigners/components/cDataPick.vue";
import cCheckbox from "@/formDesigners/components/cCheckbox.vue";
import cSwitch from "@/formDesigners/components/cSwitch.vue";
import {
  getRuleItem,
  setRuleItem,
  getRuleItemValue,
} from "@/formDesigners/utils/utils.js";
const ruleItemObjKey = ["rules", "col", "formProps"];
const ruleItemStrKey = ["label", "fileId", "props"];
export default {
  name: "operationalZone",
  components: {
    cSelect,
    cRadio,
    cDataPick,
    cCheckbox,
    cSwitch,
  },
  props: {
    formType: {
      type: String,
      default: "",
    },
    rule: {
      type: Array,
      require: true,
      default: () => {
        return [];
      },
    },
    clickActive: {
      type: [Boolean, String],
      require: true,
    },
  },
  watch: {
    clickActive(newV) {
      if (newV) {
        this.initializeFormData();
      }
    },
  },
  computed: {
    componentsRule() {
      const componentsRule = [
        {
          type: "switch",
          value: false,
          label: "禁用",
          props: {
            size: "small",
          },
          fileId: "disabled",
          rules: [],
          col: {
            span: 24,
          },
          formProps: { isRequired: false, labelAlign: "left" },
          attrs: ["input", "select", "radio", "datePicker"],
        },
        {
          type: "switch",
          value: false,
          label: "清除图标",
          props: {
            size: "small",
          },
          fileId: "allowClear",
          rules: [],
          col: {
            span: 24,
          },
          formProps: { isRequired: false, labelAlign: "left" },
          attrs: ["input", "select", "datePicker"],
        },
      ];
      return componentsRule.filter((v) => {
        return v.attrs.includes(this.formType);
      });
    },
  },
  data() {
    return {
      zCreateFormModel: {},
      formConfingModel: {
        formProps: {
          labelAlign: "left",
          hideRequiredMark: false,
          isRequired: false,
        },
        col: {
          span: 0,
        },
        props: {
          placeholder: "",
          allowClear: false,
        },
        label: "",
        fileId: "",
      },
      copyRule: [], //点击复制的rule
      optionModelConfig: {
        show: false,
      },
    };
  },
  mounted() {
    this.copyRule = this.rule;
  },
  methods: {
    allowClearChange(v) {
      console.log(v, "v");
    },
    // //初始化赋值
    initializeFormData() {
      this.copyRule = this.rule;
      const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);
      if (ruleItem) {
        Object.keys(ruleItem).forEach((ruleKey) => {
          //当key的类型是对象的时候 并且是需要赋值的字段
          if (ruleItemObjKey.includes(ruleKey)) {
            //取出ruleItem[ruleKey]的key集合 然后进行 赋值
            Object.keys(ruleItem[ruleKey]).forEach((ruleItemKey) => {
              this.setFormConfingModel(
                ruleKey,
                getRuleItemValue(ruleItem, ruleKey, ruleItemKey),
                ruleItemKey
              );
            });
            //当ruleKey的类型是可以直接赋值的情况
          } else if (ruleItemStrKey.includes(ruleKey)) {
            this.setFormConfingModel(
              ruleKey,
              getRuleItemValue(ruleItem, ruleKey)
            );
          }
        });
      }
    },
    // initializeFormData() {
    //   this.copyRule = this.rule;
    //   const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);

    // },
    //给formConfingModel赋值
    setFormConfingModel(ruleKey, value, ruleItemKey) {
      if (ruleItemKey) {
        this.formConfingModel[ruleKey][ruleItemKey] = value;
      } else {
        this.formConfingModel[ruleKey] = value;
      }
    },
    // //把值传递给父级 然后合并同类项
    handleRetuenForm(ruleKey, value, ruleItemKey) {
      const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);
      setRuleItem(ruleItem, ruleKey, value, ruleItemKey);
      this.$emit("handleRetuenForm", ruleItem, ruleKey, value, ruleItemKey);
    },
    // //input框的的blul时间
    handleInputBlur(event, ruleKey, ruleItemKey) {
      const {
        target: { value },
      } = event;
      this.handleRetuenForm(ruleKey, value, ruleItemKey);
    },
  },
};
</script>
<style lang="scss" scoped>
.operationalZone {
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  border: 2px solid #c4bfbf;
  box-shadow: #c4bfbf 1px 0 5px 1px;
  border-radius: 5px;
}
</style>
