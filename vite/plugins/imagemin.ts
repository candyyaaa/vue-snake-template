/*
 * @Description: <压缩图片资源>
 * @Author: menggt mengguotang@gdcattsoft.com
 * @Date: 2022-12-14 17:58:52
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-12-14 18:02:02
 */
import imagemin from 'vite-plugin-imagemin'

export default function createImagemin() {
  return imagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox'
        },
        {
          name: 'removeEmptyAttrs',
          active: false
        }
      ]
    }
  })
}
