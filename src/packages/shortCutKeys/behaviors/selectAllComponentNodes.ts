/**
 * 全选页面组件
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import { addHistory } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function selectAllComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  engine.instance.selectAll();
  addHistory("全选组件");
}
