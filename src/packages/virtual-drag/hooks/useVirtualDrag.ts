/**
 * useVirtualDrag
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
import React, { useEffect, useRef } from "react";
import { globalStyle } from "../globalStyle";
import { dragElement } from "../utils";
import { virtualDragData, VirtualDragOptions } from "../data";

type DomRef<T extends HTMLElement> = React.RefObject<T>;

export function useVirtualDrag<T extends HTMLElement>(
  domRef: DomRef<T>,
  virtualDragOptions: VirtualDragOptions,
) {
  const optionsRef = useRef<VirtualDragOptions>(virtualDragOptions);
  optionsRef.current = virtualDragOptions;

  useEffect(() => {
    const dom = domRef.current;
    if (!dom) {
      console.warn("dom must be set.");
      return;
    }
    const unmount = dragElement(dom, {
      onStart() {
        globalStyle.mount();
        document.documentElement.classList.add("is-dragging");
        virtualDragData.setDragOptions(optionsRef.current);
        virtualDragData.setIsDragging(true);
      },
      onEnd() {
        globalStyle.unmount();
        document.documentElement.classList.remove("is-dragging");
        virtualDragData.setDragOptions(optionsRef.current);
        virtualDragData.setIsDragging(false);
      },
    });

    return () => unmount();
  }, []);
}
