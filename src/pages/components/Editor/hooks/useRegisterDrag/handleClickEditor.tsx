// 点击编辑器
import { isClickMouseLeft } from "@/utils";
import engine from "@/engine";
import { addHistory } from "@/packages/shortCutKeys";

export function handleClickEditor(e: MouseEvent) {
  if (isClickMouseLeft(e) && engine.instance.getAllSelected().length) {
    engine.instance.unselectAll();
    addHistory("取消选中组件");
  }
}
