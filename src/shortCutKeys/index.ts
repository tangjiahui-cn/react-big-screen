/**
 * 快捷键
 *
 * @author tangjiahui
 * @date 2025/1/9
 * @description
 * - 全选实例：Shift + A
 * - 删除实例：BackSpace
 * - 持续拖拽：按住 Space空格
 * - 按住多选：按住 Ctrl
 */
import hotkeys from "hotkeys-js";
import engine from "@/engine";
import { useShortCutKeys } from "./hooks";

// 删除选中数据
function deleteSelectedComponentNodes() {
  const selectedInstanceIds: string[] = engine.instance
    .getAllSelected()
    .map((instance) => instance.id);
  engine.componentNode.delete(selectedInstanceIds);
}

// 全选页面组件
function selectAllComponentNodes() {
  engine.instance.selectAll();
}

/**
 * 判断某些key是否按下
 */
export function isKeyPressed(key: "command" | "ctrl"): boolean {
  return hotkeys[key];
}

/**
 * useShortCutKeys
 * @description 注册全局快捷键 hook
 */
export function useGlobalShortCutKeys() {
  useShortCutKeys({
    backspace: deleteSelectedComponentNodes,
    "Shift + A": selectAllComponentNodes,
  });
}
