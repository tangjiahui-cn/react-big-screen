/**
 * 拖拽大小
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RefObject, useEffect } from "react";
import { dragDirectionMapToCursor, dragMoveSize } from "@/packages/dragMove";
import globalCursor from "@/packages/globalCursor";
import engine from "@/engine";

interface SizeInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragSizeOptions {
  isSelected?: boolean; // 是否选中
  lock?: boolean; // 是否锁定
  onChange?: (sizeInfo: SizeInfo) => void; // 更新位置信息
}

export function useItemDragSize(domRef: RefObject<HTMLElement | null>, options: DragSizeOptions) {
  const { isSelected, lock, onChange } = options;

  useEffect(() => {
    if (!isSelected || lock) return;
    const dom = domRef.current;
    if (!dom) throw new Error("dom must be set.");
    let baseInfo: SizeInfo = {
      x: 0,
      y: 0,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
    };
    return dragMoveSize(dom, {
      onStart(direction) {
        // 修改全局光标
        globalCursor.set(dragDirectionMapToCursor[direction]);
        baseInfo = {
          x: dom.offsetLeft,
          y: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight,
        };
        dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      },
      onMove(moveInfo) {
        const width = baseInfo.width + moveInfo.dw;
        const height = baseInfo.height + moveInfo.dh;
        if (width < 0 || height < 0) return;
        onChange?.({
          x: baseInfo.x + moveInfo.dx,
          y: baseInfo.y + moveInfo.dy,
          height: Math.max(height, 0),
          width: Math.max(width, 0),
        });
      },
      onEnd() {
        // 恢复全局光标
        globalCursor.revoke();
      },
    });
  }, [isSelected, lock]);
}
