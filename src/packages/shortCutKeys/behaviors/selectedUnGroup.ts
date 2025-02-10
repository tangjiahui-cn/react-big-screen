/**
 * 选中实例取消成组
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import engine from "@/engine";

export function selectedUnGroup() {
  // 取消选中元素所在的group
  const allSelectedInstances = engine.instance.getAllSelected();
  const groupIds: string[] = Array.from(
    allSelectedInstances.reduce((resultSet, instance) => {
      const componentNode = instance.getComponentNode();
      if (componentNode.groupId) resultSet.add(componentNode.groupId);
      return resultSet;
    }, new Set<string>()),
  );
  // 解散选中元素的group
  engine.componentNode.unlinkGroup(groupIds);
  engine.instance.unselectAll();
}
