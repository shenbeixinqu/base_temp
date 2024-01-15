<template>
  <div ref="custom-table" class="custom-table-container">
    <pgt-query-form>
      <pgt-query-form-left-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input
              v-model="queryForm.title"
              size="small"
              placeholder="标题"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              size="small"
              @click="handleQuery"
              >查询</el-button
            >
            <el-button
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="handleAdd"
              >添加</el-button
            >
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="small"
              @click="handleDelete"
              >删除</el-button
            >
          </el-form-item>
        </el-form>
      </pgt-query-form-left-panel>
      <pgt-query-form-right-panel>
        <div class="stripe-panel">
          <el-checkbox v-model="stripe">斑马纹</el-checkbox>
        </div>
        <div class="border-panel">
          <el-checkbox v-model="border">边框(可拉伸列)</el-checkbox>
        </div>
        <el-popover
          ref="popover"
          popper-class="custom-table-checkbox"
          width="200"
          trigger="hover"
        >
          <el-radio-group v-model="lineHeight">
            <el-radio label="medium">大</el-radio>
            <el-radio label="small">中</el-radio>
            <el-radio label="mini">小</el-radio>
          </el-radio-group>
          <el-button
            icon="el-icon-s-operation"
            style="margin: 0 10px 10px 0 !important"
            type="primary"
            size="small"
            slot="reference"
            >表格尺寸</el-button
          >
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <el-checkbox-group v-model="checkList">
            <pgt-draggable v-bind="dragOptions" :list="columns">
              <div v-for="(item, index) in columns" :key="item + index">
                <el-checkbox
                  :disabled="item.disableCheck === true"
                  :label="item.label"
                >
                  {{ item.label }}
                </el-checkbox>
              </div>
            </pgt-draggable>
          </el-checkbox-group>
          <el-button
            icon="el-icon-setting"
            style="margin: 0 10px 10px 0 !important"
            size="small"
            type="primary"
            slot="reference"
          >
            可拖拽列设置
          </el-button>
        </el-popover>
      </pgt-query-form-right-panel>
    </pgt-query-form>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :border="border"
      :size="lineHeight"
      :stripe="stripe"
      :data="list"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" width="55" type="selection" />
      <el-table-column align="center" label="序号" width="95">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        align="center"
        :width="item.width"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable"
      >
        <template #default="{ row }">
          <span v-if="item.label === '评级'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <span v-else>
            {{ row[item.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="100"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <table-edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import TableEdit from "./components/tableEdit";
import PgtDraggable from "vuedraggable";
export default {
  name: "CustomTable",
  created() {
    this.fetchData();
  },
  computed: {
    dragOptions() {
      return {
        animation: 600,
        group: "description",
      };
    },
    finallyColumns() {
      console.log(
        "123",
        this.columns.filter((item) => this.checkList.includes(item.label))
      );
      return this.columns.filter((item) => this.checkList.includes(item.label));
    },
    testColumn() {
      return this.columns;
    },
  },
  components: {
    TableEdit,
    PgtDraggable,
  },
  data() {
    return {
      listLoading: true,
      border: true,
      stripe: false,
      lineHeight: "medium",
      checkList: ["标题", "作者", "评级", "点击量", "时间"],
      columns: [
        {
          label: "标题",
          width: "auto",
          prop: "title",
          sortable: true,
          disableCheck: true,
        },
        {
          label: "作者",
          width: "auto",
          prop: "author",
          sortable: true,
        },
        {
          label: "评级",
          width: "auto",
          prop: "rate",
          sortable: true,
        },
        {
          label: "点击量",
          width: "auto",
          prop: "pageViews",
          sortable: true,
        },
        {
          label: "时间",
          width: "auto",
          prop: "datetime",
          sortable: true,
        },
      ],
      list: [],
      total: 0,
      selectRows: [],
      layout: "total, sizes, prev, pager, next, jumper",
      queryForm: {
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    setSelectRows(val) {
      this.setSelectRows = val;
    },
    handleAdd() {
      this.$refs["edit"].showEdit();
    },
    handleEdit(row) {
      this.$refs["edit"].showEdit(row);
    },
    handleDelete(row) {
      if (row.id) {
        this.$confirm("确定要删除当前项嘛?", "温馨提示", {
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
          this.$confirm("确定要删除选中项嘛?", "温馨提示", {
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
            msg: "未选中任何行",
          });
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.queryForm.pageNo = val;
      this.fetchData();
    },
    handleQuery() {
      this.queryForm.pageNo = 1;
      this.fetchData();
    },
    async fetchData() {
      this.listLoading = true;
      const {
        data: { total, list },
      } = await getList(this.queryForm);
      this.total = total;
      this.list = list;
      this.listLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.stripe-panel,
.border-panel {
  margin: 0 10px $base-margin/2 10px !important;
}
</style>
