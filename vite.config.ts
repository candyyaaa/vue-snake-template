/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: menggt mengguotang@gdcattsoft.com
 * @LastEditTime: 2022-11-22 16:23:56
 */
import vue from '@vitejs/plugin-vue'
import progress from 'vite-plugin-progress'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

function pathResolve (dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// // https://vitejs.dev/config/
// export default defineConfig({
//   resolve: {
//     //设置别名
//     alias: [
//       {
//         find: '#',
//         replacement: pathResolve('types') + '/'
//       },
//       {
//         find: '@',
//         replacement: pathResolve('src') + '/'
//       }
//     ],
//     dedupe: ['vue']
//   },
//   plugins: [
//     vue(),
//     progress()
//   ],
//   server: {
//     //启动端口
//     port: 4856,
//     hmr: {
//       host: '127.0.0.1',
//       port: 4856,
//     },
//     // 设置 https 代理
//     proxy: {
//       '/api': {
//         target: 'your https address',
//         changeOrigin: true,
//         rewrite: (path: string) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         modifyVars: {},
//         javascriptEnabled: true,
//         additionalData: '@import "src/styles/var.scss";'
//       }
//     }
//   },
// })

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  console.log('mode ----------->', mode)
  console.log('command ----------->', command)
  const env = loadEnv(mode, process.cwd())
  console.log('env ----------->', env)
  return defineConfig({
      base: './',
      resolve: {
        //设置别名
        alias: [
          {
            find: '#',
            replacement: pathResolve('types') + '/'
          },
          {
            find: '@',
            replacement: pathResolve('src') + '/'
          }
        ],
        dedupe: ['vue']
      },
      plugins: [
        vue(),
        progress()
      ],
      server: {
        //启动端口
        port: 4856,
        hmr: {
          host: '127.0.0.1',
          port: 4856,
        },
        // 设置 https 代理
        proxy: {
          '/api': {
            target: 'your https address',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            modifyVars: {},
            javascriptEnabled: true,
            additionalData: '@import "src/styles/var.scss";'
          }
        }
      },
    })
}
