// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// 配置路由
const routes = [
  {
    path: '/',
    redirect: 'iframe'
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
