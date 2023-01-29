/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-01-07 01:22:36
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 17:18:54
 */
export {}

export declare namespace Menu {
  // * 原始
  interface recordRaw {
    path?: string
    meta?: {
      title?: string
      icon?: string
      defaultOpened?: boolean
      auth?: string | string[]
      sidebar?: boolean
      link?: string
    }
    children?: recordRaw[]
  }
  // * 主导航
  interface recordMainRaw {
    meta?: {
      title?: string
      icon?: string
      auth?: string | string[]
    }
    children: recordRaw[]
  }
}
