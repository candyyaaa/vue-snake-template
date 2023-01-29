/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2023-01-29 10:59:01
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2023-01-29 11:00:22
 */
import { resolve } from 'path'

export const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)
