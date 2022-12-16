/*
 * @Description: <build 进度条插件>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 15:47:12
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-15 14:47:39
 */
import progress from 'vite-plugin-progress'
import colors from 'picocolors'

export default function createProgress() {
  return progress({
    format: `${colors.green(colors.bold('Building'))} ${colors.cyan(
      '[:bar]'
    )} :percent | Time: :elapseds`,
    width: 100
  })
}
