<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span>{{ username }}</span>
        <span
          class="iconfont icon-xia"
          style="font-size: 12px; margin-left: 4px"
        ></span>
      </div>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">
        <span class="iconfont icon-tuichu"></span>
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toLoginRoute } from "@/utils/routes";

export default {
  name: "UniAvatar",
  computed: {
    ...mapGetters({
      avatar: "user/avatar",
      username: "user/username",
    }),
  },
  methods: {
    ...mapActions({
      _logout: "user/logout",
    }),
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
      }
    },
    async logout() {
      await this._logout();
      console.log("9999");
      console.log(toLoginRoute(this.$route.path));
      await this.$router.push(toLoginRoute(this.$route.path));
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    width: 40px;
    height: 40px;
    margin-left: 15px;
    cursor: pointer;
  }
  .user-name {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    height: 40px;
    margin-left: 6px;
    line-height: 40px;
    cursor: pointer;
  }
}
</style>
