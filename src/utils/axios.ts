/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 01:46:34
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-11-08 01:46:44
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const service = axios.create() // Request interceptors

service.interceptors.request.use((config: AxiosRequestConfig) => {
    // do something
    return config
  },(error: any) => {
    Promise.reject(error)
  }
) // Response interceptors

// service.interceptors.response.use(async (response: AxiosResponse) => {
//     // do something
//   },(error: any) => {
//     // do something
//     return Promise.reject(error)
//   }
// )

export default service
