/**
 * 反选页面组件
 *
 * @author tangjiahui
 * @date 2025/1/16
 */
import engine from "@/engine";
import { addHistory } from "@/packages/shortCutKeys";

export function unSelectAllComponentNodes() {
  if (engine.instance.getAllSelected().length) {
    engine.instance.unselectAll();
    addHistory("取消全选组件");
  }
}
