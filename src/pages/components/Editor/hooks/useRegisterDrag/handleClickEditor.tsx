// 点击编辑器
import { isClickMouseLeft } from "@/utils";
import { addHistory } from "@/packages/shortCutKeys";
import { RbsEngine } from "@/export";

export function handleClickEditor(e: MouseEvent) {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  if (isClickMouseLeft(e) && engine.instance.getAllSelected().length) {
    engine.instance.unselectAll();
    addHistory("取消选中组件");
  }
}
