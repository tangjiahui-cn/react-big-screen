/**
 * 监听移动 范围多选框
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { MoveHookQueueType } from "@/packages/dragMove/utils/startMove";
import styles from "./listenRangeBox.module.less";
import engine from "@/engine";
import { throttle } from "lodash-es";
import { isIntersect } from "@/utils";
import { addHistory, isKeyPressed } from "@/packages/shortCutKeys";
import globalCursor from "@/packages/globalCursor";

interface RangeInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

// 范围框选
const handleSelectRangeInfo: (
  rangeInfo: RangeInfo,
  callback?: (selectedIds: string[]) => void,
) => void = throttle((rangeInfo: RangeInfo, callback?: (selectedIds: string[]) => void) => {
  // 过滤框选实例
  const selectedIds = engine.componentNode.getAll().reduce((result, componentNode) => {
    const p1 = {
      x1: componentNode.x,
      y1: componentNode.y,
      x2: componentNode.x + componentNode.width,
      y2: componentNode.y + componentNode.height,
    };
    const p2 = {
      x1: rangeInfo.x,
      y1: rangeInfo.y,
      x2: rangeInfo.x + rangeInfo.width,
      y2: rangeInfo.y + rangeInfo.height,
    };
    // 两个矩形是否相交
    if (isIntersect(p1, p2)) {
      if (!componentNode.lock || (componentNode.lock && isKeyPressed("shift"))) {
        result.push(componentNode.id);
      }
    }
    return result;
  }, [] as string[]);
  // 选中框选的实例
  engine.instance.select(selectedIds, true);
  callback?.(selectedIds);
}, 100);

let div: HTMLDivElement | undefined = undefined; // 全局只可能存在一个范围多选框
export function listenRangeBox(mountDom: HTMLElement): MoveHookQueueType | void {
  let startPos = { x: 0, y: 0 };
  let scale: number = 1;

  /**
   * 获取拖拽信息
   * @param deltaX
   * @param deltaY
   */
  function getRangeInfo(deltaX: number = 0, deltaY: number = 0): RangeInfo {
    const screenDeltaX = deltaX * scale; // 还原真实移动像素偏移量
    const screenDeltaY = deltaY * scale; // 还原真实移动像素偏移量
    const otherX = startPos.x + screenDeltaX; // 屏幕真实像素坐标 x
    const otherY = startPos.y + screenDeltaY; // 屏幕真实像素坐标 y
    const rangeInfo = {
      x: startPos.x,
      y: startPos.y,
      width: Math.abs(deltaX),
      height: Math.abs(deltaY),
    };
    if (otherX < rangeInfo.x) rangeInfo.x = otherX;
    if (otherY < rangeInfo.y) rangeInfo.y = otherY;
    rangeInfo.x /= scale; // 计算虚拟像素坐标 x
    rangeInfo.y /= scale; // 计算虚拟像素坐标 y
    return rangeInfo;
  }

  function clear() {
    if (div) {
      div?.remove();
      div = undefined;
    }
  }

  return {
    onStart(_, __, e) {
      clear(); // 修复右键菜单后未卸载成功的问题
      const { x = 0, y = 0 } = e || {};
      scale = engine.config.getConfig().scale;
      const domRect = mountDom.getBoundingClientRect();
      // 计算点击位置在dom容器内部的绝对位坐标
      startPos.x = x - domRect.x;
      startPos.y = y - domRect.y;
      // 创建div
      div = document.createElement("div");
      div.classList.add(styles.rangeBox);
      div.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      mountDom.appendChild(div);
      globalCursor.set("default");
    },
    onMove(deltaX: number, deltaY: number) {
      if (!div) return;
      const rangeInfo = getRangeInfo(deltaX, deltaY);
      div.style.top = `${rangeInfo.y}px`;
      div.style.left = `${rangeInfo.x}px`;
      div.style.width = `${rangeInfo.width}px`;
      div.style.height = `${rangeInfo.height}px`;
      div.style.borderWidth = "1px";
      handleSelectRangeInfo(rangeInfo);
    },
    onEnd(deltaX: number, deltaY: number) {
      clear();
      globalCursor.revoke();
      const rangeInfo = getRangeInfo(deltaX, deltaY);
      if (rangeInfo.width || rangeInfo.height) {
        handleSelectRangeInfo(rangeInfo, (selectedIds) => {
          if (selectedIds.length) {
            addHistory("范围选中组件");
          }
        });
      }
    },
  };
}
