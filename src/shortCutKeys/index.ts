/**
 * 快捷键
 *
 * @author tangjiahui
 * @date 2025/1/9
 * @description
 * - 全选：Command + A
 * - 复制：Command + C
 * - 粘贴：Command + V
 * - 删除：BackSpace
 * - 持续拖拽：按住空格
 */
import hotkeys from "hotkeys-js";
import engine from "@/engine";
import { useEffect } from "react";

// 删除选中数据
function deleteSelectedComponentNodes() {
  const selectedInstanceIds: string[] = engine.instance.getAllSelectedInstanceIds();
  engine.componentNode.delComponentNodes(selectedInstanceIds);
}

// 全选页面组件
function selectAllComponentNodes() {
  engine.instance.selectedAllInstance();
}

/**
 * 注册一系列快捷键执行函数
 * @param shortCutKeysMap 快捷键映射 keys => () => void
 */
function registerShortCutKeys(shortCutKeysMap: Record<string, () => void>): () => void {
  const unmountList: (() => void)[] = [];
  Object.entries(shortCutKeysMap).forEach(([key, value]) => {
    hotkeys(key, value);
    unmountList.push(() => hotkeys.unbind(key, value));
  });
  return () => unmountList.forEach((cb) => cb());
}

/**
 * 判断某些key是否按下
 */
export function isKeyPressed(key: "command"): boolean {
  return hotkeys[key];
}

/**
 * useShortCutKeys
 * @description 注册快捷键 hook
 */
export function useShortCutKeys() {
  useEffect(() => {
    return registerShortCutKeys({
      backspace: deleteSelectedComponentNodes,
      "shift + A": selectAllComponentNodes,
    });
  }, []);
}
