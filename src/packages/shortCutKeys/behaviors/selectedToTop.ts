/**
 * 选中实例置顶
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import engine from "@/engine";

export function selectedToTop() {
  const maxLevel = engine.componentNode.getMaxLevel();
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        level: maxLevel,
      });
    }
  });
}
