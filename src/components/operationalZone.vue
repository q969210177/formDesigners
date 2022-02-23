<template>
  <div class="operationalZone">
    <div>
      {{ clickActive }}
      <a-tabs type="card" v-if="clickActive">
        <a-tab-pane key="1" tab="表单配置">
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
          <a-form-model :model="formConfingModel">
            <a-form-model-item label="标签位置">
              <cRadio
                v-model="formConfingModel.labelAlign"
                :options="[
                  {
                    label: '左',
                    value: 'left',
                  },
                  { label: '右', value: 'right' },
                ]"
                @change="(v) => handleRetuenForm('labelAlign', v, 'formProps')"
              ></cRadio>
            </a-form-model-item>
            <a-form-model-item label="是否必填">
              <a-switch
                v-model="formConfingModel.isRequired"
                @change="(v) => handleRetuenForm('isRequired', v, 'formProps')"
              ></a-switch>
            </a-form-model-item>

            <a-form-model-item label="设置表单的长度">
              <a-slider
                v-model="formConfingModel.span"
                :max="24"
                @afterChange="(v) => handleRetuenForm('span', v, 'col')"
              />
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="组件配置"> </a-tab-pane>
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
const ruleItemObjKey = ["props", "rules", "col", "formProps"];
const ruleItemStrKey = ["label", "fileId"];
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
    clickActive() {
      this.initializeFormData();
    },
  },
  data() {
    return {
      formConfingModel: {
        labelAlign: "left",
        hideRequiredMark: false,
        isRequired: false,
        span: 0,
        label: "",
        fileId: "",
      },
      copyRule: [], //点击复制的rule
    };
  },
  mounted() {
    this.copyRule = this.rule;
  },
  methods: {
    //初始化赋值
    initializeFormData() {
      this.copyRule = this.rule;
      const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);
      console.log(ruleItem, "ruleItem");
      //首先把 ruleItem的key的集合拿出来
      Object.keys(ruleItem).forEach((ruleKey) => {
        //当key的类型是对象的时候 并且是需要赋值的字段
        if (ruleItemObjKey.includes(ruleKey)) {
          //取出ruleItem[ruleKey]的key集合 然后进行 赋值
          Object.keys(ruleItem[ruleKey]).forEach((ruleItemKey) => {
            this.setFormConfingModel(
              ruleItemKey,
              getRuleItemValue(ruleItem, ruleKey, ruleItemKey)
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
      //当数值是个对象 给对象里面的属性赋值
      // this.formConfingModel = {
      //   labelAlign: "left",
      //   hideRequiredMark: false,
      //   isRequired: false,
      //   span: 0,
      // };
    },
    //给formConfingModel赋值
    setFormConfingModel(formKey, value) {
      if (Reflect.has(this.formConfingModel, formKey)) {
        this.formConfingModel[formKey] = value;
      }
    },
    //把值传递给父级 然后合并同类项
    handleRetuenForm(ruleKey, value, ruleItemKey) {
      const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);
      setRuleItem(ruleItem, ruleKey, value, ruleItemKey);
      this.$emit("handleRetuenForm", ruleItem, ruleKey, value, ruleItemKey);
    },
    //input框的的blul时间
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
