<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="房屋名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="房屋简介">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="租赁方式">
            <el-select v-model="form.way" style="width: 100%">
              <el-option label="月租" value="1" />
              <el-option label="年租" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="月租价格" prop="price">
            <el-input-number
              v-model="form.price"
              :min="0"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="押金" prop="deposit">
            <el-input-number
              v-model="form.deposit"
              :min="0"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小区">
            <el-input v-model="form.community" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="朝向">
            <el-select v-model="form.towards" style="width: 100%">
              <el-option label="东西" value="1" />
              <el-option label="南北" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼层">
            <el-input-number
              v-model="form.floor"
              :min="0"
              controls-position="right"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面积">
            <el-input v-model="form.area" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="form.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" style="width: 100%">
              <el-option label="上架" value="0" />
              <el-option label="下架" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { getEdit } from "@/api/thing";

export default {
  name: "Edit",
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "房屋名称不能为空",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "月租价格不能为空",
            trigger: "blur",
          },
        ],
        deposit: [
          {
            required: true,
            message: "押金不能为空",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    showEdit(row) {
      console.log("row", row);
      if (!row) {
        this.title = "添加";
      } else {
        this.title = "编辑";
        this.form = Object.assign({}, row);
      }
      this.dialogFormVisible = true;
    },
    // 关闭
    close() {
      this.$refs.form.resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    // 提交
    handleSubmit() {
      console.log(this.form);
      getEdit(this.form).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>

<style></style>
