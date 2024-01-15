/**
 * @description tabsBar标签页逻辑
 */

const state = () => ({
  visitedRoutes: [],
});
const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
};
const mutations = {
  addVisitedRoute(state, route) {
    const target = state.visitedRoutes.find((item) => item.path === route.path);
    if (target && !route.meta.dynamicNewTab) Object.assign(target, route);
    else if (!target) state.visitedRoutes.push(Object.assign({}, route));

    //应对极特殊情况：没有配置noClosable的情况，默认使当前tab不可关闭
    if (!state.visitedRoutes.find((route) => route.meta.noClosable))
      state.visitedRoutes[0].meta.noClosable = true;
  },
  delVisitedRoute(state, path) {
    state.visitedRoutes.splice(
      state.visitedRoutes.findIndex((route) => route.path === path),
      1
    );
  },
  delOthersVisitedRoutes(state, path) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (route) => route.meta.noClosable || route.path === path
    );
  },
  delLeftVisitedRoutes(state, path) {
    let found = false;
    state.visitedRoutes = state.visitedRoutes.filter((route) => {
      if (route.path === path) found = true;
      return route.meta.noClosable || found;
    });
  },
  delRightVisitedRoutes(state, path) {
    let found = false;
    state.visitedRoutes = state.visitedRoutes.filter((route) => {
      const close = found;
      if (route.path === path) found = true;
      return route.meta.noClosable || !close;
    });
  },
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (route) => route.meta.noClosable
    );
  },
  changeTabsMeta(state, options) {
    function handleVisitedRoutes(visitedRoutes) {
      return visitedRoutes.map((route) => {
        if (route.name === options.name || route.meta.title === options.title)
          Object.assign(route.meta, options.meta);
        if (route.children && route.children.length)
          route.children = handleVisitedRoutes(route.children);
        return route;
      });
    }

    state.visitedRoutes = handleVisitedRoutes(state.visitedRoutes);
  },
};
const actions = {
  // 添加标签页
  addVisitedRoute({ commit }, route) {
    commit("addVisitedRoute", route);
  },
  // 删除标签页
  delVisitedRoute({ commit }, path) {
    commit("delVisitedRoute", path);
  },
  // 删除当前标签页以外其它全部标签页
  delOthersVisitedRoutes({ commit }, path) {
    commit("delOthersVisitedRoutes", path);
  },
  // 删除当前标签页左边全部标签页
  delLeftVisitedRoutes({ commit }, path) {
    commit("delLeftVisitedRoutes", path);
  },
  // 删除当前标签页右边全部标签页
  delRightVisitedRoutes({ commit }, path) {
    commit("delRightVisitedRoutes", path);
  },
  // 删除全部标签页
  delAllVisitedRoutes({ commit }) {
    commit("delAllVisitedRoutes");
  },
  // 修改route meta
  changeTabsMeta({ commit }, options = {}) {
    commit("changeTabsMeta", options);
  },
};

export default { state, getters, mutations, actions };
