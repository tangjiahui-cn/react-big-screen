/**
 * 范围框选
 *
 * @author tangjiahui
 * @date 2025/1/20
 */
import { RefObject, useEffect } from "react";
import styles from "./index.module.less";
import engine from "@/engine";
import { moveableDom } from "../dragMove";

export interface RangeInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useRangeBox(
  domRef: RefObject<HTMLDivElement | null>, // dom的ref值
  options?: {
    onMove?: (rangeInfo: RangeInfo) => void;
    onEnd?: (rangeInfo: RangeInfo) => void;
  },
) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) return;

    let startPos = { x: 0, y: 0 };
    let div: HTMLDivElement = document.createElement("div");
    div.classList.add(styles.rangeBox);

    function getRangeInfo(deltaX: number, deltaY: number): RangeInfo {
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

    return moveableDom(dom, {
      onStart(e) {
        const domRect = dom.getBoundingClientRect();
        // 计算点击位置在dom容器内部的绝对位坐标
        div.style.top = `${(startPos.x = e.x - domRect.x)}px`;
        div.style.left = `${(startPos.y = e.y - domRect.y)}px`;
        div.style.width = `${0}px`;
        div.style.height = `${0}px`;
        div.style.borderWidth = "0px";
        div.style.zIndex = `${engine.componentNode.getMaxLevel()}`;
        dom.appendChild(div);
        engine.config.setRuntime({ isDragging: true });
      },
      onMove(deltaX: number, deltaY: number) {
        const rangeInfo = getRangeInfo(deltaX, deltaY);
        div.style.top = `${rangeInfo.y}px`;
        div.style.left = `${rangeInfo.x}px`;
        div.style.width = `${rangeInfo.width}px`;
        div.style.height = `${rangeInfo.height}px`;
        div.style.borderWidth = "1px";
        options?.onMove?.(rangeInfo);
      },
      onEnd(deltaX: number, deltaY: number) {
        const rangeInfo = getRangeInfo(deltaX, deltaY);
        if (rangeInfo.width || rangeInfo.height) {
          options?.onEnd?.(getRangeInfo(deltaX, deltaY));
        }
        engine.config.setRuntime({ isDragging: false });
        dom.removeChild(div);
      },
    });
  }, []);
}
