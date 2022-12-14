<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:14:12
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 16:32:18
-->
<template>
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
  <h1 @click="handleLogin">哈哈哈哈哈哈</h1>
  <div>{{ dayjs().format('YYYY-MM-DD') }}</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
// import HelloWorld from '@/components/HelloWorld.vue'
import UsePinia from '@/components/use-pinia.vue'
import { login } from '../../api/user'

const handleLogin = () => {
  const query = {
    account: 'candy',
    password: '123456q!'
  }

  login(query).then(res => {
    console.log('login then----------->', res)
  }).catch(err => {
    console.log('login catch----------->', err)
  }).finally(() => {

  })
}
</script>

<style scoped lang="scss">
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
</style>
