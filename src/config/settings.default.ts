/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-01-30 22:48:54
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-30 23:11:28
 */
// * 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global'

export const appSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    elementSize: 'default',
    iconifyOfflineUse: false,
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: false,
    routeBaseOn: 'frontend'
  },
  home: {
    enable: true,
    title: '主页'
  },
  layout: {
    enableMobileAdaptation: false
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'side',
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false
  },
  topBar: {
    mode: 'static'
  },
  toolbar: {
    enableFullscreen: false,
    enablePageReload: false,
    enableColorScheme: false,
    enableAppSetting: false
  },
  breadcrumb: {
    enable: true
  },
  navSearch: {
    enable: true,
    enableHotkeys: true
  },
  copyright: {
    enable: true,
    dates: '2022-2023',
    company: 'Snake 蛇友同盟',
    website: 'https://http.ooo/',
    websiteRecordNumber: ''
  }
}
