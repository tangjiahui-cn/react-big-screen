/**
 * 拖拽位移
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RefObject, useEffect } from "react";
import { moveableDom } from "@/packages/dragMove";
import globalCursor from "@/packages/globalCursor";
import engine, { ComponentNodeType, InstanceType } from "@/engine";

interface DragSizeOptions {
  lock?: boolean; // 是否锁定
  onMove?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动中
  onEnd?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动结束
}

type MixedInstanceType = Partial<InstanceType> & {
  id: string;
  show?: boolean; // 是否显示
};

interface OperateItem {
  id: string; // 组件id
  show: boolean; // 是否显示
  containerDom?: HTMLElement;
  componentNode?: ComponentNodeType;
}

export function useItemDragMove(domRef: RefObject<HTMLElement | null>, options: DragSizeOptions) {
  const { lock } = options;

  useEffect(() => {
    if (lock) {
      return;
    }
    const currentDOM = domRef.current;
    if (!currentDOM) {
      throw new Error("dom must be set.");
    }

    // 待移动items
    let moveItems: OperateItem[] = [];
    // 是否启用transform（启用则开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint）
    let enableTransform = false;
    // 旧pointerEvents
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
          let showCount = 0; // 显示组件的数量
          const selectedInstances = engine.instance.getAllSelected();
          const moveInstances: MixedInstanceType[] = [
            ...selectedInstances,
            ...getChildrenInstances(selectedInstances),
          ];
          // 计算 moveItems
          moveItems = moveInstances.map((mixedInstance: MixedInstanceType) => {
            if (!mixedInstance?.getContainerDom) {
              showCount++;
            }
            return {
              id: mixedInstance.id,
              show: mixedInstance?.show ?? true,
              containerDom: mixedInstance?.getContainerDom?.(),
              // 因为默认属性show为false的组件不会渲染所以instance.getComponentNode()取不到值
              componentNode:
                mixedInstance?.getComponentNode?.() || engine.componentNode.get(mixedInstance.id),
            };
          });
          // 不超过50个组件使用transform，避免内存溢出（使用了transform会流畅，代价是占用内存）
          enableTransform = showCount < 50;
        });
      },
      onMove(deltaX: number, deltaY: number, e: MouseEvent) {
        moveItems.forEach((item: OperateItem) => {
          // 不显示的组件不移动
          if (!item.show) {
            return;
          }
          const dom = item.containerDom!;
          if (enableTransform) {
            dom.style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
          } else {
            const componentNode = item.componentNode!;
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
        moveItems.forEach((item) => {
          // 删除 transform
          if (item?.show && enableTransform) {
            item.containerDom!.style.removeProperty("transform");
          }
          // 更新 componentNode
          const componentNode = item?.componentNode;
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

// 获取layout下面所有的子instances
function getChildrenInstances(instances: string[] | InstanceType[]): MixedInstanceType[] {
  return instances.reduce((result, source) => {
    const instance = typeof source === "string" ? engine.instance.get(source) : source;
    const componentNode = instance?.getComponentNode?.();
    // 如果是layout类型组件，则将其包含的children全部添加
    if (componentNode && componentNode.category === "layout") {
      const childrenIds: string[] = engine.componentNode.getLayoutChildrenIds(componentNode.id);
      childrenIds?.forEach?.((id) => {
        const childInstance = engine.instance.get(id);
        result.push(childInstance || { id, show: false });
      });
    }
    return result;
  }, [] as MixedInstanceType[]);
}
