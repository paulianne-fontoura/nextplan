import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT — GitHub Pages
// Le nom doit correspondre EXACTEMENT au nom du repo GitHub.
// Repo : nextplan → base : '/nextplan/'
export default defineConfig({
  base: '/nextplan/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: true,
  },
})
