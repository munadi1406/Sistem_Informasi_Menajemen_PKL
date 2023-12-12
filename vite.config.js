import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ViteWorkerPlugin from "worker-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteWorkerPlugin()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  worker: {
    // Konfigurasi tambahan untuk worker jika diperlukan
    // Misalnya, Anda dapat menentukan format atau menambahkan opsi lainnya.
    // Lihat dokumentasi worker-plugin untuk opsi-opsi yang tersedia:
    // https://github.com/GoogleChromeLabs/worker-plugin#options
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
