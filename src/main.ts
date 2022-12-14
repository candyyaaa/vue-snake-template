/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-12-15 00:40:20
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 挂载pinia
app.use(store)
// 挂载router
app.use(router)
// 挂载ElementPlus
app.use(ElementPlus)
app.mount('#app')
