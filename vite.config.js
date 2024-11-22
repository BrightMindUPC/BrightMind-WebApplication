import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy para las solicitudes a la API
      '/api': {
        target: 'http://localhost:8080', // URL del backend
        changeOrigin: true, // Cambia el origen de la solicitud
        secure: false, // Desactiva la verificación SSL en caso de HTTPS local
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional, reescribe el prefijo
      },
    },
  },
});
