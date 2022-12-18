<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-12-19 00:46:27
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-12-19 01:12:15
-->
<template>
  <router-link :to="to">
    <img v-if="showLogo" class="logo-icon" :src="logo" />
    <span v-if="showTitle" class="logo-text">{{ title }}</span>
  </router-link>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'

defineProps({
  showLogo: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  }
})

const title = ref(import.meta.env.VITE_APP_TITLE)

const to = computed(() => {
  const rtn: { name?: string } = {}

  // if (settingsStore.settings.home.enable) {
  //   rtn.name = 'home'
  // }
  rtn.name = 'Home'
  return rtn
})
</script>

<style lang="scss" scoped>
.logo-icon {
  width: 30px;
  height: 30px;
  object-fit: contain;

  & + .logo-text {
    margin-left: 10px;
  }
}

.logo-text {
  display: block;
  font-weight: bold;
  color: #fff;

  @apply tw-truncate;
}
</style>
