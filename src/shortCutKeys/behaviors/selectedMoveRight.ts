/**
 * 选中实例全部右移1像素
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";

export function selectedMoveRight(e: KeyboardEvent) {
  e.preventDefault();
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        x: (componentNode?.x || 0) + 1,
      });
    }
  });
}
