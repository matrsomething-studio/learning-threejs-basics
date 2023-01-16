import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import path from 'path';

const dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      '~bootstrap': 'node_modules/bootstrap',
    }
  },
  publicDir: 'assets',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true
  },
  plugins: [glsl()]
});