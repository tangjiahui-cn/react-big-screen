/**
 * 监听移动 componentNode
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { MoveHookQueueType } from "@/packages/dragMove/utils/startMove";
import { ComponentNodeType, InstanceType } from "@/engine";
import { addHistory, getAllSelectedComponentNodes } from "@/packages/shortCutKeys";
import globalCursor from "@/packages/globalCursor";
import { throttle } from "lodash-es";
import { RbsEngine } from "@/export";

interface MoveOptItem {
  id: string; // 组件id
  show?: boolean; // 组件显隐
  containerDom?: HTMLElement; // 组件dom
  componentNode?: ComponentNodeType; // 组件数据
}

export interface OnMoveData {
  componentNodes: ComponentNodeType[];
}

export interface ListenDragMoveOptions {
  onMoveStart?: (options: OnMoveData) => void;
  onMoving?: (options: OnMoveData, moveInfo: { deltaX: number; deltaY: number }) => void;
  onMoveEnd?: (options: OnMoveData) => void;
}

export function listenDragMove(
  instance: InstanceType,
  options?: ListenDragMoveOptions,
): MoveHookQueueType | void {
  // 锁定组件不能移动
  const componentNode = instance.getComponentNode();

  // 锁定组件不能移动
  if (!componentNode || componentNode?.lock) {
    return;
  }

  // 容器组件不存在不能移动
  const currentDOM = instance?.getContainerDom?.();
  if (!currentDOM) {
    throw new Error("dom must be set.");
  }

  let moveOptItems: MoveOptItem[] = [];
  // 是否启用transform（启用则开启硬件GPU加速，变成合成层，不会触发页面 layout 和 paint）
  let enableTransform = false;
  // 旧pointerEvents
  const oldPointerEvents = currentDOM.style.pointerEvents;
  // 是否移动
  let isMove = false;
  // 节流移动组件
  let throttleMove: ((deltaX: number, deltaY: number) => void) | undefined;

  let onMoveData: OnMoveData = {
    componentNodes: [],
  };

  return {
    onStart() {
      // 修改全局光标
      globalCursor.set("move");
      // 等待选中时设置选中实例后，再获取
      setTimeout(() => {
        let { list, showCount } = getAllMoveItems();
        moveOptItems = list;
        // 同时移动不超过指定个数组件使用transform
        //（使用transform会提高流畅度，但会消耗更多性能和内存）
        enableTransform = showCount < 300;

        // 节流移动函数 (确保大量组件同时移动，不特别卡顿)
        throttleMove = throttle(
          (deltaX, deltaY) => {
            moveSelectedInstances(moveOptItems, enableTransform, deltaX, deltaY);
          },
          showCount < 100 ? 0 : 20,
          {
            trailing: true,
          },
        );

        onMoveData = {
          componentNodes: moveOptItems.reduce((result, moveOptItem) => {
            if (moveOptItem.componentNode) result.push(moveOptItem.componentNode);
            return result;
          }, [] as ComponentNodeType[]),
        };

        options?.onMoveStart?.(onMoveData);
      });
      return false;
    },
    onMove(deltaX: number, deltaY: number) {
      if (!isMove) {
        // 移动时事件透传
        currentDOM.style.pointerEvents = "none";
        isMove = true;
      }
      // 移动选中实例
      throttleMove?.(deltaX, deltaY);

      options?.onMoving?.(onMoveData, {
        deltaX,
        deltaY,
      });
    },
    onEnd(deltaX: number, deltaY: number) {
      // 恢复全局光标
      globalCursor.revoke();

      options?.onMoveEnd?.(onMoveData);

      // 如果未移动，则不处理选中实例
      if (!isMove) return;
      // 移动结束恢复pointerEvents
      currentDOM.style.pointerEvents = oldPointerEvents;

      // 更新选中实例
      updateSelectedInstances(moveOptItems, enableTransform, deltaX, deltaY);

      // 加入历史记录
      if (moveOptItems?.length) {
        addHistory("移动组件");
      }

      isMove = false;
      throttleMove = undefined;
    },
  };
}

// 移动选中实例
function moveSelectedInstances(
  moveOptItems: MoveOptItem[],
  enableTransform: boolean,
  deltaX: number,
  deltaY: number,
) {
  const engine = RbsEngine.getActiveEngine();
  const config = engine?.config?.getConfig();
  const isClampEnabled = config?.dragClampEnabled;

  moveOptItems.forEach((item: MoveOptItem) => {
    // 不显示的组件不移动
    if (!item.show) return;
    const dom = item.containerDom!;
    const componentNode = item.componentNode!;

    let displayX = deltaX;
    let displayY = deltaY;

    if (isClampEnabled && componentNode) {
      const clampedX = Math.max(
        0,
        Math.min(deltaX + componentNode.x, config.width - componentNode.width),
      );
      const clampedY = Math.max(
        0,
        Math.min(deltaY + componentNode.y, config.height - componentNode.height),
      );
      displayX = clampedX - componentNode.x;
      displayY = clampedY - componentNode.y;
    }

    if (enableTransform) {
      dom.style.transform = `translate3d(${displayX}px,${displayY}px, 0)`;
    } else {
      dom.style.left = `${componentNode.x + displayX}px`;
      dom.style.top = `${componentNode.y + displayY}px`;
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
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const config = engine.config.getConfig();
  const isClampEnabled = config.dragClampEnabled;

  moveOptItems.forEach((item) => {
    // 删除 transform
    if (item?.show && enableTransform) {
      item.containerDom!.style.removeProperty("transform");
    }
    // 更新 componentNode
    const componentNode = item?.componentNode;
    if (componentNode) {
      let newX = Math.round(deltaX + (componentNode?.x || 0));
      let newY = Math.round(deltaY + (componentNode?.y || 0));

      if (isClampEnabled) {
        newX = Math.max(0, Math.min(newX, config.width - componentNode.width));
        newY = Math.max(0, Math.min(newY, config.height - componentNode.height));
      }

      engine.componentNode.update(componentNode.id, {
        x: newX,
        y: newY,
      });
    }
  });
}

// 获取所有移动 moveItems
function getAllMoveItems() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) {
    return {
      showCount: 0,
      list: [],
    };
  }
  const allSelectedComponentNodes = getAllSelectedComponentNodes();
  return allSelectedComponentNodes.reduce(
    (data, componentNode) => {
      const show = componentNode.show ?? true;
      if (show) data.showCount++;
      const moveItem: MoveOptItem = {
        id: componentNode.id,
        componentNode,
        show: show,
        containerDom: engine.instance?.get?.(componentNode.id)?.getContainerDom?.(),
      };
      data.list.push(moveItem);
      return data;
    },
    {
      showCount: 0,
      list: [] as MoveOptItem[],
    },
  );
}
