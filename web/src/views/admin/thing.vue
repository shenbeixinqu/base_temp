<template>
  <div class="thing-container">
    <el-table :border="border" :data="list"> </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/thing";
export default {
  name: "Thing",
  created() {
    this.fetchData();
  },
  data() {
    return {
      border: true,
      list: [],
      total: 0,
    };
  },
  methods: {
    async fetchData() {
      const {
        data: { total, list },
      } = await getList();
      this.total = total;
      this.list = list;
    },
  },
};
</script>

<style></style>
