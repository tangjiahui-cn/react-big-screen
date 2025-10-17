import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pkg from "../package.json";
import { analyzer } from "vite-bundle-analyzer";

// 是否分析打包情况
const isAnalyzer = process.env.mode === "analyzer";

export const root = (...args: string[]) => {
  return path.resolve(__dirname, "..", ...args);
};

// https://vitejs.dev/config/
export default defineConfig({
  root: root(),
  base: "./",
  define: {
    VERSION: `"${pkg.version}"`,
    __LIB_MODE__: !!process.env.LIB_MODE,
    __DEV__: process.env.NODE_ENV === "development",
  },
  resolve: {
    alias: {
      "@": root("src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${root("src/global.less")}";`,
      },
    },
  },

  plugins: [react(), isAnalyzer && analyzer()],
});
