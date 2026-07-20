import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/portfolio/',
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
