import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { BASENAME_ROUTE } from './src/constants'

// https://vite.dev/config/
export default defineConfig({
  base: BASENAME_ROUTE,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})
