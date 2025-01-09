/**
 * 定位遮罩层
 *
 * @author tangjiahui
 * @date 2025/1/8
 */
import React, { useRef } from "react";
import { useIsDragging, useVirtualDrop } from "@/virtual-drag";
import engine from "@/engine";
import classNames from "classnames";
import styles from "./index.module.less";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function EditorMask(props: Props) {
  const domRef = useRef<HTMLDivElement>(null);
  const isDragging = useIsDragging({
    accept: ["create-component"],
  });

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
        x: e.layerX,
        y: e.layerY,
      });
      // 插入新componentNode到末尾
      engine.componentNode.insertComponentNode(componentNode);
      // 设置遮罩层的zIndex
      dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;

      setTimeout(() => {
        // 选中新增的组件
        engine.instance.getInstance(componentNode.id)?.handleSelected?.();
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
        isDragging && styles.editorMask_show,
      )}
    />
  );
}
