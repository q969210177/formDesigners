<template>
  <div class="home">
    <div
      class="router_item ml-20"
      v-for="v in routerArr"
      :key="v.path"
      @click="handleRouterItemClick(v)"
    >
      <span :class="['iconfont', v.icon]">
        {{ v.text }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      routerArr: [
        { icon: "", text: "拖拽表单", path: "/zformDesignersView" },
        { icon: "", text: "动态表单", path: "/zFormCreateView" },
        // { icon: "", text: "", path: "" },
        // { icon: "", text: "", path: "" },
      ],
    };
  },
  methods: {
    handleRouterItemClick({ path }) {
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";
.home {
  width: 100%;
  height: 100%;
  @include flex-row-c-c;
  flex-wrap: wrap;
  .router_item {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background: rgb(56, 177, 225);
    color: #fff;
    @include flex-col-c-c;
    box-shadow: 1px 1px 15px 2px rgb(3, 81, 126);
  }
}
</style>