/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-01-07 18:38:07
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-29 23:02:10
 */
import { defaultsDeep } from 'lodash-es'
import type { RouteMeta } from 'vue-router'

export const useMenuStore = defineStore('settings', {
  state: () => {
    const settings = 'settings'

    return {
      settings
    }
  }
})
