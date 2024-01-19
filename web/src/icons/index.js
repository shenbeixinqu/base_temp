import Vue from "vue";
import SvgIcon from "@/uni/components/UniSvgIcon"; // svg component
// register globally
Vue.component("svg-icon", SvgIcon);
console.log("12345678");
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
