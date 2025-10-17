/**
 * 监听拖拽大小
 *
 * @author tangjiahui
 * @date 2025/3/19
 */
import { ComponentNodeType } from "@/engine";
import { MoveHookQueueType } from "@/packages/dragMove/utils/startMove";
import { MoveInfo } from "@/packages/dragMove";
import React from "react";
import globalCursor from "@/packages/globalCursor";
import { addHistory } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export type DragDirection =
  | "top"
  | "top_left"
  | "top_right"
  | "bottom"
  | "bottom_left"
  | "bottom_right"
  | "left"
  | "right";

export const DRAG_DIRECTIONS: DragDirection[] = [
  "top",
  "top_left",
  "top_right",
  "bottom",
  "bottom_left",
  "bottom_right",
  "left",
  "right",
];

export const dragDirectionMapToCursor: {
  [K in DragDirection]: React.CSSProperties["cursor"];
} = {
  top: "n-resize",
  top_left: "nw-resize",
  top_right: "ne-resize",
  bottom: "s-resize",
  bottom_left: "sw-resize",
  bottom_right: "se-resize",
  left: "w-resize",
  right: "e-resize",
};

// 计算移动偏移量
function getMoveInfo(direction: DragDirection, deltaX: number, deltaY: number) {
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
    case "top_left":
      top();
      left();
      break;
    case "top_right":
      top();
      right();
      break;
    case "bottom":
      bottom();
      break;
    case "bottom_left":
      bottom();
      left();
      break;
    case "bottom_right":
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

interface PositionInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function listenDragSize(
  componentNode: ComponentNodeType,
  dom: HTMLElement,
  direction: DragDirection,
): MoveHookQueueType | void {
  let baseInfo: PositionInfo = {
    x: 0,
    y: 0,
    width: dom.offsetWidth,
    height: dom.offsetHeight,
  } as const;

  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;

  return {
    onStart() {
      baseInfo = {
        x: componentNode.x,
        y: componentNode.y,
        width: componentNode.width,
        height: componentNode.height,
      };
      dom.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      // 修改全局光标
      globalCursor.set(dragDirectionMapToCursor[direction]);
    },
    onMove(deltaX: number, deltaY: number) {
      const moveInfo = getMoveInfo(direction, deltaX, deltaY);
      const width = baseInfo.width + moveInfo.dw;
      const height = baseInfo.height + moveInfo.dh;
      if (width < 0 || height < 0) {
        return;
      }
      engine.componentNode.update(componentNode.id, {
        x: Math.round(baseInfo.x + moveInfo.dx),
        y: Math.round(baseInfo.y + moveInfo.dy),
        height: Math.round(Math.max(height, 0)),
        width: Math.round(Math.max(width, 0)),
      });
    },
    onEnd() {
      // 恢复全局光标
      globalCursor.revoke();
      // 添加历史记录
      addHistory("拖拽组件大小");
    },
  };
}
