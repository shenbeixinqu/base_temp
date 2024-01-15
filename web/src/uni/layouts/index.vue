<template>
  <div class="vue-wrapper">
    <component
      :is="'uni-layout-' + theme.layout"
      :collapse="collapse"
      :fixed-header="theme.fixedHeader"
      :show-tabs="theme.showTabs"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Layouts",
  data() {
    return {
      oldLayout: "",
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
      theme: "settings/theme",
    }),
  },
  beforeMount() {
    this.oldLayout = this.theme.layout;
    this.handleLayouts();
  },
  methods: {
    ...mapActions({
      openSideBar: "settings/openSideBar",
      foldSideBar: "settings/foldSideBar",
      setRoutes: "routes/setRoutes",
    }),
    handleLayouts() {
      this.setRoutes();
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  [class*="uni-layout-"] {
    position: relative;

    ::v-deep {
      .uni-layout-header {
        box-shadow: $base-box-shadow;
      }
    }

    &.fixed {
      padding-top: $base-nav-height + $base-tabs-height;
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-height;
    }
  }

  ::v-deep {
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
    }

    .uni-main {
      position: relative;
      width: auto;
      min-height: 100%;
      margin-left: $base-left-menu-width;

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        .fixed-header {
          left: $base-left-menu-width-min;
          width: calc(100% - #{$base-left-menu-width-min});
        }
      }
    }
  }
}
</style>
