/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:12:48
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 02:01:47
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 进度条插件
import { start, done } from '@/utils/nporgress'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Index',
  //   meta: {
  //     title: '首页',
  //     keepAlive: true,
  //     requireAuth: true
  //   },
  //   component: () => import('@/views/home/index.vue')
  // },
  {
    path: '/',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '首页',
          breadcrumb: false
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/snake/'),
  routes
})

// 路由切换之前触发
router.beforeEach((pre, next) => {
  start()
})

// 路由切换完成后触发
router.afterEach(() => {
  done()
})

export default router
