/**
 * 删除选中数据
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";
import { addHistory, getAllSelectedComponentNodes } from "@/packages/shortCutKeys";

export function deleteSelectedComponentNodes() {
  engine.componentNode.delete(getAllSelectedComponentNodes());
  addHistory("删除选中组件");
}
