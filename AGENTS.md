# AGENTS.md

React-Big-Screen 是一个从0到1设计的 React 可视化编辑器。

## 硬性规则

- 执行任何操作前，必须读取并遵循 [docs/principles.md](docs/principles.md)。
- 修改 `/src` 目录前，必须读取 [docs/architecture.md](docs/architecture.md)。

## 仓库结构

```
src/
  engine/      编辑器内核：三层模型（Component / ComponentNode / Instance）、全局 store、
               hooks、内置组件注册（built-in/）
  export/      SDK 出口：RbsEngine 类、RenderEditor（编辑态）与 RenderPreview（预览态）
  pages/       编辑器外壳 UI（Header / Menu / Attributes / Editor / Footer）与独立预览页
  packages/    编辑器能力插件（非组件包）：拖拽、历史记录、快捷键、右键菜单、请求、无限画布等
  components/  通用 UI 组件（属性面板表单控件、图表容器等）
  hooks/       通用 React hooks，无内核依赖（引擎内核的 hooks 在 engine/hooks/）
  i18n/        国际化（zh / en），语言配置随 JSON 持久化
  router/      Hash 路由
  utils/       工具函数（模块加载、下载、路由、示例 JSON 等）
  static/      内置组件图标（仅 PNG，无代码）
  common-module.ts
               公共模块：React / ReactDOM / antd 的预置引用，改动影响打包体积
config/        构建配置：vite.base.ts、vite.buildESM.ts、external 依赖判定
public/        示例 JSON（example/）与远程组件示例（demo.umd.js / demo.amd.js）
docs/          存放架构、Agent 原则与 git 提交规范
scripts/       发布脚本与 git 钩子脚本
```

注意：`src/packages/` 与 `src/engine/built-in/` 是两个不同的概念。前者是编辑器自身的能力插件，后者才是可注册进编辑器的**组件**（组件包）。

## 常用命令

```sh
pnpm install            # 安装依赖（Node >=22，pnpm 11.26）
pnpm dev                # 启动开发服务器，默认 http://localhost:11000
pnpm build              # 构建独立编辑器（tsc -b && vite build），产物 dist/
pnpm build:github-page  # 构建 release 分支的部署产物（GitHub Pages 与远程服务器共用）
pnpm build:lib          # 构建对外发布的 ESM SDK + 类型声明，产物 es/ 与 types/
pnpm build:analyzer     # 构建并输出体积分析报告（build-analysis:esm 是 SDK 版）
pnpm lint               # eslint 全量检查
pnpm preview            # 预览 dist/ 构建产物
pnpm commit             # git add . + commitizen 交互式提交
pnpm publish-npm        # 发布到 npm（校验登录 → build:lib → publish.sh）
```

## 如何测试

测试框架只覆盖 `scripts/` 下的脚本：vitest，配置见 [vitest.config.mts](vitest.config.mts)，测试文件与被测脚本同目录（如 `scripts/verify-ai-attribution.test.ts`）。`src/` 是浏览器应用，目前没有任何测试，也就没有跑它的命令。

```sh
pnpm test                                        # 全量运行
pnpm test:watch                                  # 监听模式
pnpm test scripts/verify-ai-attribution.test.ts  # 只跑某个测试文件
pnpm test -t "reports the 1-based line number"   # 只跑名字匹配的用例
```

其余验证手段：

- npx tsc -b —— 类型检查，提交钩子会自动执行。`scripts/` 在 tsconfig 的 include 内，测试文件同样被检查。
- pnpm lint —— 注意：`eslint .` 走 eslint 8 的默认扩展名，实际只覆盖 .js 文件，`scripts/` 与 `src/` 的 .ts/.tsx 并不在其中；.ts 只在提交时由 lint-staged 按显式路径校验。
- pnpm build / pnpm build:lib —— 改动 export/ 或 config/ 时，确认构建通过。

## 项目风格

- 代码风格见 [.eslintrc.js](.eslintrc.js)、[.prettierrc](.prettierrc)、[.editorconfig](.editorconfig)。
- 格式化交给 prettier，不要手动调整缩进与换行。
- lint / format 的忽略清单见 [.eslintignore](.eslintignore) 与 [.prettierignore](.prettierignore)。

## 文档语言

文档默认中文：`{name}.md` 即中文正文，不再有 `.zh.md` 后缀，也不再有配对清单与校验脚本。

唯一例外是 [README.en.md](README.en.md)——它是 npm / GitHub 门面上的英文版，与中文 [README.md](README.md) 互为语言切换行。其余文档只维护中文，不要创建英文副本。

产品 UI 的国际化见 src/i18n/，与本节的文档语言无关。

## git 提交

执行任何 git 提交前，必须先读取并遵循 [docs/git-commit.md](docs/git-commit.md)。

硬性要求：提交信息不得出现任何第三方 AI agent 的归属标识。
