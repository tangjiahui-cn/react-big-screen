/**
 * useIsDragging
 *
 * @author tangjiahui
 * @date 2025/1/7
 * @description 是否正在拖拽中。
 */
import React, { useEffect } from "react";
import { DraggingChangeCallbackOptions, virtualDragData } from "../data";

interface IsDraggingOptions {
  accept?: string[]; // 只接受accept类型的拖拽中监测（空则表示接受全部类型的拖拽变更）
}

export function useIsDragging(isDraggingOptions?: IsDraggingOptions) {
  const [isDragging, setIsDragging] = React.useState(false);

  useEffect(() => {
    const { accept } = isDraggingOptions || {};
    if (accept && !Array.isArray(accept)) {
      throw new Error("accept must be a string array");
    }
    const unmount = virtualDragData.onDraggingChange((options: DraggingChangeCallbackOptions) => {
      const { type } = options;
      if (accept && !accept.includes(type || "")) {
        return;
      }
      setIsDragging(options.isDragging);
    });
    return () => unmount();
  }, []);

  return isDragging;
}
