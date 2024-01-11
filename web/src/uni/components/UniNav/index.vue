<template>
  <div class="uni-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <uni-fold />
          <uni-breadcrumb />
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          56789
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UniNav",
  props: {
    layout: {
      type: String,
      default: "",
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.uni-nav {
  position: relative;
  height: $base-nav-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $base-nav-height;
  }
  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-height;
  }
}
</style>