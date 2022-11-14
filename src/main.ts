/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-11-08 01:44:32
 */
import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)

// 挂载pinia
app.use(store)
// 挂载router
app.use(router)
app.mount('#app')
