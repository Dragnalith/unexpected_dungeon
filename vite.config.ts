import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [
    react(),
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV === 'development',
      runtimeInjection: true,
      treeshakeCompensation: true,
      unstable_moduleResolution: {
        type: 'commonJS',
      },
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ['@stylexjs/stylex'],
  },
})
