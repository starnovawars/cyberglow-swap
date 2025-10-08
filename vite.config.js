import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cyberglow-swap/', // 👈 cambia esto si tu repo tiene otro nombre
})
