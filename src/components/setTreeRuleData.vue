<template>
  <div class="setTreeRuleData">
    <div>
      <span class="label">{{ setOptionsValue() }}</span>
      <a-button size="small" type="link" @click="formModelConfig.show = true"
        >打开</a-button
      >
    </div>
    <a-modal
      :destroyOnClose="true"
      title="设置数据"
      :width="800"
      cancelText="取消"
      okText="确定"
      @ok="handleSubmitOptions"
      v-model="formModelConfig.show"
    >
      <a-button @click="handleAddOptions(1)">新增一级数据</a-button>
      <a-tree :treeData="options" :blockNode="true">
        <template slot="title" slot-scope="tree">
          <div class="tree_title">
            <input
              @change="($e) => handleSetTreeTitle(tree, $e)"
              v-model="tree.title"
              type="text"
              placeholder="请输入"
            />
            <span>
              {{ tree.dataRef.level }}
            </span>
            <a-button
              type="link"
              @click="handleAddOptionsChild(tree, tree.dataRef.level + 1)"
              >新增下级</a-button
            >
            <a-button type="link">删除</a-button>
            <!-- <a-button type="link">11</a-button> -->
            <!--  type="text"
              v-model="dataRef.name"
              @change="($e) => handleAddInputChange(dataRef, $e)"
              @blur="($e) => handleAddInputBlur(dataRef, $e)"
              placeholder="请输入分组名称" -->
          </div>
          <!-- <a-input v-model="row.label"></a-input> -->
        </template>
      </a-tree>
    </a-modal>
  </div>
</template>
<script>
import { setCompoentId, handleTreeDataSlot } from "@/utils/utils";
export default {
  name: "setTreeRuleData",
  props: {
    value: {},
    defaultOption: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    this.options = this.handleTreeDataSlot(this.value);
  },
  data() {
    return {
      formModelConfig: {
        show: false,
      },
      options: [],
    };
  },
  methods: {
    //设置一下tree的插槽
    handleTreeDataSlot,
    //默认新增一条tree的数据
    handleAddOptions(level) {
      const addObj = {
        title: "",
        key: setCompoentId(),
        level: level,
        children: [],
        scopedSlots: { title: "title" },
      };
      this.options.push(addObj);
    },
    //新增树形下面的一条
    handleAddOptionsChild(tree, level) {
      const { dataRef } = tree;
      const addObj = {
        title: "",
        key: setCompoentId(),
        level: level,
        scopedSlots: { title: "title" },
      };
      if (dataRef.children && dataRef.children.length) {
        dataRef.children.push(addObj);
      } else {
        this.$set(dataRef, "children", []);
        dataRef.children.push(addObj);
      }
    },
    //点击删除数据
    handleDelTableData(k) {
      this.options.splice(k, 1);
    },
    //弹窗里面的确定按钮
    handleSubmitOptions() {
      this.formModelConfig.show = false;
      this.$emit("handleSubmitOptions", this.options);
      this.$emit("input", this.options);
    },
    setOptionsValue() {
      return `已有${this.options.length}条数据`;
    },
    //修改标签的name
    handleSetTreeTitle(treeItem, $event) {
      console.log(treeItem, "treeItem11");
      const { dataRef } = treeItem;
      dataRef.title = $event.target.value;
      if (!dataRef.key) {
        dataRef.key = setCompoentId();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.setTreeRuleData {
  width: 100%;
  height: 100%;
}

input {
  border: 0;
  outline: none;
  background: transparent;
}

.tree_title {
}
</style>
