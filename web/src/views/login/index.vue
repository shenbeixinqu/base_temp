<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="14" :md="11" :sm="24" :xl="14" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <el-form ref="form" class="login-form" :model="form" :rules="rules">
          <div class="title">hello !</div>
          <div class="title-tips">欢迎使用管理后台</div>
          <el-form-item prop="username">
            <el-input
              v-model.trim="form.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="form.password"
              placehold="请输入密码"
            ></el-input>
          </el-form-item>
          <el-button
            class="login-btn"
            :loading="loading"
            type="primary"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form>
      </el-col>
      <el-col :lg="1" :md="1" :sm="24" :xl="1" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { isPassword } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if ("" === value) callback(new Error("用户名不能为空"));
      else callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) callback(new Error("密码不能少于6位"));
      else callback();
    };
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      redirect: undefined,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  mounted() {
    this.form.username = "admin";
    this.form.password = "123456";
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    handleRoute() {
      return this.redirect === "/404" || this.required === "/403"
        ? "/"
        : this.redirect;
    },
    handleLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true;
            await this.login(this.form);
            await this.$router.push(this.handleRoute());
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login_images/background.jpg") center center fixed
    no-repeat;
  background-size: cover;
}
.login-form {
  position: relative;
  max-width: 100%;
  padding: 4.5vh;
  margin: calc((100vh - 475px) / 2) 5vw 5vw;
  overflow: hidden;
  background: url("~@/assets/login_images/login_form.png");
  background-size: 100% 100%;

  .title {
    font-size: 54px;
    font-weight: 500;
    color: $base-color-white;
  }
  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: $base-color-white;
  }
  .login-btn {
    display: inherit;
    width: 200px;
    height: 50px;
    margin-top: 5px;
    border: 0;
    &:hover {
      opacity: 0.9;
    }
  }
  ::v-deep {
    .el-form-item {
      padding-right: 0;
      color: #454545;
      margin: 20px 0;
    }
  }
}
</style>
