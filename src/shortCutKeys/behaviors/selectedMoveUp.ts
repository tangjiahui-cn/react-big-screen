/**
 * 选中实例全部上移1像素
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";

export function selectedMoveUp(e: KeyboardEvent) {
  e.preventDefault();
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        ...componentNode,
        y: (componentNode?.y || 0) - 1,
      });
    }
  });
}
