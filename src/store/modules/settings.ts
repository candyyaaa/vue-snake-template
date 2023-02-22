/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-01-07 18:38:07
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-30 23:38:46
 */
import { defaultsDeep } from 'lodash-es'
import { appSettings } from '@/config/settings'
import { appSettingsDefault } from '@/config/settings.default'
import type { RouteMeta } from 'vue-router'
import type { RecursiveRequired, Settings } from '#/global'

export const useMenuStore = defineStore('settings', {
	state: () => {
		const mergeSettings: RecursiveRequired<Settings.all> = defaultsDeep(appSettings, appSettingsDefault)
		const settings = ref(mergeSettings)

		// * 监听颜色方案
		watch(
			() => settings.value.app.colorScheme,
			nValue => {
				if (!nValue) {
					nValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
				}

				switch (nValue) {
					case 'dark':
						document.documentElement.classList.add('dark')
						break
					case 'light':
						document.documentElement.classList.remove('dark')
						break
				}
			},
			{
				immediate: true
			}
		)

		// * 监听导航栏模式
		watch(
			() => settings.value.menu.menuMode,
			nValue => {
				document.body.setAttribute('data-menu-mode', nValue)
			},
			{
				immediate: true
			}
		)

		// 页面标题
		const title = ref<RouteMeta['title']>()

		return {
			settings
		}
	}
})
