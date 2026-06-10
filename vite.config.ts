import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { prerenderPlugin } from './scripts/prerender';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), prerenderPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['motion', 'motion/react'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
  },
});
