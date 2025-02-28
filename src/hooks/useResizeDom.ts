/**
 * 监听dom大小变化
 *
 * @author tangjiahui
 * @date 2025/2/28
 */
import { RefObject, useEffect } from "react";

export function useResizeDom(
  domRef: RefObject<HTMLElement>,
  callback: (entries: ResizeObserverEntry[]) => void,
) {
  useEffect(() => {
    if (!domRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(callback);
    resizeObserver.observe(domRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
}
