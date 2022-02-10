<template>
  <div id="app">
    <header class="header">
      {{ ComponentsModelValue }}
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
        <!-- 做个是用来渲染的 @rowClick="handleRowClick" -->
        <zFormDesigners
          :clickActive.sync="clickActive"
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
        @handleRetuenForm="handleOperationalZoneChange"
        :formType="ComponentsModelValue"
      />
    </aside>
    <!-- <cForm :rule="rule"></cForm> -->
  </div>
</template>
<script>
import componentsMenu from "@/components/componentsMenu.jsx";
import operationalZone from "@/components/operationalZone.vue";
import { getRuleItem, setCompoentId } from "@/formDesigners/utils/utils.js";
export default {
  name: "App",
  components: {
    OperationalZone: operationalZone,
    ComponentsMenu: componentsMenu,
  },
  data() {
    return {
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
    //右侧的列表选项的改变事件
    //第一个参数是对象的key 第二个是对象的value 这个是配置表单属性的方法
    handleOperationalZoneChange() {
      /**
       * 根据key的不同 拿到字段里面的key
       */
      // const { ruleItem, index } = getRuleItem(this.rule, this.clickActive);
      // ruleItem.formProps[key] = value;
      // console.log(ruleItem, "ruleItem");
      // this.rule.splice(index, ruleItem);
    },
    //选择组件的确认事件
    handleConfirmClick(v) {
      if (v.name) {
        this.rule.push(v.data);
      }
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
      this.rule.push(JSON.parse(data));
      this.storageRule();
    },
    //拖拽中的事件
    handleDragoverEvent($event) {
      $event.preventDefault();
    },
    test() {
      const { getFormData } = this.formApi;
      console.log(getFormData());
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
