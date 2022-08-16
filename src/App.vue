<template>
  <div id="app">
    <router-view />
    <!--    "build": "vue-cli-service build",    
    "lib:formDesigners": "vue-cli-service build --target lib --inline-vue --name zformDesigners formDesigners.js",
    "lib:formCreate": "vue-cli-service build --target lib --inline-vue --name zformcreate formCreate.js",-->
    <!-- <ZFormCreate :rule="rule" v-model="api">
      <template slot="a" slot-scope="ruleItem">
        <a-button @click="test(ruleItem)">1111</a-button>
      </template>
    </ZFormCreate> -->
    <!---->
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
