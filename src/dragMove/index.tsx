/**
 * 拖拽节点相关
 */
import styles from "./index.module.less";
import { createRoot } from "react-dom/client";
import { moveableDom } from "@/dragMove/utils";
import React from "react";

export * from "./utils";

export const dragDirectionMapToCursor: {
  [K in DragDirection]: React.CSSProperties["cursor"];
} = {
  topLeft: "nw-resize",
  top: "n-resize",
  topRight: "ne-resize",
  left: "w-resize",
  right: "e-resize",
  bottomLeft: "sw-resize",
  bottom: "s-resize",
  bottomRight: "se-resize",
};

export type DragDirection =
  | "topLeft"
  | "top"
  | "topRight"
  | "left"
  | "right"
  | "bottomLeft"
  | "bottom"
  | "bottomRight";

export interface MoveInfo {
  dx: number; // deltaX
  dy: number; // deltaY
  dw: number; // deltaWidth
  dh: number; // deltaHeight
}

interface DragSizeOptions {
  onStart?: (type: DragDirection) => void;
  onMove?: (moveInfo: MoveInfo) => void;
  onEnd?: (moveInfo: MoveInfo) => void;
}

export function dragMoveSize(dom: HTMLElement, options: DragSizeOptions): () => void {
  if (!dom) {
    throw new Error("dom must be defined");
  }

  // 卸载函数
  let unmountList: (() => void)[] = [];

  // 创建一个标记点
  function createPoint(className: string): HTMLElement {
    const div = document.createElement("div");

    const app = createRoot(div);
    app.render(<div className={className} onMouseDown={(e) => e.stopPropagation()} />);

    unmountList.push(() => {
      setTimeout(() => {
        app?.unmount?.();
        div?.remove?.();
      });
    });

    dom?.appendChild(div);
    return div;
  }

  // 监听移动
  function listenMove(dom: HTMLElement, direction: DragDirection): () => void {
    function getMoveInfo(deltaX: number, deltaY: number) {
      const moveInfo: MoveInfo = {
        dx: 0,
        dy: 0,
        dw: 0,
        dh: 0,
      };

      function top() {
        moveInfo.dh = -deltaY; // 高度变化
        moveInfo.dy = deltaY; // y变化
      }

      function left() {
        moveInfo.dw = -deltaX; // 宽度变化
        moveInfo.dx = deltaX; // x变化
      }

      function bottom() {
        moveInfo.dh = deltaY; // 高度变化
      }

      function right() {
        moveInfo.dw = deltaX; // 宽度变化
      }

      switch (direction) {
        case "top":
          top();
          break;
        case "topLeft":
          top();
          left();
          break;
        case "topRight":
          top();
          right();
          break;
        case "bottom":
          bottom();
          break;
        case "bottomLeft":
          bottom();
          left();
          break;
        case "bottomRight":
          bottom();
          right();
          break;
        case "left":
          left();
          break;
        case "right":
          right();
          break;
      }
      return moveInfo;
    }

    return moveableDom(dom, {
      onStart() {
        options?.onStart?.(direction);
      },
      onMove(deltaX, deltaY) {
        options?.onMove?.(getMoveInfo(deltaX, deltaY));
      },
      onEnd(deltaX, deltaY) {
        options?.onEnd?.(getMoveInfo(deltaX, deltaY));
      },
    });
  }

  // 绑定移动函数
  const unmountListeners = [
    listenMove(createPoint(styles.dragPoint_top), "top"),
    listenMove(createPoint(styles.dragPoint_top_left), "topLeft"),
    listenMove(createPoint(styles.dragPoint_top_right), "topRight"),
    listenMove(createPoint(styles.dragPoint_bottom), "bottom"),
    listenMove(createPoint(styles.dragPoint_bottom_left), "bottomLeft"),
    listenMove(createPoint(styles.dragPoint_bottom_right), "bottomRight"),
    listenMove(createPoint(styles.dragPoint_left), "left"),
    listenMove(createPoint(styles.dragPoint_right), "right"),
  ];

  // 卸载
  return () => {
    unmountListeners.forEach((cb) => cb());
    unmountList.forEach((cb) => cb());
  };
}
