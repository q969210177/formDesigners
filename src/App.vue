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
// import testddd from "./com";
export default {
  name: 'App',
  components: {
    // ddd: testddd(),
  },
  data() {
    return {
      // vis: false,
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';
#app {
  width: 100vw;
  height: 100vh;
}
</style>
