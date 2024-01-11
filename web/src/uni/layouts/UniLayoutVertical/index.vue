<template>
  <div class="layout-vertical" :class="{ fixed: fixedHeader }">
    <uni-side-bar />
    <div class="uni-main" :class="{ 'is-collapse-main': collapse }">
      <div class="uni-layout-header" :class="{ 'fixed-header': fixedHeader }">
        <uni-nav />
        <uni-tabs v-show="showTabs" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UniLayoutVertical",
  props: {
    collapse: {
      type: Boolean,
      default() {
        return false;
      },
    },
    fixedHeader: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showTabs: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      handleFoldSideBar: "settings/foldSideBar"
    })
  }
}
</script>

<style lang="scss" scoped>
.uni-layout-vertical {
  .fixed-header {
    left: $base-left-menu-width;
    width: $base-right-content-width;
  }
}
</style>