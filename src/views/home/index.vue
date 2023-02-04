<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:14:12
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-05 02:25:08
-->
<template>
  <div class="home-wrap" v-loading="loading">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
    <UsePinia />
    <h1 class="ha">哈哈哈哈哈哈</h1>
    <div>{{ dayjs().format('YYYY-MM-DD') }}</div>
    <div class="area-chart">
      <ChartsBox :options="option" />
    </div>
    <div class="container-box">
      <Container>
        <template v-slot:header>header</template>
        <RollNumber :value="20000" :decimals="2" />
        <template v-slot:footer>footer</template>
      </Container>
    </div>
    <el-button type="primary" @click="handleLogin">登录</el-button>
    <el-button type="primary" @click="handleUserInfo">获取用户信息</el-button>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
// import HelloWorld from "@/components/HelloWorld.vue"
import UsePinia from '@/components/use-pinia.vue'
import { login, getUserInfo } from '@/api/user'
import * as echarts from 'echarts'

const loading = ref<boolean>(false)

const handleLogin = () => {
  loading.value = true

  const query = {
    account: 'candy',
    password: '123456q!'
  }

  login(query)
    .then((res) => {
      console.log('login then----------->', res)
    })
    .catch((err) => {
      console.log('login catch----------->', err)
    })
    .finally(() => {
      loading.value = false
    })
}

const handleUserInfo = () => {
  getUserInfo()
    .then((res) => {
      console.log('getUserInfo then----------->', res)
    })
    .catch((err) => {
      console.log('getUserInfo catch----------->', err)
    })
}

const option = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'Gradient Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [140, 232, 101, 264, 90, 340, 250]
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 282, 111, 234, 220, 340, 310]
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 132, 201, 334, 190, 130, 220]
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 302, 181, 234, 210, 290, 150]
    }
  ]
}
</script>

<style scoped lang="scss">
.home-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;

  .logo {
    height: $header-height;
    padding: 1.5em;
    will-change: filter;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }

  .ha {
    @apply tw-w-full tw-text-pink-500;
  }

  .area-chart {
    width: 40%;
    height: 20%;
  }

  .container-box {
    width: 100%;
    height: 500px;
  }
}
</style>
