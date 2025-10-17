/**
 * 打包 ESM
 */
import viteBase, { root } from "./vite.base";
import dts from "vite-plugin-dts";
import { mergeConfig, defineConfig } from "vite";
import { rimrafSync } from "rimraf";
import { externalDependencies } from "./utils";

const OUTPUT_DIR = root("es");

rimrafSync(OUTPUT_DIR);

export default mergeConfig(
  viteBase,
  defineConfig({
    build: {
      lib: {
        name: "RBS",
        fileName: "index",
        formats: ["es"],
        entry: root("src/export/index.tsx"),
      },
      rollupOptions: {
        external: externalDependencies, // 本地link时需注释这一行
        output: {
          dir: OUTPUT_DIR,
        },
      },
    },
    plugins: [
      dts({
        outDir: root("types"),
      }),
    ],
  }),
);
