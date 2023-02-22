/*
 * @Description: <自动按需引入>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:16:17
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 17:02:21
 */
import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
	return autoImport({
		imports: ['vue', 'vue-router', 'pinia'],
		// eslint报错解决
		eslintrc: {
			// Default `false` 默认false, 需要生成,修改文件的时候改为 true, 没有文件, 自动按需引入 eslint 会报错
			enabled: false,
			// Default `./.eslintrc-auto-import.json`
			filepath: './.eslintrc-auto-import.json'
		},
		// 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
		dts: './types/auto-import.d.ts'
		//自动导入目录下的模块导出
		//默认情况下，它只扫描目录下的一层模块
		// dirs: [
		//   './src/utils/composables/**',
		// ]
	})
}
