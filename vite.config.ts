import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [
  ],
  server: {
    host: true,
    allowedHosts: ["mrma.local"]
  }
})