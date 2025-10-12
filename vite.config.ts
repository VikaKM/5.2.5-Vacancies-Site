/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/4.2.3-Vacancies-Site/', 
  test: {
    globals: true,          
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts', 
    include: ['src/test/**/*.test.tsx'],
  },
})
