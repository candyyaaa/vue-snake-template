<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:14:12
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-11-22 18:05:12
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
  <h1>哈哈哈哈哈哈</h1>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import UsePinia from '@/components/use-pinia.vue'
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
