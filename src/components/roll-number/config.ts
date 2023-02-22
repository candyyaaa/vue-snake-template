/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2023-02-02 15:52:34
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-03 23:51:30
 */

let lastTime = 0

const isServer = typeof window === 'undefined'

let request: any = null
let cancel: any = null

if (!isServer) {
	request = window.requestAnimationFrame
	cancel = window.cancelAnimationFrame

	// 浏览器不支持 requestAnimationFrame | cancelAnimationFrame
	// 使用定时器
	if (!request || !cancel) {
		request = (callback: FrameRequestCallback) => {
			const currentTime = new Date().getTime()
			// 为了使 setTimeout 的尽可能的接近每秒60帧的效果
			const timeToCall = Math.max(0, 16 - (currentTime - lastTime))

			const id = setTimeout(() => {
				callback(currentTime + timeToCall)
			}, timeToCall)

			lastTime = currentTime + timeToCall

			return id
		}

		cancel = (id: number) => {
			clearTimeout(id)
		}
	}
}

export { request, cancel }
