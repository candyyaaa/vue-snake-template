/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:16:10
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 18:01:44
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './vue-components'
import createIcons from './icons'
import createProgress from './progress'
import createSvgIcons from './svg-icon'
import createCompression from './compression'
import createPages from './pages'
import createImagemin from './imagemin'

export default function createVitePlugins(viteEnv: Record<string, string>, isBuild: boolean = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({
      reactivityTransform: true
    })
  ]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createIcons())
  vitePlugins.push(createProgress())
  vitePlugins.push(createSvgIcons(isBuild))
  isBuild && vitePlugins.push(createCompression(viteEnv))
  vitePlugins.push(createPages())
  vitePlugins.push(createImagemin())

  return vitePlugins
}
