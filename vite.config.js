import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite para Cyberglow Swap
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
})
