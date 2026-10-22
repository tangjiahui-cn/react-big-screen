# 前端代码注释规则

## 格式

- 文档注释统一使用 JSDoc：单行写 `/** 内容 */`；多行首行 `/**`、中间每行以 ` * ` 开头、尾行 ` */`。
- 注释结尾不加句号等标点。
- 禁止用 `//` 写文档注释。

## 注释范围

- 必须注释：导出的函数、组件、类型/接口整体、公共字段、有副作用的内部函数。
- 不必注释：自解释的局部变量、简单赋值、显而易见的循环和条件。
- 禁止给每个字段都机械加注释；字段名已能表达含义时不写。

## 内容要求

- 注释只回答“是什么”：职责、用途。
- 字段注释一句话，只写字段含义，不写默认值、取值约束、使用场景，也不解释为什么需要它。
- 组件、函数注释一句话说明职责，不展开执行过程、动机与效果。
- 文件头只写名称与作者、日期，不写模块职责说明。
- 参数、返回值、异常仅在无法从签名与命名判断时，用 `@param`、`@returns`、`@throws` 补充一句。
- 仅当存在代码无法表达的硬约束（调用顺序、不可逆副作用、外部协议限制）时，额外补一句约束；其余情况不写。

## 禁止事项

- 不写动机、背景、收益、后果类说明（如“避免白屏”“提升可维护性”）。
- 不写使用教程、调用示例、适用场景。
- 不写与代码重复的注释。
- 不写“TODO 以外”的临时说明；TODO 必须带负责人或 issue 链接。
- 不写被注释掉的废弃代码，直接删除。
- 不写表情符号、口语化表达、无信息量的修饰语。

## 示例

正确：

```ts
/**
 * ErrorBoundary（错误边界）
 *
 * @author tangjiahui
 * @date 2025/1/7
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {}

/** 错误边界入参 */
export interface ErrorBoundaryProps {
  /** 出错时展示的内容 */
  fallback?: React.ReactNode;
  /** 是否展示错误详情 */
  showMessage?: boolean;
}

/**
 * 错误占位组件
 */
export function ErrorFallback(props: ErrorFallbackProps) {}
```

错误：

```ts
/**
 * 错误边界。
 * 捕获子树渲染期异常，隔离单个组件的错误，避免整页白屏。
 */
export interface ErrorBoundaryProps {
  /** 出错时展示的内容；不传时不渲染任何内容 */
  fallback?: React.ReactNode;
  /** 捕获异常时回调，用于带上下文的上报与日志 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
```
