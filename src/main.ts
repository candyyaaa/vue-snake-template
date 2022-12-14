/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 16:53:56
 */
import { createApp } from 'vue'
import './styles/index.scss'
import 'virtual:svg-icons-register'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)

// 挂载pinia
app.use(store)
// 挂载router
app.use(router)
app.mount('#app')
