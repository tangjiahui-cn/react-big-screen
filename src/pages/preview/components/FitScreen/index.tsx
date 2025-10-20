/**
 * 大屏适配容器
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import React, { useMemo, useRef } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { useResizeDom } from "@/hooks";

export interface FitScreenProps {
  dw?: number; // 设计宽度
  dh?: number; // 设计高度
  className?: string;
  children?: React.ReactNode;
  bodyClassName?: string;
  bodyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

export default function FitScreen(props: FitScreenProps) {
  const { dw = 1920, dh = 1080 } = props;
  const containerDomRef = useRef<HTMLDivElement>(null);
  const domRef = useRef<HTMLDivElement>(null);
  const widthHeightRate = useMemo(() => dw / dh, [dw, dh]);

  function handleResize() {
    if (!containerDomRef.current || !domRef.current) {
      return;
    }
    const containerRect = containerDomRef.current.getBoundingClientRect();
    const containerWidthHeightRate = containerRect.width / containerRect.height;
    if (containerWidthHeightRate > widthHeightRate) {
      // 高度对齐
      const scale = containerRect.height / dh;
      const width = scale * dw;
      // 子元素距离左侧距离
      const left = (containerRect.width - width) / 2;
      domRef.current.style.transform = `scale(${scale}) translate3d(${left / scale}px, 0, 0)`;
    } else {
      // 宽度对齐
      const scale = containerRect.width / dw;
      domRef.current.style.transform = `scale(${scale})`;
    }
    domRef.current.style.width = `${dw}px`;
    domRef.current.style.height = `${dh}px`;
  }

  useResizeDom(containerDomRef, () => {
    handleResize();
  });

  React.useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className={props?.className} ref={containerDomRef} style={props?.style}>
      <div
        className={classNames(props?.bodyClassName, styles.fitScreenBody)}
        style={props?.bodyStyle}
        ref={domRef}
      >
        {props?.children}
      </div>
    </div>
  );
}
