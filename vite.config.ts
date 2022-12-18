/*
 * @Description: <>
 * @Author: candy littlecandyi@163.com
 * @Date: 2022-11-08 00:53:21
 * @LastEditors: candy littlecandyi@163.com
 * @LastEditTime: 2022-12-18 02:06:17
 */
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

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
        { find: '@', replacement: pathResolve('src') + '/' },
        { find: '#', replacement: pathResolve('types') + '/' }
      ]
    },
    esbuild: {
      drop: ['console', 'debugger']
    },
    build: {
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
      }
    },
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      //启动端口
      port: 4856,
      hmr: {
        host: '127.0.0.1',
        port: 4856
      },
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
