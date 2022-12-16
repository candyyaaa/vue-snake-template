/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:09:36
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-11-08 01:09:40
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  // id必填，且需要唯一
  id: 'user',
  state: () => {
    return {
      name: '张三'
    }
  },
  actions: {
    updateName(name: string) {
      this.name = name
    }
  }
})
