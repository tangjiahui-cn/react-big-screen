/**
 * 拖拽位移
 *
 * @author tangjiahui
 * @date 2025/2/3
 */
import { RefObject, useEffect } from "react";
import { moveableDom } from "@/packages/dragMove";
import globalCursor from "@/packages/globalCursor";
import engine, { ComponentNodeType } from "@/engine";
import { addHistory, getAllSelectedComponentNodes } from "@/packages/shortCutKeys";

interface DragSizeOptions {
  lock?: boolean; // 是否锁定
  onMove?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动中
  onEnd?: (deltaX: number, deltaY: number, e: MouseEvent) => void; // 移动结束
}

interface MoveOptItem {
  id: string;
  show?: boolean;
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
    let moveOptItems: MoveOptItem[] = [];
    // 是否启用transform（启用则开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint）
    let enableTransform = false;
    // 旧pointerEvents
    const oldPointerEvents = currentDOM.style.pointerEvents;
    let isMove = false;
    return moveableDom(currentDOM, {
      onStart(e) {
        e.stopPropagation();
        // 移动时事件透传
        currentDOM.style.pointerEvents = "none";
        // 修改全局光标
        globalCursor.set("move");
        // 等待选中时设置选中实例后，再获取
        setTimeout(() => {
          let { list, showCount } = getAllMoveItems();
          moveOptItems = list;
          // 不超过50个组件使用transform，避免内存溢出（使用了transform会流畅，代价是占用内存）
          enableTransform = showCount < 50;
        });
      },
      onMove(deltaX: number, deltaY: number, e: MouseEvent) {
        isMove = true;
        options?.onMove?.(deltaX, deltaY, e);
        // 移动选中实例
        moveSelectedInstances(moveOptItems, enableTransform, deltaX, deltaY);
      },
      onEnd(deltaX: number, deltaY: number, e: MouseEvent) {
        // 移动结束恢复pointerEvents
        currentDOM.style.pointerEvents = oldPointerEvents;
        // 恢复全局光标
        globalCursor.revoke();
        // 回调onEnd
        options?.onEnd?.(deltaX, deltaY, e);

        // 如果未移动，则不处理选中实例
        if (!isMove) return;

        // 更新选中实例
        updateSelectedInstances(moveOptItems, enableTransform, deltaX, deltaY);

        // 加入历史记录
        if (moveOptItems?.length) {
          addHistory("移动组件");
        }

        isMove = false;
      },
    });
  }, [lock]);
}

// 移动选中实例
function moveSelectedInstances(
  moveOptItems: MoveOptItem[],
  enableTransform: boolean,
  deltaX: number,
  deltaY: number,
) {
  moveOptItems.forEach((item: MoveOptItem) => {
    // 不显示的组件不移动
    if (!item.show) return;
    const dom = item.containerDom!;
    if (enableTransform) {
      dom.style.transform = `translate3d(${deltaX}px,${deltaY}px, 0)`;
    } else {
      const componentNode = item.componentNode!;
      dom.style.left = `${componentNode.x + deltaX}px`;
      dom.style.top = `${componentNode.y + deltaY}px`;
    }
  });
}

// 更新选中实例
function updateSelectedInstances(
  moveOptItems: MoveOptItem[],
  enableTransform: boolean,
  deltaX: number,
  deltaY: number,
) {
  moveOptItems.forEach((item) => {
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
}

// 获取所有移动 moveItems
function getAllMoveItems() {
  const allSelectedComponentNodes = getAllSelectedComponentNodes();
  return allSelectedComponentNodes.reduce(
    (data, componentNode) => {
      const show = componentNode.show ?? true;
      if (show) data.showCount++;
      data.list.push({
        id: componentNode.id,
        componentNode,
        show: show,
        containerDom: engine.instance?.get?.(componentNode.id)?.getContainerDom?.(),
      });
      return data;
    },
    {
      showCount: 0,
      list: [] as MoveOptItem[],
    },
  );
}
