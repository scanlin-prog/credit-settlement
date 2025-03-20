import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgSpritePlugin({
      svgFolder: path.resolve(__dirname, 'src/assets/icons')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@styles/colors" as *;
          @use "@styles/variables" as *;
          @use "@styles/mixins" as *;
        `
      }
    }
  }
})
