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
        <!-- 做个是用来渲染的 -->
        <zFormDesigners
          @rowClick="handleRowClick"
          v-model="formApi"
          :rule="rule"
        ></zFormDesigners>
      </div>
    </main>
    <aside class="operational_aside">
      <OperationalZone
        v-if="clickActive"
        @handleLabelChange="handleOperationalZoneChange"
        :formType="ComponentsModelValue"
      />
    </aside>
    <!-- <cForm :rule="rule"></cForm> -->
  </div>
</template>
<script>
import componentsMenu from "@/components/componentsMenu.jsx";
import operationalZone from "@/components/operationalZone.jsx";
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
    //表单的row点击事件
    handleRowClick(clickActive) {
      this.clickActive = clickActive;
    },
    //右侧的列表选项的改变事件
    //第一个参数是对象的key 第二个是对象的value
    // eslint-disable-next-line no-unused-vars
    handleOperationalZoneChange(key, value) {
      this.returnRuleItem(this.clickActive)[key] = value;
    },
    //根据comId来返回rule里面的子项
    returnRuleItem(fileId) {
      for (let index = 0; index < this.rule.length; index++) {
        const item = this.rule[index];
        if (item.fileId === fileId) {
          return item;
        }
      }
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
  width: 100%;
  height: 100%;
  @include flex-row-s-c;
  flex-wrap: wrap;
  .header {
    width: 100%;
    height: 40px;
    @include flex-row-s-c;
    border: 1px solid red;
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
