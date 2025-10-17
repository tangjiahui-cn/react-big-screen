/**
 * 获取所有选中组件
 *
 * @author tangjiahui
 * @date 2025/2/2/22
 */
import { ComponentNodeType } from "@/engine";
import { getAllChildrenComponentNodes } from ".";
import { RbsEngine } from "@/export";

export function getAllSelectedComponentNodes(): ComponentNodeType[] {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return [];
  const allInstances = engine.instance.getAllSelected();
  return getAllChildrenComponentNodes(allInstances.map((ins) => ins.id));
}
