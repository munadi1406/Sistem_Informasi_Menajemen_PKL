import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        worker: "./src/services/worker.js", // Path ke file Web Worker
      },
    },
  },
});
