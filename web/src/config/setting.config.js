module.exports = {
  // 路由模式
  routerMode: "hash",
  // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true,
  // 布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  // 布局时默认展开的菜单
  defaultOpeneds: [],
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
}