import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚙️ Configuración para desplegar correctamente en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/cyberglow-swap/', // 👈 Usa el nombre exacto de tu repositorio aquí
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
})
