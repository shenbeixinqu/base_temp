<template>
  <el-scrollbar class="uni-side-bar" :class="{ 'is-collapse': collapse }">
    <el-menu
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      menu-trigger="click"
      mode="vertical"
      :unique-opened="uniqueOpened"
    >
      <template v-for="(item, index) in handleRoutes">
        <span :key="index">{{ item }}</span>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import { defaultOpeneds, uniqueOpened } from "@/config";
import { handleActivePath } from "@/utils/routes";

export default {
  name: "UniSideBar",
  props: {
    layout: {
      type: String,
      default: "vertical",
    },
  },
  data() {
    return {
      activeMenu: "",
      defaultOpeneds,
      uniqueOpened,
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      routes: "routes/routes",
    }),
    handleRoutes() {
      return this.routes.flatMap((route) => {
        console.log("route", route);
        route.meta && route.meta.levelHidden === true && route.children
          ? route.children
          : route;
      });
    },
  },
  watch: {
    $route: {
      handler(route) {
        this.activeMenu = handleActivePath(route);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>