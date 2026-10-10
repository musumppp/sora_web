import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') 
    },
    preserveSymlinks: true
  },
  optimizeDeps: {
    exclude: []
  },
  server: {
    open: true,
    port: 4500,
    hmr: {
      overlay: true,
      host: 'localhost',
      protocol: 'ws'
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['node_modules', '.git', 'dist'],
      include: ['src/**/*']
    },
    fs: {
      strict: false,
      allow: [path.resolve(__dirname, '.')]
    },
    proxy: {
      '/log': 'http://localhost:8000',
      '/album': 'http://localhost:8000',
      '/resource': 'http://localhost:8000'
    }
  }
})