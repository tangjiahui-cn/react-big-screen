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
        // 鼠标滚动偏移量（正值往上，负值往下）
        const wheelDeltaY = (e as any).wheelDeltaY;
        // 缩放倍数（用于实现鼠标加速滚动，缩放同样更快）
        const times = Math.abs(wheelDeltaY) / 120;
        // 缩小比例
        if (wheelDeltaY < 0) {
          zoomEditorSmaller(times);
        }
        // 放大比例
        if (wheelDeltaY > 0) {
          zoomEditorLarger(times);
        }
      }
    },
  });
}
