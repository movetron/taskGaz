import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    // слушать на 0.0.0.0, открываться по своей сетевой IP
    port: 5173,
    host: '0.0.0.0',       
    open: true,       // авто‑открыть браузер
  },
});
