import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/GIE-page/', // Asegura que las rutas de los activos sean correctas en producción
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
