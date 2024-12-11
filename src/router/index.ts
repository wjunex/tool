// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/view/index/index.vue'),
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: () => import('@/view/iframe/iframe.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/view/test/test.vue'),
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
