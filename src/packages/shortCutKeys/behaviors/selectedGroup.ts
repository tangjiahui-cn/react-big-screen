/**
 * 选中实例成组
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { ComponentNodeType } from "@/engine";
import { RbsEngine } from "@/export";

// 【成组逻辑】
// 1. 如果里面都是独立组件，则新建一个group。
// 2. 如果里面存在其他group组件，则从其他group中移除相关组件，再合并所有选中组件建立一个新的group。
export function selectedGroup() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const allSelectedInstances = engine.instance.getAllSelected();
  // 仅2个及以上的组件才可以成组
  if (allSelectedInstances.length < 2) {
    return;
  }
  // 从其他group中移除关联
  const componentNodes: ComponentNodeType[] = allSelectedInstances.map((instance) => {
    const componentNode: ComponentNodeType = instance.getComponentNode();
    if (componentNode.groupId) {
      engine.componentNode.unlinkFromGroup(componentNode.groupId, componentNode.id);
      componentNode.groupId = undefined;
    }
    return componentNode;
  });

  // 建立新的group
  engine.componentNode.createGroup(componentNodes);
}
