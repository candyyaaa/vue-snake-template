<!--
 * @Description: <数字滚动>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2023-02-02 15:50:58
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-02-03 10:52:23
-->
<script setup lang="ts">
import { request, cancel } from './bounce-config'

interface State {
  startVal: number
  endVal: number
  localStartVal: number
  displayValue: string | number
  printVal: number
  paused: boolean
  localDuration: number
  startTime: number
  timestamp: number
  remaining: number
  rAF: number
}

const props = defineProps({
  /**
   * @description: 展示值
   * @默认值 0
   */
  value: {
    type: [String, Number],
    default: 0
  },
  /**
   * @description: 速度(毫秒)
   * @默认值 2000
   */
  duration: {
    type: Number,
    default: 2000
  },
  /**
   * @description: 是否自动播放
   * @默认值 true
   */
  autoplay: {
    type: Boolean,
    default: true
  },
  /**
   * @description: 保留几位小数点
   * @默认值 0
   */
  decimals: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0
    }
  },
  /**
   * @description: 小数点形式
   * @默认值 .
   */
  decimal: {
    type: String,
    default: '.'
  },
  /**
   * @description: 千位分隔符
   * @默认值 ,
   */
  separator: {
    type: String,
    default: ','
  },
  /**
   * @description: 前缀
   * @默认值 ''
   */
  prefix: {
    type: String,
    default: ''
  },
  /**
   * @description: 后缀
   * @默认值 ''
   */
  suffix: {
    type: String,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'mountedCallback'): void
  (e: 'callback'): void
}>()

const state: State = reactive({
  startVal: 0,
  endVal: 0,
  localStartVal: 0,
  displayValue: 0,
  printVal: 0,
  paused: false,
  localDuration: props.duration,
  startTime: 0,
  timestamp: 0,
  remaining: 0,
  rAF: 0
})

const {
  startVal,
  endVal,
  localStartVal,
  displayValue,
  printVal,
  paused,
  localDuration,
  startTime,
  timestamp,
  remaining,
  rAF
} = toRefs(state)

const countDown = computed(() => startVal.value > endVal.value)

onMounted(() => {
  endVal.value = +props.value || 0
  if (props.autoplay) {
    start()
  }
  emit('mountedCallback')
})

onUnmounted(() => {
  cancel(rAF.value)
})

// 数字开始跳动
const start = () => {
  localStartVal.value = startVal.value
  startTime.value = 0
  localDuration.value = props.duration
  paused.value = false
  rAF.value = request(count)
}

/**
 * @description: 暂停或重新开始
 * @return {*}
 */
// const pauseResume = () => {
//   if (paused.value) {
//     resume()
//     paused.value = false
//     return
//   }

//   pause()
//   paused.value = true
// }

/**
 * @description: 暂停
 * @return {*}
 */
// const pause = () => {
//   cancel(rAF.value)
// }

/**
 * @description: 复位
 * @return {*}
 */
// const resume = () => {
//   startTime.value = 0
//   localDuration.value = +remaining.value
//   localStartVal.value = +printVal.value
//   request(count)
// }

// const reset = () => {
//   startTime.value = 0
//   cancel(rAF.value)
//   displayValue.value = formatNumber(startVal.value)
// }

const count = (countTimestamp: number) => {
  if (!startTime.value) {
    startTime.value = countTimestamp
  }
  timestamp.value = countTimestamp
  const progress = countTimestamp - startTime.value
  remaining.value = localDuration.value - progress

  if (countDown.value) {
    printVal.value =
      localStartVal.value -
      (localStartVal.value - endVal.value) * (progress / localDuration.value)
  } else {
    printVal.value =
      localStartVal.value +
      (endVal.value - localStartVal.value) * (progress / localDuration.value)
  }

  if (countDown.value) {
    printVal.value =
      printVal.value < endVal.value ? endVal.value : printVal.value
  } else {
    printVal.value =
      printVal.value > endVal.value ? endVal.value : printVal.value
  }

  displayValue.value = formatNumber(printVal.value)

  if (progress < localDuration.value) {
    rAF.value = request(count)
  } else {
    emit('callback')
  }
}

/**
 * @description: 格式化数字小数点,千位分隔符
 * @param {string | number} num
 * @return {*}
 */
const formatNumber = (num: string | number) => {
  // 格式化小数点后几位
  num =
    typeof num === 'number'
      ? `${num.toFixed(props.decimals)}`
      : `${(+num).toFixed(props.decimals)}`

  const x = num.split('.')
  // 正数
  let x1 = x[0]
  // 小数点 与 小数
  const x2 = x.length > 1 ? props.decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (props.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + props.separator + '$2')
    }
  }

  return props.prefix + x1 + x2 + props.suffix
}

// 监听props.value
watch(
  () => props.value,
  (nValue, oValue) => {
    if (nValue === '-') {
      displayValue.value = '-'
      return
    }
    startVal.value = (oValue && +oValue) || 0
    endVal.value = +nValue || 0
  },
  {
    immediate: true
  }
)

// 监听开始值
watch(
  () => startVal.value,
  () => {
    if (props.autoplay) {
      start()
    }
  },
  {
    immediate: true
  }
)

// 监听结束值
watch(
  () => endVal.value,
  () => {
    if (props.autoplay) {
      start()
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <span class="bounce-number">{{ displayValue }}</span>
</template>

<style lang="scss" scoped>
.bounce-number {
  width: 100%;
  height: 100%;
}
</style>
