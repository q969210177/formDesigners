/* eslint-disable no-unused-vars */
import { componentsObj } from "./data/compoents";
import zFormDesignersItem from "./zFormDesignersItem";
import { validatorOption, getDataType, setCompoentId } from "./utils/utils";
import "./style/zFormDesigners.scss";
export default {
  name: "zFormDesigners",
  components: {
    zFormDesignersItem,
  },
  props: {
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    clickActive: {},
    formConfig: {
      type: Object,
      default: () => {
        return {
          labelCol: { span: 4 },
          wrapperCol: {
            span: 20,
          },
          labelAlign: "left",
        };
      },
    },
    value: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      copyRule: [],
      // clickActive: null,
    };
  },
  methods: {
    //获取json格式的数据
    getFormData() {
      const formData = {};
      this.rule.forEach((i) => {
        formData[i.fileId] = i.value;
      });
      return formData;
    },
    //设置组件的rule
    setFormRule(fileId, rule) {},
    //拖拽表单进行排序
  },
  mounted() {
    this.$emit("input", { getFormData: this.getFormData });
  },
  render(h) {
    this.copyRule = this.rule;
    return (
      <div
        class="zFormDesigners"
        onClick={($event) => {
          const {
            target: { className },
          } = $event;
          if (className === "zFormDesigners") {
            this.$emit("update:clickActive", false);
          }
          console.log(className);
        }}
      >
        <a-form-model props={{ model: this.formData, ...this.formConfig }}>
          <a-row gutter={20}>
            {this.copyRule.map((i, k) => {
              const status = this.clickActive === i.fileId;
              return (
                <a-col
                  draggable
                  span={i.col.span}
                  onDrop={($event) => {
                    $event.preventDefault();
                    const data = $event.dataTransfer.getData("text/plain");
                    console.log(data, "drop");
                  }}
                  onDragstart={($event) => {
                    $event.preventDefault();
                    // i.data.fileId = setCompoentId();
                    $event.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify(i)
                    );
                  }}
                  onDragover={($event) => {
                    $event.preventDefault();
                  }}
                >
                  <div
                    class={{
                      rule_item: true,
                      active_item: status,
                    }}
                    onClick={() => {
                      // this.clickActive = i.fileId;
                      this.$emit("rowClick", i.fileId);
                      this.$emit("update:clickActive", i.fileId);
                    }}
                  >
                    <div class="rule_item_form">
                      <zFormDesignersItem formItem={i}></zFormDesignersItem>
                    </div>
                    <div class="rule_item_edit">
                      {status ? (
                        <div>
                          <a-icon
                            title="删除"
                            onClick={() => {
                              this.$emit("handleRowDelect", i);
                            }}
                            type="delete"
                            style={{ color: "#ff4d4f" }}
                          />
                          <a-icon
                            title="复制"
                            onClick={() => {
                              this.$emit("handleRowCopy", i, k);
                            }}
                            type="copy"
                            style={{ color: "#1890ff" }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </a-col>
              );
            })}
          </a-row>
        </a-form-model>
      </div>
    );
  },
};
