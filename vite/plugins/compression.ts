/*
 * @Description: <开启gzip压缩>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 17:38:22
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 17:41:31
 */
import compression from 'vite-plugin-compression'

export default function createCompression(env: Record<string, string>) {
	const { VITE_BUILD_COMPRESS } = env
	const compressList = VITE_BUILD_COMPRESS.split(',')
	const plugin: any[] = []
	if (compressList.includes('gzip')) {
		plugin.push(
			compression({
				ext: '.gz',
				deleteOriginFile: false
			})
		)
	}
	if (compressList.includes('brotli')) {
		plugin.push(
			compression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: false
			})
		)
	}
	return plugin
}
