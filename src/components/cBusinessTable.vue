<template>
  <div class="cBusinessTable">
    <div
      class="cBusinessTable_operation_box"
      ref="operationBox"
      v-show="rule.length"
    >
      <div class="cBusinessTable_form">
        <zFormCreate v-model="formModel" :formConfig="formConfig" :rule="rule">
        </zFormCreate>
      </div>
      <div class="cBusinessTable_serach">
        <a-button v-bind="serachBtnBind" @click="getTable">{{
          serachBtnBind.text
        }}</a-button>
        <a-button
          @click="handleRestClick"
          v-if="showResetBtn"
          v-bind="resetBtnBind"
          >{{ resetBtnBind.text }}
        </a-button>
        <slot name="serach"></slot>
      </div>
    </div>
    <div class="cBusinessTable_btn_group" v-if="$slots.btnGroup">
      <slot name="btnGroup"></slot>
    </div>
    <div class="cBusinessTable_main">
      <a-table
        bordered
        :pagination="false"
        :columns="tableColumns"
        :data-source="tableData"
        v-bind="$attrs"
      >
        <!-- v-slot:[v.name]="value, row, index" -->
        <template
          v-for="v in slotArr"
          :slot="v.name"
          slot-scope="value, row, index"
        >
          <slot
            :name="v.name"
            v-bind="returnSlotParams(v.type, { value, row, index })"
          ></slot>
        </template>
      </a-table>
    </div>
    <div class="cBusinessTable_pag">
      <a-pagination
        v-model="pageParams.pageNo"
        :page-size-options="pageSizeOptions"
        :total="pageParams.total"
        :page-size="pageParams.pageLength"
        @showSizeChange="handleSizeChange"
        @change="handleCurrentChange"
        :show-total="showTotal"
        show-size-changer
      ></a-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "cBusinessTable",
  props: {
    // zformCreate的value
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 是否显示操作行
    isBtnShow: {
      type: Boolean,
      default: true,
    },
    // 获取表格数据的方法 查询 翻页 重置都会调用这个方法
    getTableVoid: {
      type: Function,
      require: true,
    },
    /**
     *  表头，包含label和prop具体见下面表格
     */
    tableColumns: {
      type: Array,
      required: true,
    },
    /**
     *  搜索框
     */
    rule: {
      type: Array,
      required: true,
    },
    /**
     * formConfig
     */
    formConfig: {
      type: Object,
      default: () => {
        return {
          labelCol: { span: 0 },
          wrapperCol: {
            span: 24,
          },
          labelAlign: "left",
          labelWidth: 130,
          colonStatus: true,
        };
      },
    },
    /**
     *  是否显示重置按钮
     */
    showResetBtn: {
      type: Boolean,
      default: true,
    },
    /**
     *  是否显示分页，如果无分页则请求函数无pageNum与pageSize参数
     */
    showPaging: {
      type: Boolean,
      default: true,
    },
    // 加载数据的时候的模态框
    showLoading: {
      type: Boolean,
      default: true,
    },
    // 底部导航栏的参数
    pagingParams: {
      type: Object,
      default() {
        return {
          pageNum: "pageNo",
          pageSize: "pageLength",
          total: "total",
        };
      },
    },
    pageSizeOptions: {
      type: Array,
      default: () => {
        return ["10", "20", "30", "40", "50"];
      },
    },
  },
  computed: {
    // 查询按钮的配置
    serachBtnBind() {
      const obj = { size: "default", type: "primary", text: "查询" };
      if (this.$attrs.serachBtnConfig) {
        for (const key in this.$attrs.serachBtnConfig) {
          if (Object.hasOwnProperty.call(this.$attrs.serachBtnConfig, key)) {
            const element = this.$attrs.serachBtnConfig[key];
            obj[key] = element;
          }
        }
      }
      return obj;
    },
    // 重置按钮的配置
    resetBtnBind() {
      const obj = { size: "default", text: "重置" };
      if (this.$attrs.resetBtnConfig) {
        for (const key in this.$attrs.resetBtnConfig) {
          if (Object.hasOwnProperty.call(this.$attrs.resetBtnConfig, key)) {
            const element = this.$attrs.resetBtnConfig[key];
            obj[key] = element;
          }
        }
      }
      return obj;
    },

    slotArr() {
      const slotArr = [];
      this.tableColumns.forEach((v) => {
        if (v.scopedSlots) {
          for (const key in v.scopedSlots) {
            if (Object.hasOwnProperty.call(v.scopedSlots, key)) {
              const element = v.scopedSlots[key];
              slotArr.push({ type: key, name: element });
            }
          }
        }
      });
      return slotArr;
    },
  },
  data() {
    return {
      fApi: {},
      tableData: [],
      pageParams: {
        pageLength: 10,
        pageNo: 1,
        total: 0,
      },
      formModel: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // init初始化列表
    init() {
      this.getTable();
      // v-model双向绑定把事件组丢出去
      this.$emit("input", this.formModel);
    },
    //格式化展示总页数
    showTotal(total, range) {
      return `第${range[0]} 至 ${range[1]} 条 ,共${total}条`;
    },
    // 获取表格数据 type判断是按钮点击还是 分页点击
    async getTable(type) {
      const params = {};
      if (this.showPaging) {
        params[this.pagingParams.pageNum] = this.pageParams.pageNo;
        params[this.pagingParams.pageSize] = this.pageParams.pageLength;
      }
      if (typeof type === "object") {
        params[this.pagingParams.pageNum] = 1;
        this.pageParams.pageNo = 1;
      }
      if (this.rule.length && this.formModel.getFormData) {
        Object.assign(params, this.formModel.getFormData());
      }
      const { list, total } = await this.getTableVoid(params);
      this.tableData = [];
      this.tableData = list;
      this.pageParams.total = total;
    },
    // 点击翻页
    handleCurrentChange(current) {
      this.pageParams.pageNo = current;
      this.getTable(true);
    },
    // 点击切换页码
    handleSizeChange(current, size) {
      this.pageParams.pageNo = current;
      this.pageParams.pageLength = size;
      this.getTable(true);
    },
    // 重置按钮的事件
    handleRestClick() {
      this.$emit("handleRestClick");
    },
    //根据不同的参数 返回不一样的插槽返回值
    returnSlotParams(type, params) {
      if (type === "customRender") {
        return params;
      }
      if (type === "filterDropdown") {
        return { ...params.value };
      }
    },
  },
};
// export default {
//   name: "cBusinessTable",
//   data() {
//     return {};
//   },
// };
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";
.cBusinessTable {
  width: 100%;
  height: 100%;
  .cBusinessTable_operation_box {
    width: 100%;
    padding: 0 5px;
    @include flex-row-sb-s();
    .cBusinessTable_form {
      width: calc(100% - 150px);
      .zCreateForm > .ant-form > .ant-row .ant-form-item {
        margin-bottom: 0;
      }
    }

    .cBusinessTable_serach {
      width: 150px;
      height: 100%;
      @include flex-row-e-e();
      text-align: right;
      flex-wrap: wrap;
    }
  }

  .cBusinessTable_btn_group {
    width: 100%;
    padding: 2px 4px;
    @include flex-row-e-c();
  }

  .cBusinessTable_main {
    width: 100%;
    flex: 1;
  }

  .cBusinessTable_pag {
    width: 100%;
    height: 50px;
    @include flex-row-e-c();
  }
}
</style>