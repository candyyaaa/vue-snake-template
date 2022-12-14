/*
 * @Description: <declare module>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:32:48
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 15:32:59
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
