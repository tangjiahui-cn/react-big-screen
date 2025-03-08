/**
 * 监听放置在layout类组件上方
 *
 * @author tangjiahui
 * @date 2025/3/8
 */
import { MoveHookQueueType } from "@/packages/dragMove/utils/startMove";
import engine, { ComponentNodeType, InstanceType } from "@/engine";
import { isInRect } from "@/utils";
import { addHistory } from "@/packages/shortCutKeys";
import { ask } from "@/components/Ask";

interface Coordinate {
  x: number;
  y: number;
}

export function listenDropLayout(
  instance: InstanceType,
  onGetUnmountAsk: (unmount: Unmount | void) => void,
): MoveHookQueueType | void {
  return {
    onEnd(_, __, e) {
      setTimeout(() => {
        const componentNode = instance.getComponentNode();
        const containerDom = instance.getContainerDom();
        // 锁定组件不能移动
        if (!componentNode || componentNode?.lock || !containerDom) {
          return;
        }
        const containerRect = containerDom?.getBoundingClientRect?.() || { x: 0, y: 0 };
        const unmount = moveLayout(componentNode, {
          x: e.x - containerRect.x + componentNode.x, // 鼠标点击位置在编辑器上的坐标
          y: e.y - containerRect.y + componentNode.y,
        });
        onGetUnmountAsk?.(unmount);
      });
    },
  };
}

/**
 * 找到包含点击位置的“层级最大”、“最后渲染”的layout类型组件（也就是最靠近用户屏幕上方的）。
 * @param componentNode 当前点击实例
 * @param point 点击坐标
 */
function getLatestLayoutComponentNode(
  componentNode: ComponentNodeType,
  point: Coordinate,
): ComponentNodeType | undefined {
  const layoutMap = engine.componentNode.getAll().reduce((result, current) => {
    if (
      (current.show ?? true) &&
      current.category === "layout" && // layout类组件
      current.id !== componentNode.id && // 不能拖拽到自身（如果自身拖拽组件是layout类型时）
      isInRect(point, engine.componentNode.getCoordinate(current)) // 是否在点击位置内
    ) {
      (result[`${current.level}`] ||= []).push(current);
    }
    return result;
  }, {} as Record<string, ComponentNodeType[]>);
  const values = Object.values(layoutMap);
  const latest = values[values.length - 1];
  return latest?.[latest?.length - 1];
}

/**
 * 处理移动布局相关
 * @param componentNode 当前点击实例
 * @param clickPos 点击坐标
 */
function moveLayout(componentNode: ComponentNodeType, clickPos: Coordinate): void | Unmount {
  // 获取离用户屏幕最近的layout类型组件
  const layoutComponentNode = getLatestLayoutComponentNode(componentNode, {
    x: clickPos.x,
    y: clickPos.y,
  });

  // 如果在layout类型组件上方
  if (layoutComponentNode) {
    const targetPanelId = layoutComponentNode?.currentPanelId;
    // 如果在该layout类型组件的“当前面板”上，则返回
    if (!targetPanelId || engine.componentNode.isInPanel(targetPanelId, componentNode)) {
      return;
    }
    // 如果不在，则询问是否移入
    const panelName = engine.componentNode.getPanelName(targetPanelId) || "目标";
    return ask({
      title: "移入提醒",
      content: `确定放入面板“${panelName}”？`,
      onOk(close) {
        // 选中组件都移入到panelId
        engine.instance.getAllSelected().forEach((instance) => {
          const selectedComponentNode = engine.componentNode.get(instance.id);
          engine.componentNode.insertPanel(targetPanelId, selectedComponentNode);
        });
        // 选中目标layout组件
        engine.instance.select(layoutComponentNode.id, true);
        addHistory(`移入面板 “${panelName}”`);
        close();
      },
    });
  }

  // 如果不在layout类型组件上方，则判断是否之前已经在layout类型组件中，如果在，则询问移出
  const panelId = componentNode.panelId;
  if (panelId) {
    const panelName = engine.componentNode.getPanelName(panelId) || "目标";
    return ask({
      title: "移出提醒",
      content: `是否移出面板“${panelName}”?`,
      onOk(close) {
        // 选中组件都从面板移除
        engine.instance.getAllSelected().forEach((instance) => {
          const selectedComponentNode = engine.componentNode.get(instance.id);
          engine.componentNode.removeFromPanel(selectedComponentNode);
          addHistory(`移出面板 “${panelName}”`);
        });
        close();
      },
    });
  }
}
