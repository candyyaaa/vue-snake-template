/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:12:48
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-11-08 01:33:07
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
