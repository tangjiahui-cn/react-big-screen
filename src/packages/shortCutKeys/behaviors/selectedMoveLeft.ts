/**
 * 选中实例全部左移1像素
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { addHistory } from "@/packages/shortCutKeys";
import { ComponentNodeType, RbsEngine } from "@/export";

export function selectedMoveLeft() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;

  const updated: (ComponentNodeType | undefined)[] = [];

  engine.instance.getAllSelected().forEach((instance) => {
    const componentNode = engine.componentNode.get(instance.id);
    if (componentNode) {
      updated.push(
        engine.componentNode.update(
          instance.id,
          {
            x: (componentNode?.x || 0) - 1,
          },
          {
            silent: true,
          },
        ),
      );
    }
  });

  engine.componentNode.notifyChange(updated.filter(Boolean) as ComponentNodeType[]);
  addHistory("组件左移");
}
