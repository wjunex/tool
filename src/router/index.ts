// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string; // 定义 title 类型
  }
}

// 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/view/index/index.vue"),
    meta: {
      title: "首页", // 页面标题
    },
  },
  {
    path: "/iframe",
    name: "Iframe",
    component: () => import("@/view/iframe/iframe.vue"),
    meta: {
      title: "iframe",
    },
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/view/test/test.vue"),
    meta: {
      title: "测试",
    },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta?.title || "";
  }
  next(); 
});

export default router;
