/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-11-23 10:15:04
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-02-15 15:11:30
 */

/**
 * @description: tree数组扁平化
 * @param {any} tree
 * @return {*}
 */
export const treeToArray = (tree: any) => {
	return tree.reduce((res: any, item: any) => {
		const { children, ...i } = item
		return res.concat(i, children && children.length ? treeToArray(children) : [])
	}, [])
}

/**
 * @description: 生成uuid
 * @return `string`
 */
export const createUuId = (): string => {
	const temp_url = URL.createObjectURL(new Blob())
	const uuid = temp_url.toString()
	URL.revokeObjectURL(temp_url)
	return uuid.substring(uuid.lastIndexOf('/') + 1)
}

/**
 * @description: 生成随机16进制颜色
 * @return `string`
 */
export const createRandomHexColor = (): string => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

/**
 * @description: 数组随机重新排序
 * @param `Array` arr
 * @return {*}
 */
export const shuffleArr = (arr: []): [] => arr.sort(() => Math.random() - 0.5)

/**
 * @description: 从 URL 中获取参数
 * @param `string` key
 * @return `string`
 */
export const getParamByUrl = (key: string): string => {
	const url = new URL(location.href)
	return url.searchParams.get(key) || ''
}
