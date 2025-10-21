import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    // Output directory
    outDir: 'dist',
    // Generate source maps for production debugging
    sourcemap: false,
    // Minification using esbuild (default, faster than terser)
    minify: 'esbuild',
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for react libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },
  esbuild: {
    // Remove console.log and debugger statements in production
    drop: ['console', 'debugger'],
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
