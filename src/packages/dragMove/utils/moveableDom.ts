/**
 * 拖拽节点位移
 *
 * @author tangjiahui
 * @date 2025/1/9
 */
import { isClickMouseLeft } from "@/utils/mouse";

interface moveableDomOptions {
  onStart?: (e: MouseEvent) => void; // 开始移动
  onMove?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动中
  onEnd?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动结束
}

type UnmountMoveableDom = () => void;

export function moveableDom(dom: HTMLElement, options: moveableDomOptions): UnmountMoveableDom {
  let moveInfo = {
    startX: 0,
    startY: 0,
    isMoving: false,
  };

  function mousedown(e: MouseEvent) {
    // 只能点击鼠标左键开始移动
    if (!isClickMouseLeft(e)) {
      return;
    }
    moveInfo.isMoving = true;
    moveInfo.startX = e.x;
    moveInfo.startY = e.y;
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
    options?.onStart?.(e);
  }

  function mousemove(e: MouseEvent) {
    const deltaX = e.x - moveInfo.startX;
    const deltaY = e.y - moveInfo.startY;
    options?.onMove?.(deltaX, deltaY, e);
  }

  function mouseup(e: MouseEvent) {
    const deltaX = Math.round(e.x - moveInfo.startX);
    const deltaY = Math.round(e.y - moveInfo.startY);
    options?.onEnd?.(deltaX, deltaY, e);
    clear();
  }

  function clear() {
    if (moveInfo.isMoving) {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
      moveInfo.isMoving = false;
    }
  }

  dom.addEventListener("mousedown", mousedown);
  return () => {
    clear();
    dom.removeEventListener("mousedown", mousedown);
  };
}
