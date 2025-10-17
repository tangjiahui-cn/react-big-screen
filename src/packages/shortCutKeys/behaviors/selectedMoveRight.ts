/**
 * 选中实例全部右移1像素
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { addHistory } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function selectedMoveRight() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      engine.componentNode.update(instance.id, {
        x: (componentNode?.x || 0) + 1,
      });
    }
  });
  addHistory("组件右移动");
}
