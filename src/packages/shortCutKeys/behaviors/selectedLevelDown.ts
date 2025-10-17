/**
 * 选中实例下移一层
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import { RbsEngine } from "@/export";

export function selectedLevelDown() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const minLevel = engine.componentNode.getMinLevel();
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        level: Math.max(minLevel, (componentNode?.level || 0) - 1),
      });
    }
  });
}
