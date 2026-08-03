import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves project sites from /<repo>/, not /. BrowserRouter
  // in main.tsx reads this back via import.meta.env.BASE_URL so routing
  // matches in both dev (base '/') and the deployed site.
  base: process.env.VITE_BASE_PATH ?? '/',
  server: {
    port: 5173,
    proxy: {
      // Proxy API calls to the Express backend during development.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
