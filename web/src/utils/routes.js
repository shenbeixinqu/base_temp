import { hasAccess } from "@/utils/hasAccess";
import { isExternal } from "@/utils/validate";
import { resolve } from "path";
import { recordRoute } from "@/config";

/**
 * @description 根据roles数组拦截路由
 * @param routes 路由
 * @param rolesControl 是否进行权限控制
 * @param baseUrl 基础路由
 * @returns {[]}
 */
export function filterRoutes(routes, rolesControl, baseUrl = "/") {
  return routes
    .filter((route) =>
      rolesControl && route.meta && route.meta.roles
        ? hasAccess(route.meta.roles)
        : true
    )
    .map((route) => {
      route = { ...route };
      route.path =
        route.path !== "*" && !isExternal(route.path)
          ? resolve(baseUrl, route.path)
          : route.path;
      if (route.children) {
        route.children = filterRoutes(route.children, rolesControl, route.path);
        route.childrenPathList = route.children.flatMap(
          (_) => _.childrenPathList
        );
        if (!route.redirect) route.redirect = route.children[0].path;
      } else route.childrenPathList = [route.path];
      return route;
    });
}

/**
 * 根据当前route获取激活菜单
 * @param route 当前路由
 * @param isTabBar 是否是标签
 * @returns string
 */

export function handleActivePath(route, isTabsBar = false) {
  const { meta, path, fullPath } = route;
  const rawPath = route.matched
    ? route.matched[route.matched.length - 1].path
    : path;
  if (isTabsBar) return meta.dynamicNewTab ? fullPath : rawPath;
  if (meta.activeMenu) return meta.activeMenu;
  return fullPath ? fullPath : rawPath;
}

/**
 * @description 获取当前跳转登录页的route
 * @param currentPath 当前页面地址
 */

export function toLoginRoute(currentPath) {
  if (recordRoute && currentPath !== "/") {
    return {
      path: "/login",
      query: { redirect: currentPath },
      replace: true,
    };
  } else {
    return { path: "/login", replace: true };
  }
}
