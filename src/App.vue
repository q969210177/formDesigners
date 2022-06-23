<template>
  <div id="app">
    <!--    "build": "vue-cli-service build",    
    "lib:formDesigners": "vue-cli-service build --target lib --inline-vue --name zformDesigners formDesigners.js",
    "lib:formCreate": "vue-cli-service build --target lib --inline-vue --name zformcreate formCreate.js",-->
    <!-- <ZFormCreate :rule="rule" v-model="api"></ZFormCreate> thisisunsafe-->
    <zformDesigners></zformDesigners>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      api: {},
      rule: [{
        type: "input",
        fileId: "a",
        label: "测试",
        on: {
          blur: ($event) => {
            console.log($event);
          },
          change: ($event) => {
            console.log($event);
          },
        }
      }]
    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
