<template>
  <div id="app">
    <header class="header">查看json{{ ComponentsModelValue }}</header>
    <aside class="asdie">
      <ComponentsMenu v-model="ComponentsModelValue" />
    </aside>
    <main class="main"></main>
    <aside class="operational_aside">
      <OperationalZone />
    </aside>
    <!-- <cForm :rule="rule"></cForm> -->
  </div>
</template>
<script>
import componentsMenu from "@/components/componentsMenu.jsx";
import operationalZone from "@/components/operationalZone.jsx";
// import cForm from "./form/cForm.jsx";
export default {
  name: "App",
  components: {
    OperationalZone: operationalZone,
    ComponentsMenu: componentsMenu,
  },
  data() {
    return {
      ComponentsModelValue: "",
    };
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
    border: 1px solid red;
  }
  .main {
    width: 60%;
    height: calc(100% - 40px);
    @include flex-row-s-c;
    border: 1px solid red;
  }
  .operational_aside {
    width: 20%;
    height: calc(100% - 40px);
    @include flex-row-s-c;
    border: 1px solid red;
  }
  // padding: 5%;
}
</style>
