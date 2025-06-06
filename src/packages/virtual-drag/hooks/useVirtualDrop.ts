/**
 * useVirtualDrop
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
import React, { useEffect, useRef } from "react";
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
  const optionsRef = useRef<VirtualDropOptions>(options);
  optionsRef.current = options;

  useEffect(() => {
    const { accept } = options;
    if (accept && !Array.isArray(accept)) {
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
      optionsRef.current?.onDrop?.(e, dragOptions);
    };

    dom.addEventListener("mouseup", mouseup);
    return () => {
      dom.removeEventListener("mouseup", mouseup);
    };
  }, []);
}
