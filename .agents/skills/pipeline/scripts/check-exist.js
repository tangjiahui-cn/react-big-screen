#!/usr/bin/env node
/**
 * check-exist — 检测指定文件中是否存在某个字符串（CLI 工具）
 *
 * 运行要求：Node.js v16 及以上
 *
 * 用法：
 *   node check-exist.js <文件路径> <查找字符串>
 *
 * 退出码：
 *   0 — 找到该字符串
 *   1 — 未找到（含文件本身不存在的情况）
 *   2 — 参数用法错误
 *
 * 示例：
 *   node check-exist.js .gitignore '.pipeline/' && echo "已忽略" || echo "未忽略"
 */
"use strict";

const fs = require("fs");

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.error("用法: node check-exist.js <文件路径> <查找字符串>");
    process.exit(2);
  }

  const file = args[0];
  const pattern = args[1];

  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch (err) {
    // 文件不存在 → 视为「不存在」，由 write-file 负责创建
    if (err.code === "ENOENT") {
      process.exit(1);
    }
    console.error(`读取文件失败: ${file} (${err.message})`);
    process.exit(2);
  }

  // 按字面字符串匹配（点号/斜杠无需转义）
  if (content.includes(pattern)) {
    process.exit(0);
  }
  process.exit(1);
}

main();
