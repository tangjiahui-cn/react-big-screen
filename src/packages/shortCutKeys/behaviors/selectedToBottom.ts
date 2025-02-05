/**
 * 选中实例置底
 *
 * @author tangjiahui
 * @date 2025/2/5
 */
import engine from "@/engine";

export function selectedToBottom() {
  const minLevel = engine.componentNode.getMinLevel();
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        level: minLevel,
      });
    }
  });
}
