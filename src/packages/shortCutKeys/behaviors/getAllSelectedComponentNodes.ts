/**
 * 获取所有选中组件
 *
 * @author tangjiahui
 * @date 2025/2/2/22
 */
import engine, { ComponentNodeType } from "@/engine";
import { getAllChildrenComponentNodes } from ".";

export function getAllSelectedComponentNodes(): ComponentNodeType[] {
  const allInstances = engine.instance.getAllSelected();
  return getAllChildrenComponentNodes(allInstances.map((ins) => ins.id));
}
