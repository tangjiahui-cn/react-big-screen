---
name: pipeline
description: 全自动需求→实现流水线编排。串联 write-spec → refine-spec → write-plan → execute-plan → 验收，每阶段设置确认门，支持中断恢复。当用户要求"全自动实现"、"一键开发"、"按需求交付"时触发。
allowed-tools: Read(*), Write(*), Edit(*), Bash(git:*, pnpm:*, ls:*, cat:*, test:*), Glob(*), Skill(write-spec, refine-spec, write-plan, execute-plan)
metadata:
  author: tangjiahui
  version: "1.0.0"
---

# Pipeline — 需求→实现 全自动流水线

串联 spec → plan → code → verify 全过程，每阶段 gate 确认，支持中断恢复、回滚和重新进入。

## 触发条件

- "全自动实现 / 一键开发 / 自动交付"
- "从需求到实现 / 从 idea 到代码"
- "执行流水线 / 跑 pipeline"
- "继续上次的流水线"（中断恢复）

## 前置条件

### 必须存在 CLAUDE.md

```bash
test -f ./CLAUDE.md && echo "EXISTS" || echo "NOT_FOUND"
```

- **存在** → 继续流水线
- **不存在** → 自动调用 `write-project-context` skill 生成 CLAUDE.md，生成后继续流水线

> 注意：write-project-context 会自动分析项目结构生成 CLAUDE.md，如果生成的内容不准确，可手动修改。

## 流水线状态文件

全局状态文件 `.claude/tmp/pipeline.state.json`：

```json
{
  "requirement": "原始需求文本",
  "currentPhase": "write-plan",
  "createdAt": "2026-07-20T10:00:00",
  "updatedAt": "2026-07-20T11:30:00",
  "phases": {
    "write-spec": {
      "status": "completed",
      "output": ".claude/tmp/spec/drag-clamp.md",
      "startedAt": "...",
      "completedAt": "..."
    },
    "write-plan": {
      "status": "in_progress",
      "output": ".claude/tmp/plan/drag-clamp.md",
      "startedAt": "...",
      "completedAt": null
    },
    "execute-plan": {
      "status": "pending",
      "output": null,
      "startedAt": null,
      "completedAt": null
    },
    "acceptance": {
      "status": "pending",
      "startedAt": null,
      "completedAt": null
    }
  }
}
```

## 完整流程

```
Phase 1: WRITE SPEC
  ├─ 调 write-spec 生成 Spec 初稿
  ├─ 展示 Spec 摘要
  ├─ Gate: "Spec 是否 OK？"
  │   ├─ 「确认」→ Phase 2
  │   ├─ 「修改」→ 调 refine-spec 打磨 → 重新确认
  │   └─ 「暂停」→ 保存 pipeline.state，随时继续
  │
Phase 2: WRITE PLAN
  ├─ 调 write-plan 生成 Plan
  ├─ 展示步骤列表
  ├─ Gate: "Plan 是否 OK？"
  │   ├─ 「确认」→ Phase 3
  │   ├─ 「调整」→ 讨论修改 plan → 重新确认
  │   └─ 「暂停」→ 保存中间状态
  │
Phase 3: EXECUTE PLAN
  ├─ 调 execute-plan 逐步执行
  ├─ 每步完成后报告进展
  ├─ 遇错暂停，等人工处理
  ├─ 全部完成 → Phase 4
  │
Phase 4: ACCEPTANCE
  ├─ 提示: pnpm dev 启动验证
  ├─ Gate: "功能是否验收通过？"
  │   ├─ 「通过」→ 询问是否 merge
  │   ├─ 「不通过」→ 选项: 修改 spec 重新走 / 回滚某步 / 手动修复
  │   └─ 「暂停」→ 保存状态
  └─ Merge: git checkout master && git merge --no-ff feat/<name>
```

## Gate 确认模板

每个 Phase 结束后展示：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase N 完成: [阶段名]

[结果摘要]

请选择:
  1. 「确认，继续」→ 进入 Phase N+1
  2. 「需要修改」→ 说明要修改什么
  3. 「暂停」→ 保存状态，稍后继续
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 中断恢复

重新进入 pipeline 时：

```
1. 读 .claude/tmp/pipeline.state.json
2. 找 currentPhase → 从该 phase 继续
3. 检查该 phase 的 status:
   - "completed" → 跳到下一 phase
   - "in_progress" → 该 phase 重新执行（幂等安全）
   - "pending" → 从该 phase 开始
4. 如果所有 phase 都是 completed → "流水线已全部完成，无需重新执行"
```

## 全部完成

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Pipeline 全部完成

| Phase | 状态 | 产物 |
|-------|------|------|
| Spec  | ✅ | .claude/tmp/spec/xxx.md |
| Plan  | ✅ | .claude/tmp/plan/xxx.md |
| Code  | ✅ | feat/xxx 分支，N 个 commit |
| Verify| ✅ | 用户验收通过 |

下一步:
  git checkout master && git merge --no-ff feat/<name>
  或直接使用 pnpm dev 继续开发
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 回滚

```
「回滚到 Phase N」
  → pipeline.state 中，Phase N 及之后标记为 pending
  → 如果 Phase 3 已完成：
      git checkout <原分支>
      git branch -D feat/<name>
  → 从 Phase N 重新开始
```

## 注意事项

1. **每个 Phase 调用对应的独立 skill**，不重复实现逻辑
2. **Gate 必须等用户明确选择**，不做自动跳过
3. **pipeline.state.json 是恢复的关键**，每次 phase 状态变更都要即时写入
4. **Phase 3 期间不要手动改代码**，避免与 execute-plan 冲突
5. **如果用户拒绝某个 Phase 的产物 2 次以上**，主动询问是否是需求本身的问题，建议回到 Phase 1 重写 Spec
