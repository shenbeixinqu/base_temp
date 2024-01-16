module.exports = {
  // 路由模式
  routerMode: "hash",
  // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
  routesWhiteList: ["/login", "/register", "/callback", "/404", "/403"],
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
  // 是否开启登录拦截
  loginInterception: true,
  // intelligence(前端导出路由)和all(后端导出路由)两种方式
  authentication: "intelligence",
};
