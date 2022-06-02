<template>
  <div id="app">
    <zformDesigners>
      <template v-slot:header>
        <a-button>头部插槽按钮</a-button>
      </template>
    </zformDesigners>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
