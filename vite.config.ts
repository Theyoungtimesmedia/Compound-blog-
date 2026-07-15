import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const base = process.env.BASE_PATH || "/";

export default defineConfig({
  define: { __BASE_PATH__: JSON.stringify(base) },
  plugins: [react()],
  base,
  build: { sourcemap: true, outDir: "out" },
  resolve: { alias: { "@": resolve(__dirname, "./src") } },
  server: { port: 3000, host: "0.0.0.0" },
});