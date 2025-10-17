/**
 * 获取所有子组件
 *
 * @author tangjiahui
 * @date 2025/2/2/22
 */
import { ComponentNodeType } from "@/engine";
import { RbsEngine } from "@/export";

type ComponentNodeMap = Record<string, ComponentNodeType>;
export function getAllChildrenComponentNodes(
  id: string | ComponentNodeType | (string | ComponentNodeType)[],
): ComponentNodeType[] {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return [];
  const list = Array.isArray(id) ? id : [id];
  return Object.values(
    list.reduce((dataMap: ComponentNodeMap, id: string | ComponentNodeType) => {
      const componentNode = engine.componentNode.get(id);
      if (componentNode) {
        dataMap[componentNode.id] = componentNode;
        // 如果是面板组件
        if (componentNode?.panels?.length) {
          engine.componentNode.getPanelComponentNodes(componentNode, true).forEach((child) => {
            dataMap[child.id] = child;
          });
        }
      }
      return dataMap;
    }, {} as ComponentNodeMap),
  );
}
