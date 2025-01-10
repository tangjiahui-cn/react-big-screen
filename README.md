# Big-Screen

一个基于 React 的大屏看板 No-Code 搭建平台，用于快速验证原型。

> 状态：`开发中`

## 如何运行 
```shell
# 安装依赖（pnpm@16.20.1、pnpm@7.30.5）
pnpm i

# 运行
pnpm dev
```

## 特点 <font color="white" size="3">（开发中）</font> 

- 拖拽移动即可搭建页面。
- 自定义组件。
- 支持远程组件资产。
- 国际化语言。
- 自定义主题色。
- 快捷键。
- 收藏夹。
- 回退历史记录。
- 多组件联动。
- 批量处理。

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

## 相关项目
- [lowcode-engine](https://github.com/tangjiahui-cn/lowcode-engine)

## 开发计划

### v0.0.1 （进行中）
完成基本大屏功能，支持拖拽移动设计大屏页面，修改页面组件属性，并支持上传导入、导出，可预览。

- ✅ 基本布局
- ✅ 拖拽组件到页面创建
- 内置组件
- 组件 hover
- 组件 selected
- 组件 锁定/解锁
- 组件 拖拽移动/修改大小
- 编辑器 右键菜单禁用
- 组件右键菜单（复制、删除、上移一层、下移一层、置顶、置底）
- 完成页面右侧属性面板
- 完成预览页面
