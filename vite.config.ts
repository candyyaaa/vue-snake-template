/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2023-01-29 22:19:10
 */
import { defineConfig, loadEnv } from 'vite'
// import { resolve } from 'path'
import { pathResolve } from './vite/utils'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  console.log('mode ----------->', mode)
  console.log('command ----------->', command)
  const env = loadEnv(mode, process.cwd())
  console.log('env ----------->', env)
  return defineConfig({
    base: '/snake/',
    resolve: {
      //设置别名
      alias: [
        { find: '@', replacement: pathResolve('src') + '/' },
        { find: '#', replacement: pathResolve('types') + '/' }
      ]
    },
    build: {
      minify: 'terser',
      outDir: `dist-snake`,
      assetsInlineLimit: 1000,
      rollupOptions: {
        output: {
          // 分类输出
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 超大静态资源拆分
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: command === 'build',
          drop_debugger: command === 'build'
        }
      }
    },
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      // 是否开启 https
      https: false,
      // 监听所有地址
      host: '0.0.0.0',
      // 端口
      port: 4856,
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 设置 https 代理
      proxy: {
        '/m1/699628-0-default/api': {
          // apifox 本地 Mock
          target: 'http://127.0.0.1:4523',
          changeOrigin: true,
          rewrite: (path: string) =>
            path.replace(/^\/m1^\/699628-0-default^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: '@import "src/assets/styles/var.scss";'
        }
      }
    }
  })
}
