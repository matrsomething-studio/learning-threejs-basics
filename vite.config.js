import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/",
  resolve: {
    alias: {
      '~bootstrap': 'node_modules/bootstrap',
    }
  },
  publicDir: "assets",
  build: {
    outDir: "../dist"
  },
  plugins: [glsl()]
});