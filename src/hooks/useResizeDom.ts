/**
 * 监听dom大小变化
 *
 * @author tangjiahui
 * @date 2025/2/28
 */
import { RefObject, useEffect } from "react";
import { useListenRef } from "./useListenRef";

export function useResizeDom(domRef: RefObject<HTMLElement>, callback: ResizeObserverCallback) {
  const callbackRef = useListenRef(callback);
  useEffect(() => {
    if (!domRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
        callbackRef?.current?.(entries, observer);
      },
    );
    resizeObserver.observe(domRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
}
