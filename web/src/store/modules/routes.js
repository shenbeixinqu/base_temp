import { asyncRoutes, constantRoutes, resetRouter } from "@/router";
import { filterRoutes } from "@/utils/routes";
import { rolesControl } from "@/config";

const state = () => ({
  routes: [],
});

const getters = {
  routes: (state) => state.routes,
};

const mutations = {
  setRoutes(state, routes) {
    state.routes = routes;
  },
};

const actions = {
  async setRoutes({ commit }, mode = "none") {
    let routes = [...asyncRoutes];
    // 设置游客路由关闭路由拦截
    const control = mode === "visit" ? false : rolesControl;
    // 根据权限和rolesControl过滤路由
    const accessRoutes = filterRoutes([...constantRoutes, ...routes], control);
    // 设置菜单所需路由
    commit("setRoutes", JSON.parse(JSON.stringify(accessRoutes)));
    // 根据可访问路由重置Vue Router
    await resetRouter(accessRoutes);
  },
};

export default { state, getters, mutations, actions };
