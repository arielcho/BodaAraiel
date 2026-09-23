// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/BodaAraiel/',
//   server: {
//     port: 5173,
//     open: true,
//     host: true
//   }
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'cpanel' ? '/' : '/BodaAraiel/',
  server: {
    port: 5173,
    open: true,
    host: true
  }
}));
