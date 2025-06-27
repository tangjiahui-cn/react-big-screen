/**
 * 自动滚动
 */
/** eslint-disable */
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./index.module.less";

export interface AutoScrollRefType {
  stopScroll: () => void;
  startScroll: () => void;
}

export interface AutoScrollProps {
  disabled?: boolean; // 禁止自动滚动（改为普通手动滚动）
  manual?: boolean; // 手动控制 startScroll stopScroll
  pxPerSecond?: number; // 每秒滚动像素
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  bodyInnerStyle?: React.CSSProperties;
  children?: React.ReactNode | ((isScroll: boolean) => React.ReactNode);
}

const AutoScroll = forwardRef((props: AutoScrollProps, ref: ForwardedRef<AutoScrollRefType>) => {
  const { disabled, pxPerSecond = 40, manual } = props;
  const containerRef = useRef<HTMLDivElement>(null); // 容器视图
  const innerRef = useRef<HTMLDivElement>(null); // 内部元素
  const [isCanScroll, setIsCanScroll] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);

  const renderChildren =
    typeof props?.children === "function" ? props?.children?.(isCanScroll) : props?.children;

  function stopScroll() {
    setIsPause(true);
  }

  function startScroll() {
    setIsPause(false);
  }

  useImperativeHandle(ref, () => ({
    stopScroll,
    startScroll,
  }));

  useEffect(() => {
    const containerHeight = Math.floor(containerRef.current!.getBoundingClientRect().height);
    const innerHeight = Math.floor(innerRef.current!.getBoundingClientRect().height);
    setIsCanScroll(innerHeight > containerHeight);
    setAnimationDuration((innerHeight / pxPerSecond) * 1000);
  }, [props?.children, props?.style, props?.className, pxPerSecond]);

  return (
    <div
      ref={containerRef}
      style={props?.style}
      className={classNames(props?.className, styles.autoScroll)}
      onMouseEnter={manual ? undefined : stopScroll}
      onMouseLeave={manual ? undefined : startScroll}
    >
      <div
        className={styles.autoScroll_inner}
        style={{
          overflow: disabled ? "auto" : "hidden",
          ...props?.bodyStyle,
        }}
      >
        <div
          className={classNames(
            !disabled && isCanScroll && styles.scroll,
            isPause && styles.scroll_paused,
          )}
          style={{
            left: 0,
            width: "100%",
            position: "absolute",
            animationDuration: `${animationDuration}ms`,
            ...props?.bodyInnerStyle,
          }}
        >
          <div ref={innerRef}>{renderChildren}</div>
          {!disabled && isCanScroll && <div>{renderChildren}</div>}
        </div>
      </div>
    </div>
  );
});

export default AutoScroll;
