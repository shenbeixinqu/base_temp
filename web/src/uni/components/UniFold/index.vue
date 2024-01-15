<template>
  <span @click="toggleCollapse">关闭</span>
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
