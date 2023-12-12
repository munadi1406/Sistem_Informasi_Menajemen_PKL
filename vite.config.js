import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ViteWorkerPlugin from "worker-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  worker: {
    plugins: [new ViteWorkerPlugin()],
    format: "es",
  },
  build: {
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
