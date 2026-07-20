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

      let newX = Math.round(baseInfo.x + moveInfo.dx);
      let newY = Math.round(baseInfo.y + moveInfo.dy);
      let newWidth = Math.round(Math.max(width, 0));
      let newHeight = Math.round(Math.max(height, 0));

      // 如果开启了拖拽不超出画布，限制组件在画布边界内
      const config = engine.config.getConfig();
      if (config.dragClampEnabled) {
        // 限制左边界（x < 0 时缩减宽度补偿）
        if (newX < 0) {
          newWidth += newX;
          newX = 0;
        }
        // 限制上边界（y < 0 时缩减高度补偿）
        if (newY < 0) {
          newHeight += newY;
          newY = 0;
        }
        // 限制右边界
        if (newX + newWidth > config.width) {
          newWidth = config.width - newX;
        }
        // 限制下边界
        if (newY + newHeight > config.height) {
          newHeight = config.height - newY;
        }
        // 确保最小尺寸
        if (newWidth < 1) newWidth = 1;
        if (newHeight < 1) newHeight = 1;
      }

      engine.componentNode.update(componentNode.id, {
        x: newX,
        y: newY,
        height: Math.round(Math.max(newHeight, 0)),
        width: Math.round(Math.max(newWidth, 0)),
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
