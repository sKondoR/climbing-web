import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  // for GitHub pages deploy
  // base: '/climbing-web/', 
  plugins: [react(), vercel()],
  server: {
    https: {
      key: './localhost+2-key.pem',
      cert: './localhost+2.pem',
    },
    host: 'localhost',
    port: 443, // стандартный HTTPS-порт
  },  
  resolve: {
    alias: {
      src: "/src",
    },
  },
  assetsInclude: ['**/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,SVG}'],
})
