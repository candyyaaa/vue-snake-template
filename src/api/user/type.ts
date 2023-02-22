/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2023-01-29 16:40:58
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-01-29 16:50:54
 */

// 登陆参数类型
export interface LoginParams {
	account: string
	password: string
}

// 登录返回类型
export interface LoginRes {
	token: string
	tokenType: string
}

// 获取用户信息返回类型
export interface UserInfoRes {
	account: string
	id: number
	username: string
	gender: string
	age: number
	phone: string
}
