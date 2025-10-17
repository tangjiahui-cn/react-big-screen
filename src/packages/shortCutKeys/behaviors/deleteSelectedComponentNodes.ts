/**
 * 删除选中数据
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { addHistory, getAllSelectedComponentNodes } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function deleteSelectedComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  engine.componentNode.delete(getAllSelectedComponentNodes());
  addHistory("删除选中组件");
}
