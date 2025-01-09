/**
 * useClickDomOutSideOnce
 *
 * @author tangjiahui
 * @date 2025/1/9
 * @description dom点击外部执行一次，每次进出一次dom会重置点击次数。
 */
import { RefObject, useEffect } from "react";

export function useClickDomOutSideOnce(
  domRef: RefObject<HTMLDivElement>,
  callback: (e: MouseEvent) => void,
) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) return;
    let isListening = false;

    // 全局点击事件
    function mousedown(e: MouseEvent) {
      // 如果在元素外部，则回调
      if (!dom?.contains?.(e.target as any)) {
        callback?.(e);
      }
      clearGlobal();
    }

    // 进入dom
    function enterDom() {
      clearGlobal();
    }

    // 离开dom
    function leaveDom() {
      listenGlobal();
    }

    // 清除全局鼠标事件
    function clearGlobal() {
      if (!isListening) return;
      isListening = false;
      window.removeEventListener("mousedown", mousedown);
    }

    // 监听全局鼠标事件
    function listenGlobal() {
      if (isListening) return;
      isListening = true;
      window.addEventListener("mousedown", mousedown);
    }

    listenGlobal();
    dom.addEventListener("mouseenter", enterDom);
    dom.addEventListener("mouseleave", leaveDom);
    return () => {
      clearGlobal();
      dom.removeEventListener("mouseenter", enterDom);
      dom.removeEventListener("mouseleave", leaveDom);
    };
  }, []);
}
