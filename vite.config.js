import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cyberglow-swap/', // 👈 Coincide con el nombre del repo
  build: {
    outDir: 'dist',
  },
})
