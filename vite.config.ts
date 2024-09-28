import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  base: "/app",
  server: {
    host: "127.0.0.1",
    port: 3000,
    // hmr: {
    //   path: "/vite-hmr",
    // },
  },
  preview: {
    port: 5000,
  },
});
