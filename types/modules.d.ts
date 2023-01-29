/*
 * @Description: <declare module>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:32:48
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 14:14:19
 */
export {}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
