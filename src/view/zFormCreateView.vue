<template>
  <div class="zFormCreate">
    <div class="operat_box pr-20">
      <a-button @click="$router.push('/')" type="link">返回主页</a-button>
    </div>
    <div class="form_box">
      <ZFormCreate v-model="api" :rule="rule"></ZFormCreate>
    </div>
    <div class="footer_box">
      <a-button @click="handleLookFormData" type="primary">查看数据</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "zFormCreate",
  data() {
    return {
      api: {},
      rule: [
        {
          type: "input",
          label: "姓名",
          value: "",
          fileId: "userName",
          rules: [
            {
              required: true,
              message: "请输入姓名",
              trigger: "blur",
            },
          ],
        },
        {
          type: "select",
          label: "性别",
          value: "1",
          fileId: "sex",
          options: [
            { label: "男", value: "1" },
            { label: "女", value: "2" },
          ],
        },
        {
          type: "multipleselect",
          label: "兴趣,爱好",
          value: [],
          fileId: "savor",
          options: [
            { label: "唱", value: "1" },
            { label: "跳", value: "2" },
            { label: "rap", value: "3" },
            { label: "蓝球", value: "4" },
          ],
        },
        {
          type: "radio",
          label: "职业",
          value: "",
          fileId: "work",
          options: [
            { label: "前端", value: "1" },
            { label: "ios", value: "2" },
            { label: "安卓", value: "3" },
            { label: "嵌入式", value: "4" },
          ],
          span: 12,
        },
        {
          type: "checkbox",
          label: "技术栈",
          value: [],
          fileId: "work",
          options: [
            { label: "Vue", value: "1" },
            { label: "React", value: "2" },
            { label: "JavaScript", value: "3" },
            { label: "TypeScript", value: "4" },
          ],
          span: 12,
        },
        {
          type: "datapick",
          label: "生日",
          value: "",
          fileId: "birthday",
          span: 8,
          props: {
            placeholder: "请选择出生年月",
          },
        },
        {
          type: "datapick",
          label: "小学入学",
          value: "",
          fileId: "smallScholl",
          span: 8,
          props: {
            placeholder: "请选择上小学的时间",
          },
        },
        {
          type: "datapick",
          label: "中学入学",
          value: "",
          fileId: "medScholl",
          span: 8,
          props: {
            placeholder: "请选择上中学的时间",
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleLookFormData() {
      this.$message.info("请在控制台查看数据");
      const formData = this.api.getFormData();
      console.log(formData, "formData 其中隐藏了一个不在页面展示的属性");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/layout.scss";
.zFormCreate {
  width: 100%;
  height: 100%;
  @include flex-row-c-c;
  padding: 10px;
  flex-wrap: wrap;
  .operat_box {
    width: 70%;
    height: 40px;
    @include flex-row-e-c;
    border: 1px solid #f7f7f7;
    border-bottom: none;
  }

  .form_box {
    width: 70%;
    height: calc(100% - 80px);
    box-sizing: border-box;
    overflow-y: auto;
    border: 1px solid #f7f7f7;
    padding: 10px;
  }
  .footer_box {
    width: 70%;
    height: 40px;
    @include flex-row-c-c;
    border: 1px solid #f7f7f7;
    border-top: none;
  }
}
</style>