<template>
  <span
    :class="
      collapse ? 'iconfont icon-zhedie-zhankai' : 'iconfont icon-zhedie-shouqi'
    "
    @click="toggleCollapse"
  ></span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UniFold",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
    }),
  },
  methods: {
    ...mapActions({
      toggleCollapse: "settings/toggleCollapse",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
