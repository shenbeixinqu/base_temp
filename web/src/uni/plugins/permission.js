import router from "@/router";
import store from "@/store";
import { toLoginRoute } from "@/utils/routes";
import { authentication, loginInterception, routesWhiteList } from "@/config";

router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters["user/token"];
  if (hasToken) {
    if (store.getters["routes/routes"].length) {
      // 禁止已经登录的用户返回登录页
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        next();
      }
    } else {
      if (loginInterception) {
        await store.dispatch("user/getUserInfo");
      }
      // 根据路由模式获取路由 并 根据权限过滤
      await store.dispatch("routes/setRoutes", authentication);
      next({ ...to, replace: true });
    }
  } else {
    if (routesWhiteList.includes(to.path)) {
      next();
    } else {
      next(toLoginRoute(to.path));
    }
  }
});
