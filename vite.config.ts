import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  // for GitHub pages deploy
  // base: '/climbing-web/', 
  plugins: [react(), vercel()],
})
