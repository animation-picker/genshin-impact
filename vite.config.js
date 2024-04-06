import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    imagetools(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
