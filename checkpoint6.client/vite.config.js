import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/ yaaaaaaa
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../checkpoint6/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
