/**
 * 可移动dom
 *
 * @author tangjiahui
 * @date 2025/1/8
 */
interface MoveDomOptions {
  onEnd?: (deltaX: number, deltaY: number) => void;
}

type UnmountMoveDom = () => void;

export function moveDom(dom: HTMLDivElement, options: MoveDomOptions): UnmountMoveDom {
  let moveInfo = {
    startX: 0,
    startY: 0,
    isMoving: false,
  };

  function mousedown(e: MouseEvent) {
    moveInfo.isMoving = true;
    moveInfo.startX = e.clientX;
    moveInfo.startY = e.clientY;
    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);
  }

  function mousemove(e: MouseEvent) {
    const deltaX = e.clientX - moveInfo.startX;
    const deltaY = e.clientY - moveInfo.startY;
    // 触发GPU加速，避免repaint。
    dom.style.setProperty("transform", `translate3d(${deltaX}px,${deltaY}px, 0)`);
  }

  function mouseup(e: MouseEvent) {
    const deltaX = e.clientX - moveInfo.startX;
    const deltaY = e.clientY - moveInfo.startY;
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
