<template>
  <div class="cButton">
    <a-button v-bind="$attrs" v-on="$listeners">
      <slot>
        {{ text }}
      </slot>
    </a-button>
  </div>
</template>
<script>
export default {
  name: "cButton",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.cButton {
  width: 100%;
  height: 100%;
}
</style>
