/**
 * ErrorFallback（错误占位）
 *
 * @author tangjiahui
 * @date 2026/10/22
 */
import React from "react";
import styles from "./ErrorFallback.module.less";

/** 错误占位界面入参 */
export interface ErrorFallbackProps {
  /** 错误标题 */
  title: string;
  /** 捕获到的异常 */
  error: Error;
  /** 是否展示错误详情 */
  showMessage?: boolean;
  /** 附加操作区 */
  children?: React.ReactNode;
}

/**
 * 错误占位组件
 */
export default function ErrorFallback(props: ErrorFallbackProps) {
  const { title, error, showMessage = true, children } = props;
  const message = error instanceof Error ? error.message : String(error);
  return (
    <div className={styles.errorFallback}>
      <div className={styles.errorFallback_title}>{title}</div>
      {showMessage && (
        <div className={styles.errorFallback_message} title={message}>
          {message || "未知错误"}
        </div>
      )}
      {children && <div className={styles.errorFallback_actions}>{children}</div>}
    </div>
  );
}
