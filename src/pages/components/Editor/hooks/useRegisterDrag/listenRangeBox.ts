/**
 * 监听移动 范围多选框
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { MoveHookQueueType } from "@/packages/dragMove/utils/startMove";
import styles from "./listenRangeBox.module.less";
import { RangeInfo } from "@/packages/rangeBox";
import engine from "@/engine";
import { throttle } from "lodash-es";
import { isIntersect } from "@/utils";
import { addHistory, isKeyPressed } from "@/packages/shortCutKeys";

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

export function listenRangeBox(mountDom: HTMLElement): MoveHookQueueType | void {
  let startPos = { x: 0, y: 0 };
  let div: HTMLDivElement = document.createElement("div");
  div.classList.add(styles.rangeBox);

  function getRangeInfo(deltaX: number = 0, deltaY: number = 0): RangeInfo {
    const otherX = startPos.x + deltaX;
    const otherY = startPos.y + deltaY;
    const rangeInfo = {
      x: startPos.x,
      y: startPos.y,
      width: Math.abs(deltaX),
      height: Math.abs(deltaY),
    };
    if (otherX < rangeInfo.x) rangeInfo.x = otherX;
    if (otherY < rangeInfo.y) rangeInfo.y = otherY;
    return rangeInfo;
  }

  return {
    onStart(_, __, e) {
      const { x = 0, y = 0 } = e || {};
      const domRect = mountDom.getBoundingClientRect();
      // 计算点击位置在dom容器内部的绝对位坐标
      div.style.top = `${(startPos.x = x - domRect.x)}px`;
      div.style.left = `${(startPos.y = y - domRect.y)}px`;
      div.style.width = `${0}px`;
      div.style.height = `${0}px`;
      div.style.borderWidth = "0px";
      div.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
      mountDom.appendChild(div);
    },
    onMove(deltaX: number, deltaY: number) {
      const rangeInfo = getRangeInfo(deltaX, deltaY);
      div.style.top = `${rangeInfo.y}px`;
      div.style.left = `${rangeInfo.x}px`;
      div.style.width = `${rangeInfo.width}px`;
      div.style.height = `${rangeInfo.height}px`;
      div.style.borderWidth = "1px";
      handleSelectRangeInfo(rangeInfo);
    },
    onEnd(deltaX: number, deltaY: number) {
      const rangeInfo = getRangeInfo(deltaX, deltaY);
      mountDom.removeChild(div);
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
