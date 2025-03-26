import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite';
// 引入自动引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 引入mock插件
import {viteMockServe} from 'vite-plugin-mock'

import vueJsx from "@vitejs/plugin-vue-jsx";  // 配置vue使用jsx

// https://vite.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: '/frame-layout/',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        }
      ]
    },
    plugins: [
      vue(),
      DefineOptions(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        localEnabled: command === 'serve',
        mockPath: 'mock', 
      }),
      vueJsx()
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVE,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
