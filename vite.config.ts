import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//按需引入element plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
function resolve(url) {
  return path.resolve(__dirname, url)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":resolve("./src")
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers:[ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),]
})
