<!--
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:16:13
 * @LastEditors: menggt littlecandyi@163.com
 * @LastEditTime: 2023-02-22 14:41:11
-->
<template>
	<div class="login-wrap">
		<Container>
			<div class="login-main">
				<div class="login-main__box">
					<div class="main-box__banner">
						<div class="logo"></div>
						<div class="banner"></div>
					</div>
					<el-form
						ref="loginRef"
						:model="loginForm"
						:rules="loginRules"
						class="main-box__form"
						:size="'default'"
						status-icon
					>
						<el-form-item prop="account">
							<el-input v-model="loginForm.account" />
						</el-form-item>
					</el-form>
				</div>
			</div>
		</Container>
	</div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const loginRef = ref<FormInstance>()
const loginForm = reactive({
	account: '',
	password: ''
})

const loginRules = reactive<FormRules>({
	account: [{ required: true, message: '', trigger: 'blur' }]
})
</script>

<style lang="scss" scoped>
.login-wrap {
	width: 100%;
	height: 100%;
	overflow: hidden;

	.login-main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle at center, var(--g-app-bg, #fff), var(--g-main-bg, #f2f3f5));

		.login-main__box {
			display: flex;
			justify-content: space-between;
			background-color: var(--g-app-bg, #fff);
			border-radius: 10px;
			box-shadow: var(--el-box-shadow, 0 12px 32px 4px rgb(0 0 0 / 4%), 0 8px 20px rgb(0 0 0 / 8%));
			overflow: hidden;

			.main-box__banner {
				position: relative;
				width: 450px;
				background-color: var(--g-main-bg, #f2f3f5);
				overflow: hidden;

				.logo {
					position: absolute;
					top: 20px;
					left: 20px;
					width: 32px;
					height: 32px;
					background: url('@/assets/images/login/login-logo.png') no-repeat center;
					background-size: 100% 100%;
					border-radius: 4px;
				}

				.banner {
					width: 100%;
				}
			}

			.main-box__form {
				display: flex;
				justify-content: center;
				width: 500px;
				min-height: 500px;
				padding: 50px;
				overflow: hidden;
				flex-direction: column;
			}
		}
	}
}
</style>
