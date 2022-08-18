<template>
  <div class="zBusinessTableView"></div>
</template>
<script>
[1, 2, 3, 4, 5].forEach((v) => {
  const obj = {
    1: { params: 111 },
    2: { params: 2222 },
  };
  if (obj[v]) {
    console.log(obj[v]);
  }
});
export default {
  name: "zBusinessTableView",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.zBusinessTableView {
  width: 100%;
  height: 100%;
}
</style>