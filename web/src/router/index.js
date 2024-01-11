import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/uni/layouts"
import { routerMode } from "@/config";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/403"),
    meta: {
      hidden: true,
    },
  },
]

export const asyncRoutes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: Layout,
    meta: {
      title: "房屋管理"
    },
    children: [
      {
        path: "thing",
        name: "Thing",
        component: () => import("@/views/admin/thing.vue"),
        meta: {
          title: "房屋管理"
        }
      }
    ]
  }
]

const router = createRouter();

function fatteningRoutes(routes) {
  return routes.flatMap((route) => {
    return route.children ? fatteningRoutes(route.children) : route;
  });
}

export function resetRouter(routes = constantRoutes) {
  routes.map((route) => {
    if (route.children) {
      route.children = fatteningRoutes(route.children);
    }
  });
  router.matcher = createRouter(routes).matcher;
}

function createRouter(routes = asyncRoutes) {
  return new VueRouter({
    base: process.env.BASE_URL,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: routes,
  })
}

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

export default router;
