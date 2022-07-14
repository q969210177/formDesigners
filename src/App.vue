<template>
  <div id="app">
    <!--    "build": "vue-cli-service build",    
    "lib:formDesigners": "vue-cli-service build --target lib --inline-vue --name zformDesigners formDesigners.js",
    "lib:formCreate": "vue-cli-service build --target lib --inline-vue --name zformcreate formCreate.js",-->
    <!-- <ZFormCreate :rule="rule" v-model="api">
      <template slot="a" slot-scope="ruleItem">
        <a-button @click="test(ruleItem)">1111</a-button>
      </template>
    </ZFormCreate> -->
    <zformDesigners> </zformDesigners>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      api: {},
      rule: [
        {
          type: "input",
          fileId: "a",
          label: "测试",
        },
        {
          type: "input",
          fileId: "b",
          label: "测试",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    test(data) {
      console.log(this.api.getFormData());
      console.log(data, "test");
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
