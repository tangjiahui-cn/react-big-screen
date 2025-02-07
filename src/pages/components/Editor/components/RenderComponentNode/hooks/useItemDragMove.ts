/**
 * 拖拽位移
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RefObject, useEffect } from "react";
import { moveableDom } from "@/packages/dragMove";
import globalCursor from "@/packages/globalCursor";
import engine, { InstanceType } from "@/engine";

interface DragSizeOptions {
  lock?: boolean; // 是否锁定
  onMove?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动中
  onEnd?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动结束
}

export function useItemDragMove(domRef: RefObject<HTMLElement | null>, options: DragSizeOptions) {
  const { lock } = options;

  useEffect(() => {
    if (lock) return;
    const currentDOM = domRef.current;
    if (!currentDOM) throw new Error("dom must be set.");
    // 待移动实例
    let moveInstances: InstanceType[] = [];
    // 是否启用transform（启用则开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint）
    let enableTransform = false;
    const oldPointerEvents = currentDOM.style.pointerEvents;
    return moveableDom(currentDOM, {
      onStart(e) {
        e.stopPropagation();
        // 移动时事件透传
        currentDOM.style.pointerEvents = "none";
        // 修改全局光标
        globalCursor.set("move");
        // 等待选中时设置选中实例后，再获取
        setTimeout(() => {
          const selectedInstances = engine.instance.getAllSelected();
          moveInstances = [...selectedInstances, ...engine.instance.getChildren(selectedInstances)];
          // 不超过50个组件使用transform，避免内存溢出（使用了transform会流畅，代价是占用内存）
          enableTransform = moveInstances.length < 50;
        });
      },
      onMove(deltaX: number, deltaY: number, e: MouseEvent) {
        moveInstances.forEach((instance: InstanceType) => {
          if (enableTransform) {
            instance.getContainerDom().style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
          } else {
            const componentNode = instance.getComponentNode();
            const dom = instance.getContainerDom();
            dom.style.left = `${componentNode.x + deltaX}px`;
            dom.style.top = `${componentNode.y + deltaY}px`;
          }
        });
        options?.onMove?.(deltaX, deltaY, e);
      },
      onEnd(deltaX: number, deltaY: number, e: MouseEvent) {
        // 移动结束恢复pointerEvents
        currentDOM.style.pointerEvents = oldPointerEvents;
        // 恢复全局光标
        globalCursor.revoke();
        // 处理选中实例
        moveInstances.forEach((instance) => {
          // 删除 transform
          if (enableTransform) {
            instance.getContainerDom().style.removeProperty("transform");
          }
          // 更新 componentNode
          const componentNode = instance.getComponentNode();
          if (componentNode) {
            engine.componentNode.update(componentNode.id, {
              x: deltaX + (componentNode?.x || 0),
              y: deltaY + (componentNode?.y || 0),
            });
          }
        });
        options?.onEnd?.(deltaX, deltaY, e);
      },
    });
  }, [lock]);
}
