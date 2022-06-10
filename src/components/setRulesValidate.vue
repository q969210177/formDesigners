<template>
  <div class="setRulesValidate">
    <div>
      <span class="label">{{setOptionsValue()}}</span>
      <a-button size="small" type="link" @click="formModelConfig.show=true">打开</a-button>
    </div>
    <a-modal
      :destroyOnClose="true"
      title="设置组件的验证规则"
      :width="1000"
      cancelText="取消"
      okText="确定"
      @ok="handleSubmitOptions"
      v-model="formModelConfig.show"
    >
      <div class="model_table_header">
        <a-button size="small" @click="handleAddTableData">添加</a-button>
      </div>
      <a-table size="small" :pagination="false" :columns="columns" :data-source="options" bordered>
        <template slot="operate" slot-scope="value,row,index">
          <a-button size="small" @click="handleDelTableData(index)">删除</a-button>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
// import { clone } from '@/utils/utils.js'

export default {
  name: 'setRulesValidate',
  props: {
    value: {},
    defaultOption: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value(newV) {
      this.options = newV
    }
  },
  data() {
    return {
      formModelConfig: {
        show: false
      },
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          customRender: (v, row, index) => {
            return {
              children: index + 1
            }
          }
        },
        {
          title: '是否必填',
          dataIndex: 'required',
          key: 'required',
          customRender: (v, row, index) => {
            const dom = (
              <a-radio-group
                value={row.required}
                onChange={$Event => {
                  const {
                    target: { value }
                  } = $Event
                  row.required = value
                }}
                name="required"
              >
                <a-radio value={true}>必填</a-radio>
                <a-radio value={false}>非必填</a-radio>
              </a-radio-group>
            )
            return {
              children: index === 0 ? dom : ''
            }
          }
        },
        {
          title: '校验触发的时机',
          dataIndex: 'trigger',
          key: 'trigger',
          width: 200,
          customRender: (v, row) => {
            const dom = (
              <a-radio-group
                value={row.trigger}
                onChange={$Event => {
                  const {
                    target: { value }
                  } = $Event
                  row.trigger = value
                }}
                name="required"
              >
                <a-radio value="blur">blur</a-radio>
                <a-radio value="change">change</a-radio>
              </a-radio-group>
            )
            return {
              children: dom
            }
          }
        },
        {
          title: '最大长度',
          dataIndex: 'max',
          key: 'max',
          customRender: (v, row) => {
            const dom = (
              <a-input-number
                value={row.max}
                onChange={v => {
                  row.max = v
                }}
              ></a-input-number>
            )
            return {
              children: dom
            }
          }
        },
        {
          title: '最小长度',
          dataIndex: 'min',
          key: 'min',
          customRender: (v, row) => {
            const dom = (
              <a-input-number
                value={row.min}
                onChange={v => {
                  row.min = v
                }}
              ></a-input-number>
            )
            return {
              children: dom
            }
          }
        },
        {
          title: '校验文案',
          dataIndex: 'message',
          key: 'message',
          customRender: (v, row) => {
            const dom = (
              <a-input
                value={row.message}
                onChange={$Event => {
                  const {
                    target: { value }
                  } = $Event
                  row.message = value
                }}
              ></a-input>
            )
            return {
              children: dom
            }
          }
        },
        // {
        //   title: '校验数据类型',
        //   dataIndex: 'type',
        //   key: 'type'
        // },
        {
          title: '空格是否被认为错误',
          dataIndex: 'whitespace',
          key: 'whitespace',
          customRender: (v, row) => {
            const dom = (
              <a-radio-group
                value={row.whitespace}
                onChange={$Event => {
                  const {
                    target: { value }
                  } = $Event
                  row.whitespace = value
                }}
                name="whitespace"
              >
                <a-radio value={true}>是</a-radio>
                <a-radio value={false}>否</a-radio>
              </a-radio-group>
            )
            return {
              children: dom
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      options: []
    }
  },
  mounted() {
    this.options = this.value
  },
  methods: {
    //点击新增一条表单的数据
    handleAddTableData() {
      this.options.push({
        required: true,
        trigger: 'blur',
        max: 9999,
        min: 0,
        message: '必填项未填写',
        // type: 'any',
        whitespace: false
      })
    },
    //点击删除数据
    handleDelTableData(k) {
      this.options.splice(k, 1)
    },
    //弹窗里面的确定按钮
    handleSubmitOptions() {
      this.formModelConfig.show = false
      this.$emit('handleSubmitOptions', this.options)
      this.$emit('input', this.options)
    },
    setOptionsValue() {
      return `已有${this.options.length}条规则`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';
.setRulesValidate {
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