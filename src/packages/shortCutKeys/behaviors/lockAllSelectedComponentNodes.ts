/**
 * 锁定所有选中componentNodes
 *
 * @author tangjiahui
 * @date 2025/1/20
 */
import { RbsEngine } from "@/export";

export function lockAllSelectedComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const allSelectedInstances = engine.instance.getAllSelected();
  allSelectedInstances.forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        lock: true,
      });
    }
  });
  engine.instance.unselectAll();
}
