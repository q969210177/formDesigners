<template>
  <div id="app">
    <zformDesigners>
      <template v-slot:header>
        <a-button>头部插槽按钮</a-button>
      </template>
    </zformDesigners>
    <!-- <header class="header">
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
        @handleRetuenForm="handleRetuenForm"
        :formType="ComponentsModelValue"
      />
    </aside>-->
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
    // OperationalZone: operationalZone,
    // ComponentsMenu: componentsMenu
    // ddd: testddd(),
  },
  data() {
    return {
      // vis: false,
      ComponentsModelValue: '',
      formApi: {},
      rule: [],
      clickActive: null
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layOut.scss';
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
