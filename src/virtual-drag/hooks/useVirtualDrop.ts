/**
 * useVirtualDrop
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
import { MutableRefObject, useEffect } from 'react';
import { virtualDragData, VirtualDragOptions } from '@/virtual-drag/data';

type DomRef<T = HTMLElement> = MutableRefObject<T>;

interface VirtualDropOptions {
  /** accept drag types */
  accept: string[];
  /** drop callback */
  onDrop: (e: MouseEvent, dragOptions: VirtualDragOptions) => void;
}

export function useVirtualDrop<T = HTMLElement>(domRef: DomRef<T>, options: VirtualDropOptions) {
  useEffect(() => {
    const dom: T = domRef.current;
    if (!dom) {
      console.warn('dom must be set.');
      return;
    }

    const mouseup = (e) => {
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
