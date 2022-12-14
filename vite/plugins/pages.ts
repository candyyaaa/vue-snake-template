/*
 * @Description: <>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 17:44:44
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 17:44:50
 */
import pages from 'vite-plugin-pages'

export default function createPages() {
  return pages({
    dirs: 'src/views',
    exclude: [
      '**/components/**/*.vue',
    ],
  })
}
