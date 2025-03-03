import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";
import { analyzer } from "vite-bundle-analyzer";
const dayjs = require("dayjs");

// 是否分析打包情况
const isAnalyzer = process.env.mode === "analyzer";

// 是否构建为github部署页面
const isDeployGithub = process.env.deploy === "github";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 11000,
  },
  base: "./",
  define: {
    VERSION: `"${pkg.version}"`,
    __DEV__: process.env.NODE_ENV === "development",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(__dirname, "src/global.less")}";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ["antd"], // 单独分包，避免按需使用antd时体积增大，继而导致“多包组合的大型chunk”体积变化，致使缓存失效。
          lodash: ["lodash-es"], //（同antd）
          ahooks: ["ahooks"], //（同antd）
          "monaco-editor": ["monaco-editor"],
          echarts: ["echarts"],
        },
      },
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: "src/main.tsx",
          filename: "index.html",
          template: "index.html",
          injectOptions: {
            data: {
              injectScript: isDeployGithub
                ? `<script>console.log('version ${pkg.version}\t(Last build：${dayjs().format(
                    "YYYY-MM-DD HH:mm:ss",
                  )} ${Intl.DateTimeFormat().resolvedOptions().timeZone})')</script>`
                : "",
            },
          },
        },
      ],
    }),
    isAnalyzer && analyzer(),
  ],
});
