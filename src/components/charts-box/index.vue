<!--
 * @Description: <封装echarts box>
 * @Author: candy littlecandyi@163.com
 * @Date: 2023-02-04 00:22:36
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-04 22:19:55
-->
<template>
  <div class="charts-wrap"><h1>charts</h1></div>
</template>

<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import { createUuId } from '@/utils'

interface Props {
  uuId: string | number
  options: any
}
</script>

<style lang="scss" scoped>
.charts-wrap {
  width: 100%;
  height: 100%;
}
</style>
