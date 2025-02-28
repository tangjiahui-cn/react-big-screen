# React-Big-Screen

一个使用 React 框架实现的 `前端大屏拖拽平台`，只需要简单的拖拽、配置即可设计出不错的大屏页面。

> 状态：`开发中`

## 在线预览
[https://tangjiahui-cn.github.io/react-big-screen](https://tangjiahui-cn.github.io/react-big-screen)

## 功能 <font color="white" size="3">（开发中）</font> 

- ✅ 拖拽移动、缩放。
- ✅ 快捷键。
- ✅ 批量处理组件。
- ✅ 自定义新组件。
- ✅ 自定义组件属性配置面板。
- ✅ 自定义组件右键菜单。
- ✅ 鼠标范围框选。
- ✅ 支持预览页面。
- ✅ 成组/取消成组。
- ✅ 布局容器组件。
- ✅ 属性配置面板（属性、数据、交互）。
- ✅ 多组件联动。
- ✅ 支持远程组件包。
- ✅ 收藏夹。
- ✅ i18n 国际化语言。
- ✅ 支持多子页面切换。
- 可撤销历史记录。

## 设计理念

`数据`与`逻辑`分离。

## 核心概念

读取 `json格式对象`，将`components`与`componentNodes`合并渲染到页面，渲染过程中注册`instance`，编辑器通过修改 `componentNodes` 生效变更。

- engine: 全部api的集合，统一管理所有的功能。
- component: 注册的组件模板。
- componentNode: 组件的数据实例，也是完整导出、保存的数据。
- instance: 组件运行时的行为实例，管理单个组件所有的内部行为。
- store：存储全局数据（不做复杂action，仅用作响应式变量触发引用位置更新）。
- 实例：等于component + componentNode + instance。

## dom 事件
点击事件只涉及到: `click`、`mousedown`、`mousemove`、`mouseup`。

## 多组件联动

自己单独实现了一套事件机制。`component`中声明了暴露事件列表`exposes`、触发事件列表`triggers`。

- `exposes` 是暴露给外界，用来调用内部事件的端口。
- `triggers` 是声明内部可以触发的事件，用来在 \[属性面板-交互\] 中读取该列表进行配置与其他组件联动。

关于组件内部使用？

在 `props` 中获取 `useExpose`、`handleTrigger`。通过 `useExpose` 去定义运行时暴露的事件行为，`handleTrigger` 去触发内部事件的执行。

## 远程组件

通过远程组件功能，可以拥有个人资产。

> 在 `src/common-module.ts` 文件中配置公共模块配置，以此减小远程组件包体积。

加载方式：
- 本地上传
- 远程URL

支持格式：

- 支持 UMD 模块包。
- 支持 AMD 模块包。
- 支持 .zip 压缩包。

## 容器组件

容器包含很多个面板，通过切换不同面板，实现显隐不同组件的效果。

主要关注 `componentNode` 的三个属性：`panels`、`currentPanelId`、`panelId`。

- panels：当前容器组件所包含的全部面板（panel是容器的一个面板）。
- currentPanelId：当前容器组件展示的面板 panel 的 id。
- panelId: 所属父容器 panels 中某个面板的id。

若开发一个容器组件，只需要组件内部修改 `panels`、`currentPanelId` 即可，`panelId` 是引擎自动绑定的。

核心API：
- engine.componentNode.hidePanel：隐藏一个面板全部子组件
- engine.componentNode.showPanel：显示一个面板全部子组件

## 自定义组件

开发自定义组件，只需要3步：
- 定义一个 `ComponentType` 对象。
- 使用 `createComponent` 创建一个模板组件。
- 使用 `createAttributes` 创建一个属性配置项组件。

示例：

```tsx
import engine, { ComponentType, createComponent, createAttributes } from '@/engine';

// 配置属性值类型
interface Options {
  value: string; // 值
}

// 模板组件
const Component = createComponent<Options>(props => {
  const { options, width, height } = props;
  return (
    <div style={{ width, height }}>
      {options?.value}
    </div>
  )
})

// 属性配置组件
const Attributes = createAttributes<Options>(props => {
  const { options, onChange } = props;
  return (
    <div>
      <input
        value={options?.value}
        onChange={e => onChange({ value: e.target.value })}
      />
    </div>
  )
})

// 注册组件
engine.component.register({
  cId: 'demo-text', // 组件id（必填、唯一）
  cName: 'demo-文字', // 组件名称
  x: 0, // 初始 x
  y: 0, // 初始 y
  width: 200, // 初始宽度
  height: 32, // 初始高度
  component: Component, // 模板组件
  attributesComponent: Attributes, // 属性配置组件
})
```

## 相关项目
- [lowcode-engine](https://github.com/tangjiahui-cn/lowcode-engine)

## 本地调试
```shell
# 安装依赖（pnpm@16.20.1、pnpm@7.30.5）
pnpm i

# 运行
pnpm dev
```

## 开发日志

### v0.0.1 （进行中）
完成基本大屏功能，支持拖拽移动设计大屏页面，修改页面组件属性，并支持上传导入、导出，可预览。

- ✅ 基本布局
- ✅ 拖拽组件到页面创建
- ✅ 内置几种类型组件
- ✅ 选中组件/范围框选
- ✅ 组件锁定/解锁
- ✅ 拖拽移动/缩放
- ✅ 编辑器 右键菜单禁用
- ✅ 组件右键菜单（复制、删除、上移一层、下移一层、置顶、置底）
- ✅ 完成页面右侧属性面板 (属性、数据、交互，共 3 类配置面板)
- ✅ 完成预览页面
- ✅ 成组/取消成组
- ✅ 布局容器组件
- ✅ 缓存请求
- ✅ 多组件联动
- ✅ 上传本地 / 加载远程组件包
- ✅ 收藏夹
- ✅ 页面组件列表
- ✅ 自定义组件
- ✅ i18n 国际化语言。
- ✅ 支持多子页面切换。
- 可撤销历史记录。
