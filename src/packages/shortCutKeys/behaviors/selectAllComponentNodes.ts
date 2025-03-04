/**
 * 全选页面组件
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import engine from "@/engine";
import { addHistory } from "@/packages/shortCutKeys";

export function selectAllComponentNodes() {
  engine.instance.selectAll();
  addHistory("全选组件");
}
