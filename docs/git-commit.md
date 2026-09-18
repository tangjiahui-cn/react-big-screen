# git 提交

当 agent 使用 git 提交时，阅读此文档。

## commit message

生成 commit message 前，必须阅读并遵循以下阅读：

- 读取 “禁止出现 AI 归属标识” 文档: [git-commit-ai-attribution.md](./git-commit-ai-attribution.md)
- 必须使用 `git add .` 添加文件到暂存区后，才允许生成 生成 commit message。


### 内容格式

采用 Conventional Commits：

```text
<type>(<scope>): <subject>
```

字段说明：

- `type`：必填，变更类型，取值见下表。
- `scope`：可选，影响范围，如模块名、文件名。
- `subject`：必填，一句话描述变更，不加句号。必须为中文。

type取值：

| type | 含义 |
| --- | --- |
| `feat` | 新增功能 |
| `fix` | 修复缺陷 |
| `docs` | 文档变更 |
| `style` | 格式调整，不影响代码逻辑 |
| `refactor` | 重构，不新增功能也不修缺陷 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `build` | 构建系统或依赖变更 |
| `ci` | CI 配置变更 |
| `chore` | 其他杂项 |
| `revert` | 回滚提交 |

破坏性变更在 `type` 后加 `!`（`feat!: 移除旧版 API`）。

### 硬性约束

| 规则 | 说明 |
| --- | --- |
| 提交信息只有一行 | 只写 header，不得出现 `body` 与 `footer` |
| header 总长 ≤ 100 字符 | `type`、`scope`、`subject` 与冒号空格一并计入；中文按 1 字符计，长句需手动折行 |
| `type` 小写，且在上表取值内 | 见上方 type 表 |
| `subject` 不得以句号结尾 | 英文句点 `.` 与中文句号 `。` 都不加 |
| `subject` 不得为首字母大写 | 覆盖 sentence-case / start-case / pascal-case / upper-case |

补充说明：

- `scope` 大小写不限，也无取值枚举，`docs(CHANGELOG.md): update changelog` 合法。
- 「`subject` 必须为中文」只约束 agent 生成的提交。仓库的 `pnpm publish-npm` 会提交 `docs(.): publish version <版本号>`、`docs(CHANGELOG.md): update changelog` 这类英文提交，属该流程的固定输出，不需要"修正"。

### 示例

合规格：

```text
feat: 新增图层拖拽吸附能力
```

```text
fix(engine): 修复画布缩放偏移
```

不合规：

```text
# 写了 body
feat: 新增图层拖拽吸附能力

按住 Alt 拖动时关闭吸附。

# 写了 footer
fix: 修复画布缩放偏移

Closes #42

# 缺少 type
优化了渲染性能

# subject 以英文句点结尾
fix: 修复画布缩放偏移.

# header 超过 100 字符
feat: <一行超过 100 个字符的 subject>

# 英文 subject 首字母大写
feat: Add login flow
```
