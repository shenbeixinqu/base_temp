<template>
  <div class="thing-container">
    <uni-query-form>
      <uni-query-form-left-panel>
        <el-button size="small" type="primary" @click="handleEdit()"
          >添加</el-button
        >
        <el-button size="small" type="danger">批量删除</el-button>
      </uni-query-form-left-panel>
      <uni-query-form-right-panel :model="queryForm">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              v-model.trim="queryForm.k_word"
              size="small"
              clearable
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="queryData"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </uni-query-form-right-panel>
    </uni-query-form>
    <el-table :data="list">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="80">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="220px" />
      <el-table-column label="月租价格" prop="price" />
      <el-table-column
        label="地址"
        prop="address"
        show-overflow-tooltip=""
        width="160px"
      />
      <el-table-column label="租赁方式">
        <template #default="{ row }">
          <span v-if="row.way === 1">月租</span>
          <span v-else>年租</span>
        </template>
      </el-table-column>
      <el-table-column label="朝向">
        <template #default="{ row }">
          <span v-if="row.towards === 1">东西</span>
          <span v-else>南北</span>
        </template>
      </el-table-column>
      <el-table-column label="楼层" prop="floor" />
      <el-table-column label="面积" prop="area" />
      <el-table-column
        width="100"
        label="简介"
        prop="desc"
        show-overflow-tooltip=""
      />
      <el-table-column align="center" label="状态">
        <template #default="{ row }">
          <span v-if="row.status === 0">上架</span>
          <span v-else>下架</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit" @fetch-data="fetchData" />
    <el-pagination
      background
      :current-page="queryForm.pn"
      :page-size="queryForm.limit"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList } from "@/api/thing";
import Edit from "./components/Edit.vue";

export default {
  name: "Thing",
  components: {
    Edit,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      list: [],
      total: 0,
      layout: "total, sizes, prev, pager, next, jumper",
      queryForm: {
        pn: 1,
        limit: 10,
        k_word: "",
      },
    };
  },
  methods: {
    async fetchData() {
      const {
        data: { total, data },
      } = await getList();
      this.total = total;
      this.list = data;
    },
    queryData() {
      this.queryForm.pn = 1;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.queryForm.limit = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pn = val;
      this.fetchData();
    },
    // 添加,修改
    handleEdit(row) {
      if (row) {
        this.$refs.edit.showEdit(row);
      } else {
        this.$refs.edit.showEdit();
      }
    },
  },
};
</script>

<style></style>
