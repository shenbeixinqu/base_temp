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
import { mapActions, mapGetters } from "vuex";

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
};
</script>

<style>
</style>