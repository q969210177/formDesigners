<template>
  <div class="zBusinessTableView">
    <cBusinessTable
      size="middle"
      :rule="rule"
      :tableColumns="tableColumns"
      v-model="formApi"
      :getTableVoid="getTableData"
    ></cBusinessTable>
  </div>
</template>
<script>
import cBusinessTable from "@/components/cBusinessTable.vue";
export default {
  name: "zBusinessTableView",
  components: {
    cBusinessTable,
  },
  data() {
    return {
      rule: [],
      tableColumns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex",
        },
        {
          title: "地址",
          dataIndex: "add",
          key: "add",
        },
      ],
      formApi: {},
    };
  },
  methods: {
    getTableData(params) {
      let arr = [];
      for (let index = 0; index < 100; index++) {
        arr.push({
          index,
          name: `姓名${index}`,
          sex: `性别${index}`,
          add: `地址${index}`,
        });
      }
      return new Promise((res) => {
        res({
          list: arr,
          total: 100,
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.zBusinessTableView {
  width: 100%;
  height: 100%;
}
</style>