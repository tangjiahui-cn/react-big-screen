---
name: execute-plan
description: 按 Plan 文档逐步执行代码改动，每步自动 lint、git commit 并更新执行状态，支持中断续接和单步回滚。当用户要求"执行 plan"、"按计划实施"、"开始写代码"时触发。
allowed-tools: Read(*), Write(*), Edit(*), Bash(git:*, pnpm:*, ls:*, cat:*, test:*), Glob(*)
metadata:
  author: tangjiahui
  version: "1.0.0"
---

# Execute Plan

按 Plan 文档的分步计划逐步执行代码改动，每步完成后自动 lint + git commit，支持中断续接和回滚。

## 触发条件

- "执行 plan"、"按 plan 执行"
- "开始实施"、"按照计划写代码"
- "继续执行 plan"（中断后恢复）
- "回滚 Step N"

## 前置条件

### 必须存在 Plan 文件

```bash
ls .claude/tmp/plan/*.state.json 2>/dev/null
```

- **存在** → 选择目标 plan，开始执行
- **不存在** → 报错停止

```
❌ 错误：Plan 文件不存在（.claude/tmp/plan/ 目录下无 .state.json 文件）。

请先用 write-plan 生成实施计划：
  「帮我写 plan：<spec 文件>」
```

## 执行流程

```
读 plan.md + state.json
  → 找到第一个 pending/in_progress 步骤
    → git checkout feat/<plan-name>（首次则创建）
      → 按 plan 中的代码 diff 执行 Edit 改动
        → pnpm lint --fix（如果配置了）
          → ✅ 通过 → git add + commit（"feat: <步骤名称>"）
          → ❌ 失败 → 尝试修复，不行则暂停等人工
            → 更新 state.json（status + commitHash）
              → 继续下一步
                → 全部完成 → 输出摘要
```

## 执行规范

### 每步操作序列

```
Step N 执行:
  1. 更新 state.json: status → "in_progress"
  2. 读取 plan.md 中 Step N 的「改动内容」
  3. 用 Edit 工具精确修改目标文件
  4. 运行 lint: pnpm lint --fix（如果有 lint script）
     - lint 失败 → 根据错误信息自动修复，最多重试 2 次
     - 2 次仍失败 → status → "failed"，暂停，等用户介入
  5. git add <涉及文件>
  6. git commit -m "feat: <步骤名称>"
  7. 更新 state.json: status → "completed", commitHash → 实际 hash
  8. 输出: "✅ Step N 完成 (commit: abc1234) — <步骤名称>"
```

### 中断续接

```
重新进入 execute-plan 时:
  1. 读 state.json
  2. 找 status = "in_progress" 的步骤
     - 存在 → 检查 commitHash 是否为空
       - 非空 → 已完成，标记为 completed，继续下一步
       - 为空 → 重新执行（上次中断在代码改动阶段）
  3. 找第一个 status = "pending" 的步骤 → 从此开始
  4. 全部 completed → 输出"全部步骤已执行完毕"
```

### 回滚

```
回滚 Step N:
  1. 读 state.json，获取该步骤的 commitHash
  2. git revert <commitHash> --no-edit
  3. 状态更新: status → "pending", commitHash → null
  4. 输出: "↩ Step N 已回滚，状态重置为 pending"
```

## 出错处理

| 场景 | 处理方式 |
|------|----------|
| lint 报错 | 自动分析错误原因，用 Edit 修复，重试 2 次 |
| 修复失败 | 标记 status="failed"，输出具体错误信息，暂停等用户 |
| git 冲突 | 暂停，提示用户手动解决后继续 |
| 文件已被修改 | 输出 `git diff` 差异，询问是否覆盖/合并/跳过 |
| 构建失败 | 与 lint 相同，尝试自动修复 |

## 执行摘要

全部步骤完成后输出：

```
## 执行完毕

Plan: <plan-name>
分支: feat/<plan-name>

| Step | 名称 | Commit | 状态 |
|------|------|--------|------|
| 1 | xxx | abc1234 | ✅ |
| 2 | xxx | def5678 | ✅ |
| 3 | xxx | ghi9012 | ✅ |

### 下一步
- 验收：pnpm dev 启动，手动验证功能
- 合并：git checkout master && git merge --no-ff feat/<plan-name>
- 回滚全部：git reset --hard $(git merge-base master feat/<plan-name>)
```

## 注意事项

1. **只执行代码改动**，不启动 dev server、不做手动测试（那是 pipeline 的 Phase 4）
2. **每步必须产生 commit**，无代码变更的步骤（如回归验证）跳过，标记为 "skipped"
3. **state.json 是唯一真相源**：git log 可能被修改，但 state.json 记录的是执行历史
4. **Edit 操作前先 Read 目标文件**，避免过期内容导致的编辑失败
5. **不要修改 plan.md 本身**，只读不写
