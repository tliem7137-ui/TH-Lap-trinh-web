import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cấu hình Vite chạy cổng 3000 theo yêu cầu đề bài
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
