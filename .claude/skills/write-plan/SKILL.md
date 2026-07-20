---
name: write-plan
description: 从 Spec 技术规格文档生成分步实施计划（Plan），包含执行记忆存储和 git commit 策略。当用户要求"写 plan"、"生成实施计划"、"spec 转 plan"、"帮我拆分实现步骤"时触发。
allowed-tools: Read(*), Bash(git:*, ls:*, find:*, cat:*, head:*, tail:*, test:*), Write(*), Edit(*), Glob(*)
metadata:
  author: tangjiahui
  version: "1.0.0"
---

# Write Plan

从 Spec 文档生成结构化的分步实施计划，输出到 `.claude/tmp/plan/`。每步可独立验证、可 git 回滚、可中断续接。

## 触发条件

当用户提到以下内容时调用此 skill：
- "写 plan / 生成 plan"
- "生成实施计划"
- "spec 转 plan"
- "帮我拆分实现步骤"
- "按 spec 执行"

## 前置条件

### 必须存在 Spec 文件

开始执行前，**必须**确认 Spec 文件存在：

```bash
ls .claude/tmp/spec/*.md 2>/dev/null
```

- **如果存在**：选择对应的 spec 文件，作为 plan 的输入
- **如果不存在**：立即报错并停止

```
❌ 错误：Spec 文件不存在（.claude/tmp/spec/ 目录下无 .md 文件）。

请先执行以下命令生成 Spec：
  「帮我写 spec：<你的需求>」

或手动运行 write-spec skill 生成技术规格文档。
```

### 确认 Spec 文件

如果有多个 Spec，让用户选择目标 Spec。如果只有一个，直接使用。

## 执行流程

### 1. 加载 Spec

读取 Spec 文档，提取关键信息：
- 需求概述和功能拆分
- 技术方案和涉及模块
- 文件变更清单
- 验证方案

### 2. 检查 Git 状态

确认当前工作区干净，避免计划执行时的冲突：

```bash
git status --porcelain
```

如果有未提交的修改，警告用户并建议先处理。

### 3. 设计执行步骤

按 spec 中的「实现步骤」章节，细化为可独立执行和验证的步骤。每个步骤需满足：

- **原子性**：一个步骤只做一件事
- **可验证**：有明确的验证方式
- **可回滚**：一个步骤 = 一个 git commit，出问题可 `git revert` 单步回滚
- **可续接**：中断后能从上一次执行位置继续

### 4. 生成 Plan 文档 + 状态文件

Plan 文件名与 Spec 文件名保持一致，输出两个文件到 `.claude/tmp/plan/`：

```
.claude/tmp/plan/
├── <name>.md          # 实施计划文档（与 spec 同名）
└── <name>.state.json  # 执行状态追踪
```

示例（spec 为 `drag-clamp-to-canvas-boundary.md`）：
```
.claude/tmp/spec/drag-clamp-to-canvas-boundary.md
.claude/tmp/plan/drag-clamp-to-canvas-boundary.md
.claude/tmp/plan/drag-clamp-to-canvas-boundary.state.json
```

## Plan 文档结构

```markdown
# [计划标题]

> Spec: [spec 文件路径] | 创建时间: YYYY-MM-DD | 总步骤: N

## 前置准备

- [x] 工作区干净 (`git status` 无未提交内容)
- [ ] Spec 已确认
- [ ] 依赖已安装 (`pnpm install`)

## 执行步骤

### Step 1: [步骤名称]

- **文件**：`src/xxx.ts`
- **操作**：[新增/修改] — 具体改动描述
- **验证**：如何确认这一步做对了
- **依赖**：无 / Step N

### Step 2: [步骤名称]

- **文件**：`src/yyy.ts`
- **操作**：[新增/修改] — 具体改动描述
- **验证**：如何确认这一步做对了
- **依赖**：Step 1

### Test Step: 编写并运行单元测试

- **文件**：`src/**/__tests__/*.test.ts`（依据 spec 中的「单元测试」章节）
- **操作**：新增 — 为 P0/P1 功能点编写单元测试
- **验证**：`pnpm vitest run` 全部通过
- **前置条件**：如项目未安装 Vitest，在「前置准备」中安排安装
- **依赖**：所有功能实现步骤完成后执行
```

## 状态文件格式（plan.state.json）

```json
{
  "plan": "<name>",
  "spec": ".claude/tmp/spec/<name>.md",
  "planFile": ".claude/tmp/plan/<name>.md",
  "stateFile": ".claude/tmp/plan/<name>.state.json",
  "createdAt": "2026-07-20T10:00:00",
  "updatedAt": "2026-07-20T10:30:00",
  "branch": "feat/<name>",
  "steps": [
    {
      "id": 1,
      "name": "Step 1: xxx",
      "status": "completed",
      "commitHash": "abc1234",
      "completedAt": "2026-07-20T10:10:00"
    },
    {
      "id": 2,
      "name": "Step 2: xxx",
      "status": "in_progress",
      "commitHash": null,
      "completedAt": null
    },
    {
      "id": 3,
      "name": "Step 3: xxx",
      "status": "pending",
      "commitHash": null,
      "completedAt": null
    }
  ],
  "completedAt": null
}
```

状态取值：
- `pending` — 未开始
- `in_progress` — 执行中（中断后从此步恢复）
- `completed` — 已完成（含 git commit）
- `skipped` — 已跳过
- `failed` — 执行失败（需人工介入）

## 执行约定（写入 plan.md 的「执行约定」章节）

生成 plan 时必须包含以下约定：

### Git 策略

```markdown
## 执行约定

### Git 策略

1. 开始前创建新分支 `feat/<name>`（基于当前分支）
2. 每完成一个 Step（含 Test Step），执行：
   ```bash
   git add <涉及文件>
   git commit -m "feat: <步骤名称>"
   ```
3. 每个 Step 一个独立 commit，不合并多个 Step
4. Test Step 的 commit message 格式：`"test: <模块名> 单元测试"`
5. 切换分支不产生 commit
6. 回滚到某步：`git reset --hard <上一Step的commitHash>` 丢弃之后所有 commit
7. 全部完成后：`git checkout master && git merge --no-ff plan/<name>`
```

### 中断续接

```markdown
### 中断续接

1. 读取 `.claude/tmp/plan/<name>.state.json`
2. 找到第一个 `status: "in_progress"` 或 `status: "pending"` 的步骤
3. 检查 git 状态：如果该步骤的 `commitHash` 非空，说明已完成；如果为空，需要重新执行
4. 从中断步骤继续执行，完成后更新 state.json
```

## 使用场景

### 开始执行

用户说「按 plan 执行」→ 读取 plan.md 和 state.json → 从第一个 pending 步骤开始执行 → 每步完成后更新 state.json + git commit

### 中断后恢复

用户说「继续执行 plan」→ 读取 state.json → 从 in_progress 或第一个 pending 步骤恢复 → 继续执行

### 回滚某步骤

用户说「回滚到 Step N」→ `git reset --hard <Step N-1的commitHash>` → 更新 state.json 中 Step N 及之后的状态为 `pending`

## 注意事项

1. **Plan 必须基于 Spec 生成**，不要凭空设计步骤
2. **步骤必须是线性的**，Step N+1 可以依赖 Step N，但不能有循环依赖
3. **每步改动的文件不超过 2 个**，便于 review 和回滚
4. **验证方式要具体可执行**，不写「验证功能正常」这种模糊描述
5. **「分支创建」不算一个 Step**（切换分支不 commit），在开始 Step 1 前自动完成
6. **Plan 文档和 state.json 本身不纳入 git commit 范围**（仅本地使用）
7. **Test Step 永远是最后一个 Step**，在所有功能实现步骤之后，commit message 前缀为 `test:` 而非 `feat:`
8. **如果项目未安装测试框架**，在「前置准备」中增加安装步骤：
   ```bash
   pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```
   并在 state.json 中加一个准备工作步骤（不含 commit）
