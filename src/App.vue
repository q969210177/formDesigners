<template>
  <div id="app">
    <header class="header">
      <a-button @click="test">预览</a-button>
    </header>
    <aside class="asdie">
      <ComponentsMenu v-model="ComponentsModelValue" />
    </aside>

    <main class="main">
      <div
        class="form_box"
        @drop="handleDropEvent"
        @dragover="handleDragoverEvent"
      >
        <zFormDesigners
          :clickActive.sync="clickActive"
          @rowClick="handleRowClick"
          @handleRowDelect="handleRowDelectClick"
          @handleRowCopy="handleRowCopyClick"
          v-model="formApi"
          :rule="rule"
        ></zFormDesigners>
      </div>
    </main>
    <aside class="operational_aside">
      <OperationalZone
        :rule="rule"
        :clickActive="clickActive"
        @handleRetuenForm="storageRule"
        :formType="ComponentsModelValue"
      />
    </aside>
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import componentsMenu from "@/components/componentsMenu.jsx";
import operationalZone from "@/components/operationalZone.vue";
import { getRuleItem, setCompoentId } from "@/formDesigners/utils/utils.js";
// import testddd from "./com";
export default {
  name: "App",
  components: {
    OperationalZone: operationalZone,
    ComponentsMenu: componentsMenu,
    // ddd: testddd(),
  },
  data() {
    return {
      // vis: false,
      ComponentsModelValue: "",
      formApi: {},
      rule: [],
      clickActive: null,
    };
  },
  mounted() {
    const rule = localStorage.getItem("rule");
    if (rule) {
      this.rule = JSON.parse(rule);
    }
  },
  methods: {
    //表单的点击删除事件
    handleRowDelectClick({ fileId }) {
      if (fileId) {
        const { index } = getRuleItem(this.rule, fileId);
        this.rule.splice(index, 1);
        this.clickActive = null;
        this.storageRule();
      }
    },
    //点击复制当前行
    handleRowCopyClick(ruleItem, index) {
      const newRuleItem = JSON.parse(JSON.stringify(ruleItem));
      newRuleItem.fileId = setCompoentId();
      this.rule.splice(index, 0, newRuleItem);
      this.storageRule();
    },
    //选择组件的确认事件
    handleRowClick(fileId) {
      const { ruleItem } = getRuleItem(this.rule, fileId);
      this.ComponentsModelValue = ruleItem.type;
      // if (v.name) {
      //   this.rule.push(v.data);
      // }
    },
    //把数据存到 locas
    storageRule() {
      localStorage.removeItem("rule");
      localStorage.setItem("rule", JSON.stringify(this.rule));
    },
    //释放区域的拖拽结束事件
    handleDropEvent($event) {
      $event.preventDefault();
      $event.dataTransfer.dropEffect = "move";
      const data = $event.dataTransfer.getData("text/plain");
      console.log(data, "data");
      this.rule.push(JSON.parse(data));
      this.storageRule();
    },
    //拖拽中的事件
    handleDragoverEvent($event) {
      $event.preventDefault();
    },
    test() {
      // const { getFormData } = this.formApi;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layOut.scss";
#app {
  width: 100vw;
  height: 100vh;
  @include flex-row-s-c;
  flex-wrap: wrap;
  .header {
    width: 100%;
    height: 40px;
    @include flex-row-s-c;
  }
  .asdie {
    width: 20%;
    height: calc(100% - 40px);
    padding: 10px 5px;
  }
  .main {
    width: 60%;
    height: calc(100% - 40px);
    padding: 10px 10px;

    .form_box {
      width: 100%;
      height: 100%;
      border: 2px solid #c4bfbf;
      box-shadow: #c4bfbf 1px 0 5px 1px;
      border-radius: 5px;
      padding: 10px;
      overflow-y: auto;
    }
    // @include flex-row-s-c;
  }
  .operational_aside {
    width: 20%;
    height: calc(100% - 40px);
    padding: 10px;
    // @include flex-row-s-c;
  }
  // padding: 5%;
}
</style>
