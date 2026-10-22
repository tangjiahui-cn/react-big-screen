#!/usr/bin/env node
/**
 * remove-dir — 递归删除指定目录（CLI 工具）
 *
 * 运行要求：Node.js v16 及以上
 *
 * 用法：
 *   node remove-dir.js <目录路径>
 *
 * 退出码：
 *   0 — 删除成功（或目录不存在，视为无需删除）
 *   2 — 参数用法错误
 *
 * 示例：
 *   node remove-dir.js .pipeline
 */
"use strict";

const fs = require("fs");

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("用法: node remove-dir.js <目录路径>");
    process.exit(2);
  }

  const dir = args[0];

  // 目录不存在 → 无需删除，静默成功
  if (!fs.existsSync(dir)) {
    process.exit(0);
  }

  // recursive: 递归删除整棵目录树；force: 目标不存在时不抛错
  fs.rmSync(dir, { recursive: true, force: true });
}

main();
