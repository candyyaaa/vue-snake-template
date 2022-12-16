/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-13 17:34:38
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-16 10:56:59
 */
import { http } from '@/utils/request'

interface LoginData {
  account: string
  password: string
}
/**
 * @description: login
 * @param {*} params
 * @return {*}
 */
export const login = (params: LoginData) => {
  return http.post('/user/login', params)
}
