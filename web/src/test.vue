<template>
  <div class="user-management-container">
    <pgt-query-form>
      <pgt-query-form-left-panel>
        <el-button size="small" type="primary" @click="handleEdit"
          >添加</el-button
        >
        <el-button size="small" type="danger" @click="handleDelete"
          >批量删除</el-button
        >
      </pgt-query-form-left-panel>
      <pgt-query-form-right-panel>
        <el-form :inline="true" :model="queryForm" @submit.native.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              size="small"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="queryData"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </pgt-query-form-right-panel>
    </pgt-query-form>
    <el-table
      :loading="listLoading"
      :data="list"
      border
      @selection-change="setSelectRows"
    >
      <el-table-column width="50px" align="center" type="selection" />
      <el-table-column label="序号" width="55px">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="id" label="id"></el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="email"
        label="邮箱"
      ></el-table-column>
      <el-table-column align="center" label="角色">
        <template #default="{ row }">
          <span v-for="(item, index) in row.roles" :key="index">
            <el-tag type="success" style="margin-left: 5px">{{ item }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="datatime"
        label="修改时间"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="120px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit" @fetch-data="fetchData"></edit>
    <el-pagination
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getList } from "@/api/userManagement";
import Edit from "./components/UserManagementEdit.vue";

export default {
  name: "UserManagement",
  components: {
    Edit,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      listLoading: false,
      total: 0,
      list: [],
      selectRows: "",
      layout: "total, sizes, prev, pager, next, jumper",
      queryForm: {
        pageSize: 10,
        pageNo: 1,
      },
    };
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val;
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    handleEdit(row) {
      if (row) {
        this.$refs.edit.showEdit(row);
      } else {
        this.$refs.edit.showEdit();
      }
    },
    handleDelete(row) {
      if (row.id) {
        this.$confirm("确定要删除当前项吗?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "模拟删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        if (this.selectRows.length > 0) {
          this.$confirm("确定要删除选中项吗", "温馨提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "模拟删除成功!",
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "未选中任何行",
          });
        }
      }
    },
    queryData() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const {
        data: { list, total },
      } = await getList(this.queryForm);
      this.list = list;
      this.total = total;
      this.listLoading = false;
    },
  },
};
</script>

<style></style>
