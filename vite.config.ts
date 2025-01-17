import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";

// 是否构建为github部署页面
const isDeployGithub = process.env.deploy === "github";

// dayjs设置utc时区
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const tz = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.tz.setDefault("Asia/Shanghai");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 11000,
  },
  base: "./",
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
              injectScript:
                isDeployGithub &&
                `<script>console.log('version ${pkg.version}\t(Last build：${dayjs().format(
                  "YYYY-MM-DD HH:mm:ss",
                )} China/ShangHai)')</script>`,
            },
          },
        },
      ],
    }),
  ],
});
