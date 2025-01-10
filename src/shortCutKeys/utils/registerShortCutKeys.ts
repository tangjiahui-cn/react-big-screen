import hotkeys from "hotkeys-js";

/**
 * 注册一系列快捷键执行函数
 * @param shortCutKeysMap 快捷键映射 keys => () => void
 */
export type RegisterShortCutKeysMap = Record<string, () => void>;
export function registerShortCutKeys(shortCutKeysMap: RegisterShortCutKeysMap): () => void {
  const unmountList: (() => void)[] = [];
  Object.entries(shortCutKeysMap).forEach(([key, value]) => {
    hotkeys(key, value);
    unmountList.push(() => hotkeys.unbind(key, value));
  });
  return () => unmountList.forEach((cb) => cb());
}
