<template>
  <div>
    <component
      :is="'layout-' + theme.layout"
      :collapse="collapse"
      :fixed-header="theme.fixedHeader"
      :show-tabs="theme.showTabs"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"

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
      theme: "settings/theme"
    })
  },
  beforeMount() {
    this.oldLayout = this.theme.layout
  },
};
</script>

<style>
</style>