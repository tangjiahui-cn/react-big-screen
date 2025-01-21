/**
 * useVirtualDrop
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
import React, { useEffect } from "react";
import { virtualDragData, VirtualDragOptions } from "@/packages/virtual-drag/data";

type DomRef<T extends HTMLElement> = React.RefObject<T>;

interface VirtualDropOptions {
  /** accept drag types */
  accept?: string[];
  /** drop callback */
  onDrop?: (e: MouseEvent, dragOptions: VirtualDragOptions) => void;
}

export function useVirtualDrop<T extends HTMLElement>(
  domRef: DomRef<T>,
  options: VirtualDropOptions,
) {
  useEffect(() => {
    const { accept } = options;
    if (!Array.isArray(accept)) {
      throw new Error("accept must be a string array.");
    }

    const dom = domRef.current;
    if (!dom) {
      console.warn("dom must be set.");
      return;
    }

    const mouseup = (e: MouseEvent) => {
      if (!virtualDragData.getIsDragging()) {
        return;
      }
      const dragOptions = virtualDragData.getDragOptions();
      if (accept && !accept?.includes?.(dragOptions.type || "")) {
        return;
      }
      options?.onDrop?.(e, dragOptions);
    };

    dom.addEventListener("pointerup", mouseup);
    return () => {
      dom.removeEventListener("pointerup", mouseup);
    };
  }, []);
}
