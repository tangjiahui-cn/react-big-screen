# AGENTS.md

React-Big-Screen 是一个从0到1设计的 React 可视化编辑器。修改 `/src` 目录前，请读取 [docs/architecture.md](docs/architecture.md)。

## 仓库结构

```
src/
  engine/      编辑器内核：三层模型（Component / ComponentNode / Instance）、全局 store、
               hooks、内置组件注册（built-in/）
  export/      SDK 出口：RbsEngine 类、RenderEditor（编辑态）与 RenderPreview（预览态）
  pages/       编辑器外壳 UI（Header / Menu / Attributes / Editor / Footer）与独立预览页
  packages/    编辑器能力插件（非组件包）：拖拽、历史记录、快捷键、右键菜单、请求、无限画布等
  components/  通用 UI 组件（属性面板表单控件、图表容器等）
  i18n/        国际化（zh / en），语言配置随 JSON 持久化
  router/      Hash 路由
  utils/       工具函数（模块加载、下载、路由、示例 JSON 等）
  static/      内置组件图标（仅 PNG，无代码）
config/        构建配置：vite.base.ts、vite.buildESM.ts、external 依赖判定
public/        示例 JSON（example/）与远程组件示例（demo.umd.js / demo.amd.js）
docs/          架构文档
script/        发布脚本
```

注意：`src/packages/` 与 `src/engine/built-in/` 是两个不同的概念。前者是编辑器自身的能力插件，后者才是可注册进编辑器的**组件**（组件包）。详见下文。

## 常用命令

```sh
pnpm install            # 安装依赖（Node ^22 || >=24，pnpm 11.26）
pnpm dev                # 启动开发服务器，默认 http://localhost:11000
pnpm build              # 构建独立编辑器（tsc -b && vite build），产物 dist/
pnpm build:lib          # 构建对外发布的 ESM SDK + 类型声明，产物 es/ 与 types/
pnpm build:analyzer     # 构建并输出体积分析报告
pnpm lint               # eslint 全量检查
pnpm preview            # 预览 dist/ 构建产物
pnpm commit             # git add . + commitizen 交互式提交
```

## 如何测试

本项目没有配置任何测试框架——没有 test 脚本，没有 vitest / jest 依赖，也没有测试文件，因此不存在「运行单个测试」的命令。验证手段只有：

- npx tsc -b —— 类型检查，提交钩子会自动执行。
- pnpm lint —— 全量 eslint。
- pnpm build / pnpm build:lib —— 改动 export/ 或 config/ 时，确认构建通过。

## 项目风格

- 代码风格见 [.eslintrc.js](.eslintrc.js)、[.prettierrc](.prettierrc)、[.editorconfig](.editorconfig)。
- 格式化交给 prettier，不要手动调整缩进与换行。
- lint / format 的忽略清单见 [.eslintignore](.eslintignore) 与 [.prettierignore](.prettierignore)。

## 文档翻译

创建或修改 md 文件、做中英翻译时，遵循 [docs/i18n/README.md](docs/i18n/README.md)。

产品 UI 的国际化见 src/i18n/，与本节的文档翻译无关。

## git 提交

执行任何 git 提交前，必须先读取并遵循 [docs/git-commit.md](docs/git-commit.md)。

硬性要求：提交信息不得出现任何第三方 AI agent 的归属标识。
