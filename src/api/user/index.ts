/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-13 17:34:38
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-01-29 16:51:14
 */
import { http } from '@/utils/request'
import type { LoginParams, LoginRes, UserInfoRes } from './type'

/**
 * @description: login
 * @param {*} params
 * @return {*}
 */
export const login = (params: LoginParams) => {
  return http.post<LoginRes>('/user/login', params)
}

/**
 * @description: 获取用户信息
 * @return {*}
 */
export const getUserInfo = () => {
  return http.get<UserInfoRes>('/user/getUserInfo')
}
