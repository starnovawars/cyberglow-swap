import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cyberglow-swap/', // 👈 Debe coincidir EXACTO con tu repo
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
})
