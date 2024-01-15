<template>
  <div v-if="itemOrMenu.meta && itemOrMenu.meta.levelHidden">
    <template v-for="route in itemOrMenu.children">
      <uni-menu :key="route.path" :item="route" />
    </template>
  </div>
  <el-submenu
    v-else
    ref="subMenu"
    :index="itemOrMenu.path"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <span :title="itemOrMenu.meta.title">
        {{ itemOrMenu.meta.title }}
      </span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
export default {
  name: "UniSubmenu",
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
