/**
 * 注册原生dom事件
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RefObject, useEffect } from "react";

type EventCallback = (e: MouseEvent) => void;

export function useDomEvents<K extends keyof HTMLElementEventMap>(
  domRef: RefObject<HTMLElement | null>,
  eventMap: Record<K, EventCallback>,
) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) {
      throw new Error("dom must be set.");
    }
    const unmountList: (() => void)[] = []; // 存储卸载事件
    for (const eventName in eventMap) {
      const eventCallback: EventCallback = eventMap[eventName];
      dom.addEventListener(eventName, eventCallback as any);
      unmountList.push(() => dom.removeEventListener(eventName, eventCallback as any));
    }
    return () => {
      unmountList.forEach((cb) => cb());
    };
  }, []);
}
