import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pkg from "./package.json";

const isDeployGithub: boolean = process.env.deploy === "github";
const PUBLIC_PATH: string = isDeployGithub ? `/${pkg.name}/` : "/";
const BASE: string = isDeployGithub ? `/${pkg.name}/` : "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 11000,
  },
  base: PUBLIC_PATH,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    PUBLIC_PATH: `"${PUBLIC_PATH}"`,
    BASE: `"${BASE}"`,
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(__dirname, "src/global.less")}";`,
      },
    },
  },
});
