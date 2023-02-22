/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-01-07 01:06:28
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 17:19:07
 */
import { cloneDeep } from 'lodash-es'
import type { Menu } from '#/global'
import { login } from '@/api/user'

export const useMenuStore = defineStore('menu', {
	state: () => {
		const active = ref(0)

		const menus = ref<Menu.recordMainRaw[]>([
			{
				meta: {},
				children: []
			}
		])

		return {
			active
		}
	}
})
