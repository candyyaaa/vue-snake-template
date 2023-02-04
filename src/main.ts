/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-05 01:36:48
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'
import 'virtual:svg-icons-register'

// 自定义组件
import resize from '@/directives/resize'

const app = createApp(App)

// 挂载pinia
app.use(store)
// 挂载router
app.use(router)
// 挂载ElementPlus
app.use(ElementPlus)
// 挂载 自定义指令
app.use(resize)
app.mount('#app')
