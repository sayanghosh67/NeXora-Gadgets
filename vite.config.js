import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // In dev → serve from "/" so localhost:5173/ works.
  // In build → use "/NeXora-Gadgets/" for GitHub Pages deployment.
  base: command === 'build' ? '/NeXora-Gadgets/' : '/',
}))
