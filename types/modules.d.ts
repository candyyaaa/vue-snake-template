/*
 * @Description: <declare module>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:32:48
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-12-19 00:51:25
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '*.png'
