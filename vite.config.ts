import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import VitePrettier from 'vite-plugin-prettier';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePrettier(),
    tsconfigPaths(),
  ],
})
