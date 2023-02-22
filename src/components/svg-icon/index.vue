<!--
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 16:54:43
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 17:10:41
-->
<template>
	<svg :class="svgClass" aria-hidden="false">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
interface Props {
	prefix?: string
	name?: string
	color?: string
	className?: string
}

const props = withDefaults(defineProps<Props>(), {
	prefix: 'icon',
	name: '',
	color: '#000',
	className: 'svg-icon'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const svgClass = computed(() => props.className)
</script>

<style lang="scss" scoped>
.svg-icon {
	//此属性为更改svg颜色属性设置
	fill: currentColor;
}
</style>
