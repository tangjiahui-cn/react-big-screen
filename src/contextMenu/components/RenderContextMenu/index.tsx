/** 渲染右键菜单 */
import { useEffect, useRef } from "react";
import styles from "./index.module.less";
import RenderList, { RenderListItem } from "../RenderList";

export type { RenderListItem };

interface ContextMenuProps {
  items?: RenderListItem[]; // 选项列表
  onSelect?: (item: RenderListItem) => void; // 选中元素
  onClickOuter?: () => void; // 点击元素之外
}

export default function RenderContextMenu(props: ContextMenuProps) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 判断是否点击了元素之外
    function click(e: MouseEvent) {
      if (!domRef.current?.contains?.(e.target as any)) {
        props?.onClickOuter?.();
      }
    }
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("click", click);
    };
  }, []);

  return (
    <div
      ref={domRef}
      tabIndex={0}
      className={styles.renderContextMenu}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <RenderList
        items={props?.items}
        onSelect={(item) => {
          props?.onSelect?.(item);
        }}
      />
    </div>
  );
}
