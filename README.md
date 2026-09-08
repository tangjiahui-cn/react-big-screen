<h1 align="center">react-big-screen</h1>

<p align="center">一个用于搭建 React 数据大屏的拖拽式可视化编辑器 —— 既可独立使用，也可作为 ESM SDK 嵌入你的应用。</p>

<p align="center">
  <a href="./README.md">简体中文</a> | <a href="./README.en-US.md">English</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-big-screen"><img src="https://img.shields.io/npm/v/react-big-screen?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/tangjiahui-cn/react-big-screen"><img src="https://img.shields.io/github/stars/tangjiahui-cn/react-big-screen?style=flat-square" alt="GitHub stars"></a>
  <a href="https://tangjiahui-cn.github.io/react-big-screen"><img src="https://img.shields.io/badge/demo-online-0891B2?style=flat-square" alt="在线 demo"></a>
  <img src="https://img.shields.io/badge/React-18-3776AB?style=flat-square" alt="React 18">
</p>

react-big-screen 是一个基于 React 18 的可视化大屏编辑器，通过拖拽、配置组件即可快速搭好一张数据大屏。它有两种使用方式：

- **独立编辑器**：在画布上可视化搭好页面后，直接预览或分享运行结果。
- **可嵌入 SDK**：整张大屏由一份 JSON 驱动，通过 `RbsEngine` 对外暴露，可将编辑器或运行时页面嵌入到你自己的 React 项目中。

## 界面截图

编辑模式：

<img src="./imgs/edit.png" height="200" alt="react-big-screen 编辑画布">

预览模式：

<img src="./imgs/preview.png" height="200" alt="react-big-screen 预览页">

## 核心功能

- ✅ 拖拽系统
- ✅ 成组、取消成组
- ✅ 鼠标范围框选
- ✅ 右键菜单
- ✅ 快捷键
- ✅ 多组件联动
- ✅ 多页面管理
- ✅ 自定义组件
- ✅ 自定义属性面板
- ✅ 自适应预览页
- ✅ 容器组件
- ✅ 辅助线
- ✅ 加载远程组件
- ✅ i18n国际化
- ✅ 可撤销历史记录
- ✅ 导入、导出文件
- ✅ 支持 SDK 引用

更多能力详见源码。

## 核心设计

| 设计     | 说明                                                                                  |
|--------|-------------------------------------------------------------------------------------|
| DSL 驱动 | 整张大屏由统一的 JSON DSL 描述页面结构、组件配置、数据绑定与组件间事件关系，编辑器与预览运行时共享同一份页面文档模型                     |
| 组件系统   | 通过组件注册机制扩展编辑器能力，支持自定义组件、自定义属性面板、容器组件及远程组件。                                          |
| 事件系统   | 通过 `trigger → expose` 事件链实现组件间联动，组件无需直接依赖其它组件实例。                                    |
| 数据系统   | 每个组件可独立绑定静态数据或远程 API 数据源，并支持轮询刷新。                                                   |
| 编辑器能力  | 拖拽、缩放、框选、成组、对齐、快捷键和历史记录等能力围绕组件节点统一工作。                                               |
| 多页面模型  | 一个大屏可包含多个子页面，仅渲染当前页面，其余页面保留文档数据而不参与渲染。                                              |
| 远程组件   | 支持加载 UMD / AMD / zip 组件包，并使用 IndexedDB 缓存远程组件资源。                                    |
| SDK 嵌入 | 通过 `RbsEngine` 暴露 `mount`、`importJSON`、`exportJSON` 等能力，可将完整编辑器或预览运行时嵌入其它 React 应用。 |

## 架构

```text
┌───────────────────────────────────────────────┐
│              Host React application           │
│   import { RbsEngine } from "react-big-screen"│
└───────────────────────┬───────────────────────┘
                        │
              mount · importJSON · exportJSON
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             RbsEngine — SDK layer             │
│   edit mode (RenderEditor) / preview mode     │
│                (RenderPreview)                │
│                                               │
│   ┌──────────── Engine core ──────────────┐   │
│   │ Component templates · ComponentNode   │   │
│   │ data · runtime instances · Config     │   │
│   └───────────────────────────────────────┘   │
│   ┌────────── Editor packages ────────────┐   │
│   │ dragMove · resize · alignGuide        │   │
│   │ contextMenu · historyRecord · keys    │   │
│   └───────────────────────────────────────┘   │
└───────────────────────┬───────────────────────┘
                        │  JSON in/out · events
                        ▼
┌───────────────────────────────────────────────┐
│      State layer                              │
│   Zustand stores · BaseEvent pub/sub          │
│   IndexedDB (remote component cache)          │
└───────────────────────────────────────────────┘
```

## 使用示例

```tsx
import { useEffect, useRef } from "react";
import { EXAMPLE, RbsEngine } from "react-big-screen";
import "antd/dist/antd.min.css";
import "react-big-screen/es/style.css";

export default function Screen() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = new RbsEngine(); // 默认编辑模式
    engine.mount(hostRef.current!).then(() => {
      engine.importJSON(EXAMPLE.classic); // 渲染示例大屏
    });

    return () => {
      engine.destroy(); // 卸载并清理
    };
  }, []);

  return <div ref={hostRef} style={{ width: "100vw", height: "100vh" }} />;
}
```

以上会挂载完整编辑器并载入示例大屏。如需只读的运行画面，请在 `mount()` / `importJSON()` 之前调用 `engine.enablePreview()`。

## 快速安装

```shell
pnpm add react-big-screen
```

运行环境：Node 20+、React 18。在应用中一次性引入所需样式：

```tsx
import "antd/dist/antd.min.css";
import "react-big-screen/es/style.css";
```

## 快速开始

最快体验方式是在线编辑，无需安装：

- 在线体验：[https://tangjiahui-cn.github.io/react-big-screen](https://tangjiahui-cn.github.io/react-big-screen)
- 功能 demo（多组件联动）：[打开示例](https://tangjiahui-cn.github.io/react-big-screen/#/create?example=multiple-components-interactive)

本地运行完整编辑器：

```shell
git clone https://github.com/tangjiahui-cn/react-big-screen.git
cd react-big-screen
pnpm install
pnpm dev
```

开发服务器默认运行在 http://localhost:11000。

## 社区与支持

- 作者大屏原理系列专栏：[前端大屏原理系列（掘金）](https://juejin.cn/column/7492086179995811855)
- 反馈问题或提需求：[GitHub Issues](https://github.com/tangjiahui-cn/react-big-screen/issues)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=tangjiahui-cn%2Freact-big-screen&type=Date)](https://star-history.com/#tangjiahui-cn/react-big-screen&Date)
