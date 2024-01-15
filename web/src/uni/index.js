import Vue from "vue";

// 加载全局样式
import "./styles/uni.scss";

// 加载插件
const Plugins = require.context("./plugins", false, /\.js$/);
Plugins.keys().map(Plugins);

//加载组件
const Components = require.context(".", true, /\.vue$/);
Components.keys()
  .map(Components)
  .forEach((item) => {
    if (item.default.name && item.default.name !== "Layouts") {
      Vue.component(item.default.name, item.default);
    }
  });
