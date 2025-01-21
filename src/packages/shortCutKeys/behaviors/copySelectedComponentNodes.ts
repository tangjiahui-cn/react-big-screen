/**
 * 复制选中实例数据
 *
 * @author tangjiahui
 * @date 2025/1/15
 */
import engine, { ComponentNodeType } from "@/engine";

export function copySelectedComponentNodes() {
  // 新的数据节点
  const newComponentNodes = engine.instance.getAllSelected().reduce((list, current) => {
    const componentNode = engine.componentNode.get(current.id);
    if (componentNode) {
      const newComponentNode = engine.componentNode.createFromComponentNode(componentNode, {
        x: componentNode.x + 10,
        y: componentNode.y + 10,
      });
      list.push(newComponentNode);
    }
    return list;
  }, [] as ComponentNodeType[]);

  // 添加到componentNode中
  engine.componentNode.add(newComponentNodes);

  setTimeout(() => {
    // 选中新实例
    engine.instance.select(
      newComponentNodes.map((x) => x.id),
      true,
    );
  });
}
