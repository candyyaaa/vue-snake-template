/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-13 17:20:14
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-01-29 17:14:43
 */
import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Result<T = any> {
  code: number
  message: string
  data: T
}

const service = axios.create({
  baseURL: '/m1/699628-0-default/api',
  timeout: 30000,
  responseType: 'json'
})

/* 请求拦截器 */
service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    // if (token) {
    //   request.headers.Authorization = `Bearer ${token}`;
    // }
    return request
  },
  (error: AxiosError) => {
    console.log('error ----------->', error)
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response ----------->', response)
    const { code, message } = response.data

    if (code === 200) {
      return response
    } else {
      // 处理业务错误。
      console.log('message ----------->', message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    console.log('message ----------->', message)
    return Promise.reject(error)
  }
)

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}
