# Terminology

本表约定本仓库的中英术语统一译法，适用于 `README.md` / `README.en.md`、`docs/` 与 `AGENTS.md`。

**通用规则：**
- "中文"列为中文译文的正文默认用词。若该列为英文，则中文译文的正文中保留英文不翻译。
- 首次出现按"首次出现"列书写（带括号注释）；后续出现只写括号前的部分（可能为中文，也可能为英文），不出现括号内的注释。
- "不要译作"列为严格禁止的译法。
- 如果某术语已经作为另一个术语的组成部分被括注过（如 `event contract（事件契约）` 中已包含 `event` 的括注），则该术语后续单独出现时无需再次括注。
- 行内代码、文件路径、命令与代码标识（如 `cId`、`useExpose`、`src/packages/`、`pnpm build:lib`）一律保持原样，不适用本表。
- 本表只约束文档。产品 UI 文案由 [src/i18n/locales/](../../src/i18n/locales/) 维护，与文档翻译无关。

## 缩写类（中英文文本中均使用缩写）

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| AI | AI | AI（人工智能） | 人工智能 | 指编辑器内的 AI 能力（如文生屏）；`src/packages/ai/` |
| API | API | | | |
| CI | CI | CI（持续集成） | | |
| CLI | CLI | CLI（命令行界面） | | |
| DOM | DOM | | | 三层模型禁止持久化的对象之一 |
| DSL | DSL | | | 整张大屏由统一的 JSON DSL 描述 |
| ESM | ESM | | | `pnpm build:lib` 的产物格式（`es/`） |
| i18n | i18n | | | 文档语境写 i18n；产品内是 UI 文案，见 `src/i18n/` |
| JSON | JSON | | | 大屏的唯一持久化载体 |
| PR | PR | PR（Pull Request） | | |
| SDK | SDK | | | 指 `RbsEngine` 对外提供的嵌入方式 |
| UI | UI | UI（界面） | | |
| UMD / AMD | UMD / AMD | | | 远程组件包的加载格式；写作 `UMD / AMD` |
| npm | npm | | NPM | 官方拼写全小写；`package.json` 字段保持原样 |
| pnpm | pnpm | | | 本仓库包管理器 |

## 英文类（中英文文本中均使用英文）

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| Component | Component | Component（组件） | 组件模板 | 三层模型的**模板层**：可注册进编辑器的组件，载体为渲染器 + 属性面板 + 事件契约。泛指界面组件或 React 组件时按「组件」翻译 |
| ComponentNode | ComponentNode | ComponentNode（组件节点） | 组件节点、节点、component node | 三层模型的**数据层**：编辑器唯一事实来源，随 JSON 持久化。英文文档不得写作 component nodes |
| Instance | Instance | Instance（行为实例） | 实例、组件实例 | 三层模型的**行为层**：运行时行为句柄，随组件挂载注册、卸载注销，不参与持久化。英文文档不得写作 component instances |
| cId | cId | | 组件 id、cid | 组件的唯一标识字段，大小写保持原样 |
| RbsEngine | RbsEngine | | | SDK 出口类，提供 `mount` / `importJSON` / `exportJSON` |
| store | store | store（全局 store） | 仓库、存储、状态库 | 编辑器全局状态容器，基于 Zustand |
| hook | hook | | 钩子 | React hook；函数名与文件名保持原样 |
| lint | lint | | | |
| Node | Node | | | 版本要求以 [package.json](../../package.json) 的 `engines` 为准 |
| React | React | React 18 | | |
| TypeScript | TypeScript | | TS、ts | 首次出现后可用 TS |
| Zustand | Zustand | | | 状态管理库，保持首字母大写 |
| IndexedDB | IndexedDB | | | 远程组件资源的缓存载体 |
| ECharts | ECharts | | | 图表组件的底层库 |
| antd | antd | | Ant Design、ant-design | 样式需外部引入 `antd/dist/antd.min.css` |
| Vite | Vite | | | 构建工具 |
| ESLint | ESLint | | | |
| Prettier | Prettier | | | 格式化一律交给 Prettier，不手动调整 |

## 双语类（中英文文本各自使用中英文）

### 三层模型与组件系统

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| three-layer model | 三层模型 | | | |
| template layer | 模板层 | | | 对应 Component |
| data layer | 数据层 | | | 对应 ComponentNode |
| behavior layer | 行为层 | | | 对应 Instance |
| component system | 组件系统 | | | |
| component contract | 组件契约 | | 组件协议 | 渲染器 + 属性面板 + 事件契约 |
| component template | 组件模板 | | | 仅指模板层，不指「内置组件」 |
| renderer | 渲染器 | | | 把数据层渲染到编辑器上 |
| property panel | 属性面板 | | 属性栏、配置面板 | 用于修改数据层 |
| component library | 组件库 | | 组件列表 | 左侧组件面板 |
| built-in component | 内置组件 | | 内建组件 | `src/engine/built-in/` |
| custom component | 自定义组件 | | | |
| container component | 容器组件 | | | 可作为其它组件的父 |
| remote component | 远程组件 | | | 以 UMD / AMD / zip 形式加载 |
| component package | 组件包 | | | 可注册进编辑器的组件集合 |
| editor package | 编辑器能力插件 | | 组件包 | `src/packages/` 下的能力插件；与组件包是两个概念 |
| component registration | 组件注册 | | | 注册会触发整页重渲染，推荐批量注册 |
| hot-pluggable | 热插拔 | | | 组件是可热插拔的资产 |
| component node | 组件节点 | | | 行文中指 ComponentNode 的实例化个体时使用；该标识本身保留英文 |
| panel | 面板 | | | 布局容器语境，对应 `panels` 字段 |
| layout | 布局 | | | |

### 编辑器交互能力

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| visual editor | 可视化编辑器 | | | |
| editor | 编辑器 | | | |
| edit mode | 编辑模式 | | | 对应 `RenderEditor` |
| preview mode | 预览模式 | | | 对应 `RenderPreview` |
| canvas | 画布 | | | |
| infinite canvas | 无限画布 | | | `src/packages/infiniteContainer/` |
| drag and drop | 拖拽 | | 拖放 | `src/packages/dragMove/` |
| resize | 缩放 | 缩放（resize） | 调整大小 | 改变**组件尺寸**。不得与 zoom 混用 |
| zoom | 画布缩放 | 画布缩放（zoom） | 缩放 | 改变**画布整体比例**。与 resize 严格区分 |
| box selection | 框选 | | 拖框选择 | 鼠标范围框选 |
| group | 成组 | | 分组、组合 | 与 ungroup 成对 |
| ungroup | 取消成组 | | 解组、拆分 | |
| alignment | 对齐 | | | |
| alignment guide | 辅助线 | | 参考线、对齐线 | |
| context menu | 右键菜单 | | 上下文菜单 | 本仓库统一用「右键菜单」 |
| keyboard shortcut | 快捷键 | | 热键 | |
| history record | 历史记录 | | 历史、历史栈 | 可撤销 |
| undo | 撤销 | | | |
| cancel undo | 取消撤销 | | 重做、反撤销 | 本仓库固定写「取消撤销」，不引入「重做」 |
| locked component | 锁定组件 | | | 按住强制键可选中锁定组件 |
| multi-page | 多页面 | | 多页签 | 仅渲染当前页面 |
| page management | 页面管理 | | | |
| adaptive | 自适应 | | 响应式 | 预览页按大屏比例缩放 |

### 事件与数据

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| event system | 事件系统 | | | |
| event channel | 事件通道 | | | 负责事件传输与数据处理 |
| event contract | 事件契约 | | | 显式声明 triggers / exposes |
| event relation | 事件关系 | | 事件链关系 | 存于源组件 ComponentNode，随 JSON 导入导出 |
| event chain | 事件链 | | | `trigger → expose` 链路 |
| trigger | 触发 | 触发（trigger） | | 声明「内部发生了什么」，契约字段为 `triggers` |
| expose | 暴露 | 暴露（expose） | | 声明「对外暴露了什么」，契约字段为 `exposes` |
| interaction | 联动 | 联动（interaction） | 交互 | 指**组件间**联动。属性面板的「交互」页签是 UI 文案，不属文档语境 |
| dependency inversion | 依赖倒置 | | | 关系由发起方持有，目标组件不持有引用 |
| pub/sub | 发布订阅 | 发布订阅（pub/sub） | 发布/订阅模式 | 复用编辑器内置发布订阅管理器（`BaseEvent`） |
| data system | 数据系统 | | | |
| data source | 数据源 | | 数据来源 | |
| static data | 静态数据 | | | |
| remote API data source | 远程 API 数据源 | | | |
| polling | 轮询 | | 轮训 | 源码注释曾误写作「轮训」，正文统一「轮询」 |
| data binding | 数据绑定 | | | |
| persistence | 持久化 | | | 仅手动导出时永久存储 |
| serialize | 序列化 | | | 状态层不混入不可序列化对象 |
| source of truth | 事实来源 | 唯一事实来源 | 真源 | 指 ComponentNode；「真源」仅用于术语真源（见下） |
| import | 导入 | | | |
| export | 导出 | | | |
| mount | 挂载 | | | `engine.mount()` |
| unmount | 卸载 | | 销毁 | 组件卸载；`engine.destroy()` 译为「卸载并清理」 |
| runtime | 运行时 | | | |
| embed | 嵌入 | | 内嵌 | 将编辑器或预览运行时嵌入宿主应用 |
| host application | 宿主应用 | | 主应用 | 引入 SDK 的 React 应用 |

### 文档与流程

| English | 中文 | 首次出现 | 不要译作 | 备注 |
|---|---|---|---|---|
| architecture doc | 架构文档 | | | [docs/architecture.md](../architecture.md) |
| bilingual documentation | 双语文档 | | | |
| pairing | 配对 | | | 中英两份 md 的对应关系 |
| counterpart | 对侧文件 | | 对应物、配对物 | 泛指「另一侧」时写「另一侧」 |
| language switcher | 语言切换行 | | | 文档顶部的 中文 / English 互链行 |
| terminology source of truth | 术语真源 | | 术语表真源 | 指本文件；单语维护，不参与配对 |
| scope | 范围 | | | 见 [README.md](./README.md) |
| typecheck | 类型检查 | | | `npx tsc -b`；命令语境保留 `typecheck`，行文写「类型检查」 |
| commit | 提交 | | 签入 | |
