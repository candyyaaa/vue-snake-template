/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-13 17:20:14
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-01-31 10:10:13
 */
import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

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
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, params, config)
  },

  postForm<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service(
      Object.assign(
        {
          method: 'post',
          url,
          data: params,
          transformRequest: [
            (data: any) => {
              let ret = ''
              for (const it in data) {
                ret +=
                  encodeURIComponent(it) +
                  '=' +
                  encodeURIComponent(data[it]) +
                  '&'
              }
              return ret
            }
          ],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        config
      )
    )
  },

  postJson<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service(
      Object.assign(
        {
          method: 'post',
          url,
          data: params,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        config
      )
    )
  },

  put<T = any>(
    url: string,
    params?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, params, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}
