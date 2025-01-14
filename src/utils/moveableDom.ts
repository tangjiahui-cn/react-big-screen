import { isClickMouseLeft } from "@/utils/mouse";

/**
 * 可移动dom
 *
 * @author tangjiahui
 * @date 2025/1/9
 */
interface moveableDomOptions {
  onEnd?: (deltaX: number, deltaY: number) => void;
}

type UnmountMoveableDom = () => void;

export function moveableDom(dom: HTMLDivElement, options: moveableDomOptions): UnmountMoveableDom {
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
  }

  function mousemove(e: MouseEvent) {
    const deltaX = e.clientX - moveInfo.startX;
    const deltaY = e.clientY - moveInfo.startY;
    // 开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint。
    dom.style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
  }

  function mouseup(e: MouseEvent) {
    const deltaX = Math.round(e.clientX - moveInfo.startX);
    const deltaY = Math.round(e.clientY - moveInfo.startY);
    dom.style.removeProperty("transform");
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
