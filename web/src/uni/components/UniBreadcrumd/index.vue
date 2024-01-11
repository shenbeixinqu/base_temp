<template>
  <el-breadcrumb class="uni-breadcrumb" separator=">">
    <template v-for="(item, index) in breadcrumbList">
      <el-breadcrumb-item :key="index" :to="{ path: item.redirect }">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UniBreadcrumb",
  computed: {
    ...mapGetters({
      routes: "routes/routes",
    }),
    breadcrumbList() {
      return this.getBreadcrumbList(this.routes);
    },
  },
  methods: {
    getBreadcrumbList(routes) {
      return routes
        .filter((route) => route.childrenPathList.indexOf(this.$route.path) + 1)
        .flatMap((route) =>
          route.children
            ? [route, ...this.getBreadcrumbList(route.children)]
            : [route]
        );
    }
  }
}
</script>

<style lang="scss" scoped>
  .uni-breadcrumb {
    height: $base-nav-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-height;
  }
</style>