<!--
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-15 15:43:19
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-02-04 00:16:27
-->
<template>
	<div class="layouts-wrap">
		<div class="app-main" id="appMain">
			<Header />

			<div class="app-main-wrapper">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Header from './components/header/index.vue'
</script>

<style lang="scss" scoped>
.layouts-wrap {
	height: 100%;

	.app-main {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		transition: all 0.2s;

		.layout-header-wrap:not(.header-leave-active) + .app-main-wrapper {
			height: 100%;
			padding-top: var(--g-header-height);
		}
	}
}
</style>
