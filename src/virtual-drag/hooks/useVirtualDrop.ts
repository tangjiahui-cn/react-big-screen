/**
 * useVirtualDrop
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
import React, { useEffect } from 'react';
import { virtualDragData, VirtualDragOptions } from '@/virtual-drag/data';

type DomRef<T = HTMLElement> = React.RefObject<T>;

interface VirtualDropOptions {
  /** accept drag types */
  accept?: string[];
  /** drop callback */
  onDrop?: (e: MouseEvent, dragOptions: VirtualDragOptions) => void;
}

export function useVirtualDrop(domRef: DomRef<HTMLElement>, options: VirtualDropOptions) {
  useEffect(() => {
    const dom = domRef.current;
    if (!dom) {
      console.warn('dom must be set.');
      return;
    }

    const mouseup = (e: MouseEvent) => {
      if (!virtualDragData.getIsDragging()) return;
      const dragOptions = virtualDragData.getDragOptions();
      options?.onDrop?.(e, dragOptions);
    };

    dom.addEventListener('mouseup', mouseup);
    return () => {
      dom.addEventListener('mouseup', mouseup);
    };
  }, []);
}
