import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/test-for-muse/',
  ssgOptions: {
    formatting: 'prettify',
    crittersOptions: false,
  },
})
