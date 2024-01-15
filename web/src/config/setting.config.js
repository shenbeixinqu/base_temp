module.exports = {
  // 路由模式
  routerMode: "hash",
  // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
  rolesControl: true,
  // 缓存路由的最大数量
  keepAliveMaxNum: 20,
  // 布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  // 布局时默认展开的菜单
  defaultOpeneds: [],
  // token的存储key名称
  tokenTableName: "pro-token",
  // token的存储位置
  storage: "localStorage",
  // 需要加loading层的请求，防止重复提交
  debounce: ["doEdit"],
};
