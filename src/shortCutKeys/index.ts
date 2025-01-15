/**
 * 快捷键
 *
 * @author tangjiahui
 * @date 2025/1/9
 */
import hotkeys from "hotkeys-js";
import { useShortCutKeys } from "./hooks";
import {
  deleteSelectedComponentNodes,
  selectAllComponentNodes,
  selectedMoveLeft,
  selectedMoveRight,
  selectedMoveUp,
  selectedMoveDown,
} from "./behaviors";

/**
 * 判断某些key是否按下
 */
export function isKeyPressed(key: "command" | "ctrl" | "shift"): boolean {
  return hotkeys[key];
}

/**
 * useShortCutKeys
 * @description 注册全局快捷键 hook
 */
export function useGlobalShortCutKeys() {
  useShortCutKeys({
    backspace: deleteSelectedComponentNodes,
    delete: deleteSelectedComponentNodes,
    "Shift + A": selectAllComponentNodes,
    left: selectedMoveLeft,
    right: selectedMoveRight,
    up: selectedMoveUp,
    down: selectedMoveDown,
  });
}
