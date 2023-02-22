<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-12-19 00:46:27
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-07 00:40:43
-->
<template>
	<router-link :to="to" class="title" :title="title">
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
.title {
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	top: 0;
	z-index: 1000;
	width: inherit;
	height: var(--g-sidebar-logo-height, 50px);
	padding: inherit;
	background-color: inherit;

	@apply tw-truncate;

	.logo-icon {
		width: 50px;
		height: 50px;
		object-fit: contain;
	}

	.logo-text {
		display: block;
		font-weight: 700;
		margin-left: 10px;
		font-size: 24px;
		letter-spacing: 1px;
		color: var(--g-header-color, #fff);

		@apply tw-truncate;
	}
}
</style>
