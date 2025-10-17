/**
 * 反选页面组件
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import { addHistory } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function unSelectAllComponentNodes() {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  if (engine.instance.getAllSelected().length) {
    engine.instance.unselectAll();
    addHistory("取消全选组件");
  }
}
