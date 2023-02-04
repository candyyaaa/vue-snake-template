/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-02-05 00:14:08
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-05 01:34:58
 */
import type { App, Directive, DirectiveBinding } from 'vue'

interface Observer {
  init: boolean
  observer: ResizeObserver
}

interface ResizeElement extends HTMLElement {
  _observe?: Observer
}

const inserted = (el: ResizeElement, binding: DirectiveBinding) => {
  if (typeof window === 'undefined' || !('ResizeObserver' in window)) {
    return
  }

  const modifiers = binding.modifiers || {}
  const value = binding.value
  const { handler } = typeof value === 'object' ? value : { handler: value }

  const observer = new ResizeObserver((entries, observer) => {
    /* istanbul ignore if */
    if (!el._observe) {
      // Just in case, should never fire
      return
    }

    // If is not quiet or has already been
    // initted, invoke the user callback
    if (handler && !modifiers.quiet && el._observe.init) {
      const isIntersecting = Boolean(
        entries.find((entry: any) => entry.isIntersecting)
      )
      handler(entries, observer, isIntersecting)
    }

    // If has already been initted and
    // has the once modifier, unbind
    if (el._observe.init && modifiers.once) {
      unbind(el)
    }
    // Otherwise, mark the observer as initted
    else el._observe.init = true
  })

  el._observe = { init: false, observer }

  observer.observe(el)
}

const unbind = (el: ResizeElement) => {
  if (!el._observe) {
    return
  }

  el._observe.observer.disconnect()
  el._observe.observer.unobserve(el)
  delete el._observe
}

const resize: Directive = {
  mounted: inserted,
  unmounted: unbind
}

export default {
  install(app: App) {
    app.directive('resize', resize)
  }
}
