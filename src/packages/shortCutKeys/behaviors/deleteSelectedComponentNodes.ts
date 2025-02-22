/**
 * 删除选中数据
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";
import { getAllSelectedComponentNodes } from "@/packages/shortCutKeys";

export function deleteSelectedComponentNodes() {
  engine.componentNode.delete(getAllSelectedComponentNodes());
}
