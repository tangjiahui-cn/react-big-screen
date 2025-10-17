/**
 * 点击 componentNode
 *
 * @author tangjiahui
 * @date 2025/3/12
 */
import { ComponentNodeType } from "@/engine";
import { isClickMouseLeft, isClickMouseRight } from "@/utils";
import { addHistory, isKeyPressed } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function handleClickComponentNode(componentNode: ComponentNodeType, e: MouseEvent) {
  // 点击鼠标左键
  const isClickLeft = isClickMouseLeft(e);
  // 按住shift
  const isPressedShift = isKeyPressed("shift");
  const engine = RbsEngine.getActiveEngine();
  if (!engine) {
    return;
  }

  // 锁定状态下，不可单独选中
  if (componentNode.lock && isClickLeft && !isPressedShift) {
    return;
  }

  e.stopPropagation();

  // 点击鼠标右键
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
      : [componentNode.id];

    // 是否按住多选键（按住多选，则cover为true，不会取消选中其他实例）
    engine.instance.select(selectedIds, !isPressedShift);
    addHistory("选中组件");
  }
}
