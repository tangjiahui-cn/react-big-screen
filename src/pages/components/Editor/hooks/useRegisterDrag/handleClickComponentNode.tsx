// 点击 componentNode
import engine, { InstanceType } from "@/engine";
import { message } from "antd";
import { isClickMouseLeft, isClickMouseRight } from "@/utils";
import { addHistory, isKeyPressed } from "@/packages/shortCutKeys";

export function handleClickComponentNode(instance: InstanceType, e: MouseEvent) {
  const componentNode = instance?.getComponentNode?.();
  if (!componentNode) {
    message.error("componentNode not found!");
    return;
  }

  const isClickLeft = isClickMouseLeft(e);
  const isPressedShift = isKeyPressed("shift");
  // 锁定状态下，不可单独选中
  if (componentNode.lock && isClickLeft && !isPressedShift) {
    return;
  }
  e.stopPropagation();
  const isClickRight = isClickMouseRight(e);
  // 点击左键或右键，可选中当前组件
  if (isClickLeft || isClickRight) {
    // 当前组件已选中
    if (engine.instance.isSelected(componentNode.id)) {
      // 如果按住 shift 则取消选中
      if (isPressedShift) {
        engine.instance.unselect(componentNode.id);
      }
      return;
    }
    // 待选中组件实例ids
    const selectedIds: string[] = componentNode.groupId
      ? engine.componentNode.getGroupComponentNodeIds(componentNode.groupId)
      : [instance.id];

    // 是否按住多选键（按住多选，则cover为true，不会取消选中其他实例）
    engine.instance.select(selectedIds, !isPressedShift);
    addHistory("选中组件");
  }
}
