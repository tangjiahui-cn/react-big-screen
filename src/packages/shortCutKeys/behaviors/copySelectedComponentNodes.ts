/**
 * 复制选中实例数据
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import engine from "@/engine";
import { getAllSelectedComponentNodes } from ".";

export function copySelectedComponentNodes() {
  const allSelectedComponentNodes = getAllSelectedComponentNodes(); // 所有选中组件
  const selectedInstanceIds = new Set(engine.instance.getAllSelected().map((ins) => ins.id));
  const newSelectedIds: string[] = []; // 复制后选中的组件

  // 克隆组件
  const clonedComponentNodes = engine.componentNode.cloneComponentNodes(allSelectedComponentNodes, {
    onClone(old, cloned) {
      // 收集选中组件id
      if (selectedInstanceIds.has(old.id)) {
        selectedInstanceIds.delete(old.id);
        newSelectedIds.push(cloned.id);
      }
      // 复制后自动增加位移
      cloned.x += 10;
      cloned.y += 10;
    },
  });

  // 添加到componentNode中
  engine.componentNode.add(clonedComponentNodes);

  // 选中新复制的实例
  setTimeout(() => {
    engine.instance.select(newSelectedIds, true);
  });
}
