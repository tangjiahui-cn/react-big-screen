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
          antd: ["antd"], // 单独分antd，避免按需使用antd，导致多包组合大体积产物chunk变化，致使node_modules chunk缓存失效。
          lodash: ["lodash-es"], // 单独分lodash（同antd）
          ahooks: ["ahooks"], // 单独分ahooks（同antd）
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
