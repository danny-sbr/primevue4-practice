import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vitest'],
      dts: './src/auto-imports.d.ts', // 檔案位置
      eslintrc: {
        enabled: true, // 改為 true 會自動生成 unplugin-auto-import 的規則設定
      },
    }),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    {
      // Markdown 檔案載入器插件
      name: 'markdown-loader',
      // 轉換函式，接收程式碼和檔案 ID 作為參數
      transform(code, id) {
        // 檢查檔案是否為 .md 結尾
        if (id.slice(-3) === '.md') {
          // 將 Markdown 內容轉換為字串並匯出
          // 這樣可以在其他檔案中直接 import 並使用這些內容
          return `export default ${JSON.stringify(code)};`
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5570,
  },
})
