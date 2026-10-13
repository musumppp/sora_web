import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => ({
  /* 生产构建剥掉 console.* 和 debugger —— 访客打开 F12 不该看到调试日志。
     注意：Vite 8 默认用 Oxc minifier，它没暴露 drop_console 选项，
     所以这里显式切到 terser（构建慢几秒，换可控性，个人项目够用）。 */
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

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
    /* 本地开发的接口转发；生产环境由 Nginx 反向代理接管，不经过这里 */
    proxy: {
      '/log': 'http://localhost:8000',
      '/album': 'http://localhost:8000',
      '/resource': 'http://localhost:8000'
    }
  }
}))
