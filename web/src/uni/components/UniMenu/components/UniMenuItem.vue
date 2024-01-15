<template>
  <el-menu-item :index="itemOrMenu.path" @click="handleLink">
    <span :title="itemOrMenu.meta.title">
      {{ itemOrMenu.meta.title }}
    </span>
    <el-tag
      v-if="itemOrMenu.meta && itemOrMenu.meta.badge"
      effect="dark"
      type="danger"
    >
      {{ itemOrMenu.meta.badge }}
    </el-tag>
    <span
      v-if="itemOrMenu.meta && itemOrMenu.meta.dot"
      class="uni-dot uni-dot-error"
    >
      <span />
    </span>
  </el-menu-item>
</template>

<script>
import { routerMode } from "@/config";
import { isExternal } from "@/utils/validate";
import { mapActions } from "vuex";

export default {
  name: "UniMenuItem",
  props: {
    itemOrMenu: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  methods: {
    ...mapActions({
      foldSideBar: "settings/foldSideBar",
    }),
    handleLink() {
      const routePath = this.itemOrMenu.path;
      const target = this.itemOrMenu.meta.target;
      if (target === "_blank") {
        if (isExternal(routePath)) window.open(routePath);
        else if (this.$route.fullPath !== routePath)
          routerMode === "hash"
            ? window.open("/#" + routePath)
            : window.open(routePath);
      } else {
        if (isExternal(routePath)) window.location.href = routePath;
        else if (this.$route.fullPath !== routePath) {
          this.$router.push(this.itemOrMenu.path);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-tag {
    float: right;
    height: 16px;
    padding-right: 4px;
    padding-left: 4px;
    margin-top: ($base-menu-item-height - 16) / 2;
    line-height: 16px;
    border: 0;
  }
}

.uni-dot {
  float: right;
  margin-top: ($base-menu-item-height - 6) / 2 + 1;
}
</style>
