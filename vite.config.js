import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/cat-weight-loss-calculator/',
  ssgOptions: {
    formatting: 'prettify',
    crittersOptions: false,
  },
})
