/**
 * 鼠标经过下拉项
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import React, { HTMLAttributes, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.less";
import RenderList from "@/contextMenu/components/RenderList";
import type { RenderListItem } from "../RenderList";
import engine from "@/engine";

interface HoverItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: RenderListItem[]; // 选项列表
  onSelect?: (item: RenderListItem) => void; // 选中元素
}

const INIT_POSITION = {
  top: 0,
  left: 0,
};
export default function HoverItem(props: HoverItemProps) {
  const { children, items, onSelect, ...rest } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>(INIT_POSITION);

  function enter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props?.onMouseEnter?.(e);
    if (!items?.length) {
      return;
    }
    const rect = (e.target! as HTMLDivElement)?.getBoundingClientRect?.();
    if (!rect) {
      return;
    }
    setPosition({ top: rect.top, left: rect.left + rect.width });
    setVisible(true);
  }

  function leave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props?.onMouseLeave?.(e);
    setVisible(false);
  }

  return (
    <div {...rest} onMouseEnter={enter} onMouseLeave={leave}>
      {children}
      {visible &&
        createPortal(
          <div
            className={styles.hoverItem_overlay}
            style={{
              top: position.top,
              left: position.left,
              zIndex: engine.componentNode.getMaxLevel(),
            }}
          >
            <RenderList
              items={items}
              onSelect={(item) => {
                onSelect?.(item);
              }}
            />
          </div>,
          document.body!,
        )}
    </div>
  );
}
