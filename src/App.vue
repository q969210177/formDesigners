<template>
  <div id="app">
    <!-- <ZFormCreate :rule="rule" v-model="api"></ZFormCreate> -->
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
