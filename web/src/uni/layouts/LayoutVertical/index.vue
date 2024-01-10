<template>
  <div class="layout-vertical" :class="{ fixed: fixedHeader }">
    <uni-side-bar />
    <div v-if="!collapse" @click="handleFoldSideBar"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LayoutVertical",
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

<style>

</style>