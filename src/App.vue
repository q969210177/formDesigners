<template>
  <div id="app">
    <cForm :rule="rule"></cForm>
  </div>
</template>
<script>
import cForm from "./form/cForm.jsx";
export default {
  name: "App",
  components: {
    cForm: cForm,
  },
  data() {
    return {
      啊: {
        type: "",
        span: "",
        attrCode: "",
      },
      rule: [
        {
          value: "",
          type: "input",
          paramsId: "a",
          label: "测试1",
          layout: {
            span: 24,
          },
          rules: [],
        },
        {
          value: "",
          type: "select",
          paramsId: "b",
          label: "测试1",

          layout: {
            span: 24,
          },
          rules: [],
        },
        {
          type: "input",
          span: 4,
          label: "测试1",

          paramsId: "c",
          value: "",
          props: {
            placeholder: "请输入1111",
            maxLength: 16,
            size: "small",
          },
          rules: [
            {
              required: true,
              message: "你没有填写",
              trigger: "blur",
            },
            {
              min: 3,
              max: 5,
              message: "Length should be 3 to 5",
              trigger: "blur",
            },
          ],
        },
        {
          type: "datePicker",
          paramsId: "d",
          value: "",
          label: "测试1",

          rules: [],
          layout: {
            span: 4,
          },
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  padding: 5%;
}
</style>
