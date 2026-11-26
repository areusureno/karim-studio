import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base = название репозитория на GitHub (между слэшами)
export default defineConfig({
  base: '/karim-studio/',
  plugins: [react()],
  preview: { allowedHosts: true },
});
