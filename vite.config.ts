import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";
import { analyzer } from "vite-bundle-analyzer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
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
    terserOptions: {},
    rollupOptions: {
      output: {
        manualChunks: {
          "driver.js": ["driver.js"],
          "react-vendor": ["react", "react-dom"],
          "monaco-editor": ["monaco-editor"],
          echarts: ["echarts"],
          ahooks: ["ahooks"], //（同antd）
          "lodash-es": ["lodash-es"], //（同antd）
          antd: ["antd"], //（同antd）
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
    ViteImageOptimizer({
      png: {
        quality: 80, // 质量（0-100，值越高越清晰，体积越大）
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      include: /\.(png|jpe?g|svg)$/i, // 仅处理指定格式
      exclude: /node_modules/, // 排除 node_modules 目录
    }),
    isAnalyzer && analyzer(),
  ],
});
