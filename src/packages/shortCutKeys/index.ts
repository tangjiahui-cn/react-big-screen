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
  copySelectedComponentNodes,
  saveLocal,
  unSelectAllComponentNodes,
} from "./behaviors";
import { undoHistory } from "@/packages/shortCutKeys/behaviors/undoHistory";
import { cancelUndoHistory } from "@/packages/shortCutKeys/behaviors/cancelUndoHistory";

export * from "./behaviors";

/**
 * 判断某些key是否按下
 */
export function isKeyPressed(
  key: "command" | "ctrl" | "shift" | "alt" | "option" | "control" | "cmd",
): boolean {
  return hotkeys[key];
}

/**
 * useShortCutKeys
 * @description 注册全局快捷键 hook
 */
export function useGlobalShortCutKeys() {
  useShortCutKeys({
    backspace: () => {
      deleteSelectedComponentNodes();
    },
    delete: () => {
      deleteSelectedComponentNodes();
    },
    "Shift + A": () => {
      selectAllComponentNodes();
    },
    left: (e) => {
      e.preventDefault();
      selectedMoveLeft();
    },
    right: (e) => {
      e.preventDefault();
      selectedMoveRight();
    },
    up: (e) => {
      e.preventDefault();
      selectedMoveUp();
    },
    down: (e) => {
      e.preventDefault();
      selectedMoveDown();
    },
    "Shift + C": () => copySelectedComponentNodes(),
    "Shift + S": () => saveLocal(),
    "Shift + R": () => unSelectAllComponentNodes(),
    "Shift + Z": () => undoHistory(),
    "Shift + Command + Z": () => cancelUndoHistory(),
    "Shift + Ctrl + Z": () => cancelUndoHistory(),
  });
}
