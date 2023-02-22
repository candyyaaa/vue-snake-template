/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 16:34:38
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 16:36:19
 */
import icons from 'unplugin-icons/vite'

export default function createIcons() {
	return icons({
		compiler: 'vue3',
		defaultClass: 'iconify-icon',
		autoInstall: true
	})
}
