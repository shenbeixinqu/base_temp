<template>
  <!-- 纵向布局 -->
  <div
    class="pgt-layout-vertical"
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabs,
    }"
  >
    <pgt-side-bar />
    <div
      v-if="device === 'mobile' && !collapse"
      class="v-modal"
      @click="handleFoldSideBar"
    />
    <div
      class="pgt-main"
      :class="{
        'is-collapse-main': collapse,
      }"
    >
      <div
        class="pgt-layout-header"
        :class="{
          'fixed-header': fixedHeader,
        }"
      >
        <pgt-nav />
        <pgt-tabs v-show="showTabs" />
      </div>
      <pgt-app-main />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PgtLayoutVertical",
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
        return true;
      },
    },
    device: {
      type: String,
      default() {
        return "desktop";
      },
    },
  },
  beforeMount() {},
  methods: {
    ...mapActions({
      handleFoldSideBar: "settings/foldSideBar",
    }),
  },
};
</script>

<style lang="scss" scoped>
.pgt-layout-vertical {
  .fixed-header {
    left: $base-left-menu-width;
    width: $base-right-content-width;
  }
}
</style>
