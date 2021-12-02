<template>
  <div id="app">
    <header class="header">
      查看json{{ ComponentsModelValue }}
      <a-button @click="test">111</a-button>
    </header>
    <aside class="asdie">
      <ComponentsMenu
        @confirmClick="handleConfirmClick"
        v-model="ComponentsModelValue"
      />
    </aside>
    <main class="main">
      <div class="form_box">
        <zFormDesigners v-model="formApi" :rule="rule"></zFormDesigners>
      </div>
    </main>
    <aside class="operational_aside">
      <OperationalZone
        @handleLabelChange="() => {}"
        :formType="ComponentsModelValue"
      />
    </aside>
    <!-- <cForm :rule="rule"></cForm> -->
  </div>
</template>
<script>
// const testOptions = [
//   { label: "111", value: "11" },
//   { label: "2", value: "3" },
//   { label: "4", value: "6" },
//   { label: "5", value: "7" },
// ];
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
      rule: [
        // {
        //   type: "input",
        //   value: "",
        //   fileId: "input",
        // },
        // {
        //   type: "datePicker",
        //   value: "",
        //   fileId: "datePicker",
        // },
        // {
        //   type: "select",
        //   options: testOptions,
        //   value: "",
        //   fileId: "select",
        // },
        // {
        //   type: "radio",
        //   options: testOptions,
        //   value: "",
        //   fileId: "radio",
        // },
        // {
        //   type: "checkbox",
        //   value: [],
        //   fileId: "checkbox",
        //   options: testOptions,
        // },
        // {
        //   type: "switch",
        //   value: "",
        //   fileId: "switch",
        // },
      ],
    };
  },
  methods: {
    //选择组件的确认事件
    handleConfirmClick(v) {
      if (v.name) {
        this.rule.push(v.data);
      }
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
