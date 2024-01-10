import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/uni/layouts"
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Layout,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
