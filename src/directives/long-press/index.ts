/*
 * @Description: <长按指令>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-02-05 22:56:17
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-05 23:09:45
 */
import type { App, Directive, DirectiveBinding } from 'vue'

// 定义变量
let pressTimer: ReturnType<typeof setTimeout> = 0

const inserted = (el: HTMLElement, binding: DirectiveBinding) => {
	if (typeof binding.value !== 'function') {
		throw 'callback must be a function'
	}

	// 创建计时器（ 2秒后执行函数 ）
	const start = (e: any) => {
		if (e.button) {
			if (e.type === 'click' && e.button !== 0) {
				return
			}
		}
		if (!pressTimer) {
			pressTimer = setTimeout(() => {
				handler(e)
			}, 1000)
		}
	}

	// 取消计时器
	const cancel = () => {
		if (!pressTimer) {
			clearTimeout(pressTimer)
			pressTimer = 0
		}
	}

	// 运行函数
	const handler = (e: MouseEvent | TouchEvent) => {
		binding.value(e)
	}

	// 添加事件监听器
	el.addEventListener('mousedown', start)
	el.addEventListener('touchstart', start)
	// 取消计时器
	el.addEventListener('click', cancel)
	el.addEventListener('mouseout', cancel)
	el.addEventListener('touchend', cancel)
	el.addEventListener('touchcancel', cancel)
}

const unbind = () => {
	clearTimeout(pressTimer)
	pressTimer = 0
}

const longPress: Directive = {
	mounted: inserted,
	unmounted: unbind
}

export default {
	install(app: App) {
		app.directive('longPress', longPress)
	}
}
