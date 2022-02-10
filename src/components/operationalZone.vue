<template>
  <div class="operationalZone">
    <div>
      {{ clickActive }}
      <a-tabs type="card" v-if="clickActive">
        <a-tab-pane key="1" tab="表单配置">
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
            <!-- <a-form-model-item label="是否显示必填">
              <a-switch
                @change="(v) => handleRetuenForm(v, 'hideRequiredMark')"
                v-model="formConfingModel.hideRequiredMark"
              ></a-switch>
            </a-form-model-item> -->
            <a-form-model-item label="设置表单的长度">
              <a-slider
                v-model="formConfingModel.span"
                :max="24"
                @afterChange="(v) => handleRetuenForm('span', v, 'col')"
              />
            </a-form-model-item>
            <!-- <a-form-model-item label="Activity zone">
              <a-select
                v-model="form.region"
                placeholder="please select your zone"
              >
                <a-select-option value="shanghai"> Zone one </a-select-option>
                <a-select-option value="beijing"> Zone two </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="Activity time">
              <a-date-picker
                v-model="form.date1"
                show-time
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="Instant delivery">
              <a-switch v-model="form.delivery" />
            </a-form-model-item>
            <a-form-model-item label="Activity type">
              <a-checkbox-group v-model="form.type">
                <a-checkbox value="1" name="type"> Online </a-checkbox>
                <a-checkbox value="2" name="type"> Promotion </a-checkbox>
                <a-checkbox value="3" name="type"> Offline </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="Resources">
              <a-radio-group v-model="form.resource">
                <a-radio value="1"> Sponsor </a-radio>
                <a-radio value="2"> Venue </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="Activity form">
              <a-input v-model="form.desc" type="textarea" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="onSubmit"> Create </a-button>
              <a-button style="margin-left: 10px"> Cancel </a-button>
            </a-form-model-item> -->
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="组件配置"> </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import cSelect from "@/formDesigners/components/cSelect.vue";
import cRadio from "@/formDesigners/components/cRadio.vue";
import cDataPick from "@/formDesigners/components/cDataPick.vue";
import cCheckbox from "@/formDesigners/components/cCheckbox.vue";
import cSwitch from "@/formDesigners/components/cSwitch.vue";
// eslint-disable-next-line no-unused-vars
import { getRuleItem, setRuleItem } from "@/formDesigners/utils/utils.js";
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
      this.formConfingModel = {
        labelAlign: "left",
        hideRequiredMark: false,
        isRequired: false,
        span: 0,
      };
    },
    //把值传递给父级 然后合并同类项
    // eslint-disable-next-line no-unused-vars
    handleRetuenForm(ruleKey, value, ruleItemKey) {
      const { ruleItem } = getRuleItem(this.copyRule, this.clickActive);
      setRuleItem(ruleItem, ruleKey, value, ruleItemKey);
      // this.copyRule.splice(index, ruleItem);
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
