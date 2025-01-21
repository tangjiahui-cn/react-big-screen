/**
 * 定位遮罩层
 *
 * @author tangjiahui
 * @date 2025/1/8
 */
import React, { useEffect, useRef } from "react";
import { useIsVirtualDragging, useVirtualDrop } from "../../../../../packages/virtual-drag";
import engine, { useGlobalSelector } from "@/engine";
import classNames from "classnames";
import styles from "./index.module.less";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function EditorMask(props: Props) {
  const domRef = useRef<HTMLDivElement>(null);
  const isVirtualDragging = useIsVirtualDragging({
    accept: ["create-component"],
  });

  // 全局运行时dragging
  const runtimeDragging = useGlobalSelector((state) => state.runtime.isDragging);
  useEffect(() => {
    if (!runtimeDragging || !domRef.current) return;
    domRef.current.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
  }, [runtimeDragging]);

  useVirtualDrop(domRef, {
    accept: ["create-component"],
    onDrop: (e: MouseEvent, dragOptions) => {
      const dom = domRef.current;
      if (!dom) {
        console.error("dom must be exist.");
        return;
      }
      const { data } = dragOptions;
      const component = data?.component;
      if (!component) {
        return;
      }
      // 创建一个componentNode
      const componentNode = engine.componentNode.createFromComponent(data.component, {
        x: Math.round(e.layerX || 0),
        y: Math.round(e.layerY || 0),
      });
      // 插入新componentNode到末尾
      engine.componentNode.add(componentNode);
      // 设置遮罩层的zIndex
      dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;

      setTimeout(() => {
        // 选中新增的组件
        engine.instance.select(componentNode.id, true);
      });
    },
  });

  return (
    <div
      ref={domRef}
      style={props?.style}
      className={classNames(
        props?.className,
        styles.editorMask,
        (runtimeDragging || isVirtualDragging) && styles.editorMask_show,
      )}
    />
  );
}
