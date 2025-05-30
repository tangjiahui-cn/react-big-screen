/**
 * 解锁所有选中componentNodes
 *
 * @author tangjiahui
 * @date 2025/1/20
 */
import engine from "@/engine";

export function unlockAllSelectedComponentNodes() {
  const allSelectedInstances = engine.instance.getAllSelected();
  allSelectedInstances.forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        lock: false,
      });
    }
  });
}
