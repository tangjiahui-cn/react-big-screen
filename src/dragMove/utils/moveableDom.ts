/**
 * 拖拽节点位移
 *
 * @author tangjiahui
 * @date 2025/1/9
 */
import { isClickMouseLeft } from "@/utils/mouse";

interface moveableDomOptions {
  onStart?: () => void; // 开始移动
  onMove?: (deltaX: number, deltaY: number) => void; // 移动中
  onEnd?: (deltaX: number, deltaY: number) => void; // 移动结束
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
    moveInfo.startX = e.clientX;
    moveInfo.startY = e.clientY;
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
    options?.onStart?.();
  }

  function mousemove(e: MouseEvent) {
    const deltaX = e.clientX - moveInfo.startX;
    const deltaY = e.clientY - moveInfo.startY;
    options?.onMove?.(deltaX, deltaY);
  }

  function mouseup(e: MouseEvent) {
    const deltaX = Math.round(e.clientX - moveInfo.startX);
    const deltaY = Math.round(e.clientY - moveInfo.startY);
    options?.onEnd?.(deltaX, deltaY);
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
