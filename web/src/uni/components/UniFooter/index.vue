<template>
  <footer class="uni-footer">
    Copyright
    {{ title }} {{ fullYear }}
  </footer>
</template>

<script>
export default {
  name: "UniFooter",
  data() {
    return {
      title: "Admin Dashboard",
      fullYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
.uni-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 55px;
  padding: 0 $base-padding 0 $base-padding;
  color: rgba(0, 0, 0, 0.45);
  background: $base-color-white;
  border-top: 1px dashed $base-border-color;
}
</style>
