<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-12-18 23:58:14
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-12-19 01:11:51
-->
<template>
  <transition name="header">
    <header class="layout-header-wrap">
      <div class="header-container">
        <Logo />
      </div>
    </header>
  </transition>
</template>

<script setup lang="ts">
import Logo from '../logo/index.vue'
</script>

<style lang="scss" scoped>
.layout-header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: var(--g-header-height);
  padding: 0 20px;
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  transition: background-color 0.3s, var(--el-transition-color);

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: var(--g-header-width);
    height: 100%;
    margin: 0 auto;

    .main {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      height: 100%;
    }
  }

  // 头部动画
  .header-enter-active,
  .header-leave-active {
    transition: transform 0.3s;
  }
}
</style>
