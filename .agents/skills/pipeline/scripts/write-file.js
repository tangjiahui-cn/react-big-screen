#!/usr/bin/env node
/**
 * write-file — 向指定文件追加内容，文件不存在则创建（CLI 工具）
 *
 * 运行要求：Node.js v16 及以上
 *
 * 用法：
 *   node write-file.js <文件路径> <要追加的内容...>
 *
 * 说明：
 *   - 内容以「独立一行」追加到文件末尾。
 *   - 文件不存在时自动创建（含父目录）。
 *   - 文件末尾已有内容且未以换行结尾时，先补一个换行再追加，避免两段拼到一行。
 *
 * 示例：
 *   node write-file.js .gitignore '.pipeline/'
 */
"use strict";

const fs = require("fs");
const path = require("path");

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("用法: node write-file.js <文件路径> <要追加的内容>");
    process.exit(2);
  }

  const file = args[0];
  const content = args.slice(1).join(" ");

  // 父目录不存在则创建
  const dir = path.dirname(file);
  if (dir !== ".") {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 文件存在且有内容、且末尾不是换行符(0x0a)时，先补一个换行
  let prefixNewline = false;
  if (fs.existsSync(file)) {
    const existing = fs.readFileSync(file, "utf8");
    if (existing.length > 0 && !existing.endsWith("\n")) {
      prefixNewline = true;
    }
  }

  const line = (prefixNewline ? "\n" : "") + content + "\n";
  fs.appendFileSync(file, line, "utf8");
}

main();
