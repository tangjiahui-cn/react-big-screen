import { defineConfig } from "vitest/config";

// Standalone config so Vitest does not pick up vite.config.ts: that one is browser-oriented
// (react/html/image plugins, a `require` call) and nothing under test here needs it.
// Only scripts/ is covered today -- src/ code would need a browser environment and its own config.
export default defineConfig({
  test: {
    environment: "node",
    include: ["scripts/**/*.test.ts"],
  },
});
