<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-12-18 23:58:14
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 14:40:35
-->
<template>
	<transition name="header">
		<header class="layout-header-wrap">
			<div class="header-container">
				<div class="main">
					<Logo />

					<!-- 导航栏顶部模式 -->
					<div ref="namRef" class="nav"></div>
				</div>
			</div>
		</header>
	</transition>
</template>

<script setup lang="ts">
import Logo from '../logo/index.vue'
import { useMenuStore } from '@/store/modules/menu'

const namRef = ref<HTMLDivElement | null>(null)
const menuStore = useMenuStore()
console.log('menuStore ----------->', menuStore.active)
</script>

<style lang="scss" scoped>
.layout-header-wrap {
	display: flex;
	position: fixed;
	align-items: center;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1000;
	height: var(--g-header-height, 70px);
	padding: 0 20px;
	color: var(--g-header-color, #fff);
	background-color: var(--g-header-bg, #222b45);
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
