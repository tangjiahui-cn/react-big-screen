/**
 * ErrorBoundary（错误边界）
 *
 * @author tangjiahui
 * @date 2026/10/22
 */
import React from "react";

/** fallback 渲染函数入参 */
export interface ErrorBoundaryFallbackInfo {
  /** 捕获到的异常 */
  error: Error;
}

/** 错误边界入参 */
export interface ErrorBoundaryProps {
  /** 出错时展示的内容 */
  fallback?: React.ReactNode | ((info: ErrorBoundaryFallbackInfo) => React.ReactNode);
  /** 捕获异常时回调 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** 子树内容 */
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * 错误边界组件
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props?.onError?.(error, errorInfo);
  }

  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;
    if (!error) {
      return children;
    }
    if (typeof fallback === "function") {
      return fallback({ error });
    }
    return fallback ?? null;
  }
}
