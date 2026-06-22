import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // IMPORTANT FOR VERCEL

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    outDir: "dist",
    target: "esnext",
    cssCodeSplit: false, // ← forces ALL CSS into index.css
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: true,
  },
});
