<template>
  <el-col :span="24">
    <el-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <p class="page-header-tip-description" v-html="description"></p>
      </div>
    </el-card>
  </el-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      description: "最新更新",
    };
  },
  computed: {
    ...mapGetters({
      avatar: "user/avatar",
      username: "user/username",
    }),
  },
  methods: {
    handleTips() {
      const hour = new Date().getHours();
      return hour < 8
        ? `早上好 ${this.username}, 又是元气满满的一天。`
        : hour <= 11
        ? `上午好 ${this.username}, 看到你我好开心。`
        : hour <= 13
        ? `中午好 ${this.username}，忙碌了一上午，记得吃午饭哦。`
        : hour < 18
        ? `下午好 ${this.username}，你一定有些累了，喝杯咖啡提提神。`
        : `晚上好 ${this.username}，愿你天黑有灯，下雨有伞。`;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  min-height: 105px;
  transition: $base-transition;

  ::v-deep {
    * {
      transition: $base-transition;
    }

    .el-card__body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  &-avatar {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 50%;
  }

  &-tip {
    flex: auto;
    width: calc(100% - 200px);
    min-width: 200px;

    &-title {
      margin-bottom: 12px;
      font-size: 20px;
      font-weight: bold;
      color: #3c4a54;
    }

    &-description {
      font-size: $base-font-size-default;
      color: #808695;
    }
  }

  &-avatar-list {
    flex: 1;
    min-width: 100px;
    margin-left: 20px;
    text-align: right;

    p {
      margin-right: 9px;
      line-height: 0;
    }
  }
}
</style>
