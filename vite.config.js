import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/blog/', // Cambia '/mi-aplicacion/' por la ruta que desees
  plugins: [react()]
});
