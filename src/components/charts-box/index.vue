<!--
 * @Description: <封装echarts box>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-02-04 00:22:36
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-05 02:20:03
-->
<template>
  <div
    ref="chartsEl"
    :id="`Charts${props.uuId}`"
    class="charts-wrap"
    v-resize="handelResize"
  ></div>
</template>

<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import { createUuId } from '@/utils'

interface Props {
  uuId?: string | number
  options: echarts.EChartsCoreOption
  refreshOnResize?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * @description: 唯一id
   * @默认值 uuid
   */
  uuId: () => createUuId(),
  /**
   * @description: echarts配置
   * @默认值 {}
   */
  options: () => {
    return {}
  },
  /**
   * @description: resize时更新echarts元素大小
   * @默认值 true
   */
  refreshOnResize: true
})

const emit = defineEmits(['loaded', 'handleClickECharts'])

const chartsEl = ref<HTMLElement | null>(null)
let myCharts: echarts.ECharts
let resizeTimer: ReturnType<typeof setTimeout> = 0

onMounted(async () => {
  await nextTick()
  init()
})

onUnmounted(() => {
  handleDestroy()
})

const init = () => {
  if (!chartsEl.value) {
    return
  }

  if (!myCharts) {
    myCharts = echarts.init(chartsEl.value as HTMLElement)
    myCharts.off('click')
    emit('loaded', myCharts)
    myCharts.on('click', handleClick)
  }

  myCharts.clear()
  myCharts.setOption(props.options, true)
}

const handleClick = (params: any) => {
  emit('handleClickECharts', params)
}

const handelResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    myCharts.resize()
  }, 300)
}

const handleDestroy = () => {
  myCharts.off('click')
  myCharts.clear()
  myCharts.dispose()
}

watch(
  () => props.options,
  () => {
    init()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.charts-wrap {
  width: 100%;
  height: 100%;
}
</style>
