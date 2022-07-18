<template>
  <div class="setSelectOption">
    <div>
      <span class="label">{{ setOptionsValue() }}</span>
      <a-button size="small" type="link" @click="formModelConfig.show = true"
        >打开</a-button
      >
    </div>
    <a-modal
      :z-index="2000"
      :destroyOnClose="true"
      title="设置select的option"
      :width="800"
      cancelText="取消"
      okText="确定"
      @ok="handleSubmitOptions"
      v-model="formModelConfig.show"
    >
      <div class="model_table_header">
        <a-button size="small" @click="handleAddTableData">添加</a-button>
      </div>
      <a-table
        :pagination="false"
        :columns="columns"
        :data-source="options"
        bordered
      >
        <template slot="label" slot-scope="label, row">
          <a-input v-model="row.label"></a-input>
        </template>
        <template slot="value" slot-scope="value, row">
          <a-input v-model="row.value"></a-input>
        </template>
        <template slot="operate" slot-scope="value, row, index">
          <a-button size="small" @click="handleDelTableData(index)"
            >删除</a-button
          >
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: "setSelectOption",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultOption: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    // options() {
    //   return this.value;
    // },
  },
  watch: {
    value(newV) {
      console.log(newV, "newV");
      this.options = this.value;
    },
  },
  data() {
    return {
      formModelConfig: {
        show: false,
      },
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          customRender: (v, row, index) => {
            return {
              children: index + 1,
            };
          },
        },
        {
          title: "label",
          dataIndex: "label",
          key: "label",
          scopedSlots: { customRender: "label" },
        },
        {
          title: "value",
          dataIndex: "value",
          key: "value",
          scopedSlots: { customRender: "value" },
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          scopedSlots: { customRender: "operate" },
        },
      ],
      options: [],
    };
  },
  mounted() {
    this.options = this.value;
  },
  methods: {
    //点击新增一条表单的数据
    handleAddTableData() {
      this.options.push({
        label: "",
        value: "",
      });
    },
    //点击删除数据
    handleDelTableData(k) {
      console.log(k);
      this.options.splice(k, 1);
    },
    //弹窗里面的确定按钮
    handleSubmitOptions() {
      this.formModelConfig.show = false;
      this.$emit(
        "handleSubmitOptions",
        this.options.filter((v) => v.label && v.value)
      );
      this.$emit(
        "input",
        this.options.filter((v) => v.label && v.value)
      );
    },
    setOptionsValue() {
      return `已有${this.options.length}条数据`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";

.setSelectOption {
  width: 100%;
  height: 100%;

  .label {
    width: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.model_table_header {
  width: 100%;
  @include flex-row-e-c;
  height: 40px;
}
</style>