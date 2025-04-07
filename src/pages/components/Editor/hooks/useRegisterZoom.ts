/**
 * useRegisterZoom
 *
 * @author tangjiahui
 * @date 2025/3/26
 * @description 注册dom的滚轮事件，控制编辑器的缩放。
 */
import { useDomEvents } from "@/hooks";
import {
  zoomEditorLarger,
  isKeyPressed,
  zoomEditorSmaller,
  zoomEditorDefault,
} from "@/packages/shortCutKeys";
import { RefObject } from "react";
import { isClickMouseMid } from "@/utils";

interface WheelInfo {
  direction: 1 | -1 | 0; // 1正向 0无 -1负向
  times: number; // 每次变化多少次的比例缩放
}

// 获取滚轮信息
function getWheelInfo(e: WheelEvent): WheelInfo {
  let times: WheelInfo["times"] = 1;
  let direction: WheelInfo["direction"] = 0;

  // 兼容 wheelDeltaY
  if ((e as any).wheelDeltaY) {
    const wheelDeltaY = (e as any).wheelDeltaY;
    times = Math.abs(wheelDeltaY) / 120;
    direction = wheelDeltaY > 0 ? 1 : wheelDeltaY < 0 ? -1 : 0;
  } else if ((e as any).deltaY) {
    const deltaY = (e as any).deltaY;
    // 计算方式：times = (deltaY - 4) / 40
    // 以40像素变化为一次缩放变化，使其deltaY的times，和wheelDeltaY的times一致
    times = Math.floor(Math.max(Math.abs(deltaY) - 4, 0) / 40) || 1;
    direction = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;
  }

  return {
    times,
    direction,
  };
}

export function useRegisterZoom(domRef: RefObject<HTMLElement>) {
  useDomEvents(domRef, {
    // 重置
    mousedown(e) {
      // 按下 ctrl、鼠标中键，重置缩放比例
      if (isKeyPressed("ctrl") && isClickMouseMid(e)) {
        zoomEditorDefault();
      }
    },
    // 滚动缩放
    wheel(e) {
      if (isKeyPressed("ctrl")) {
        // 阻止滚动条滚动
        e.preventDefault();
        const { direction, times } = getWheelInfo(e as WheelEvent);
        // 缩小比例
        if (direction < 0) {
          zoomEditorSmaller(times);
        }
        // 放大比例
        if (direction > 0) {
          zoomEditorLarger(times);
        }
      }
    },
  });
}
