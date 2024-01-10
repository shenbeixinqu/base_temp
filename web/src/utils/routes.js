/**
 * 根据route 获取激活菜单
 * @param route 当前路由
 * @param isTabBar 是否是标签
 * @return string
 */

export function handleActivePath(route, isTabsBar = false) {
  // console.log("utils", route)
  const { meta, path, fullPath } = route;
  const rawPath = route.matched
    ? route.matched[route.matched.length - 1].path
    :path
  if (isTabsBar) return meta.dynamicNewTab ? fullPath : rawPath;
  if (meta.activeMenu) return meta.activeMenu;
  return fullPath ? fullPath : rawPath;
}