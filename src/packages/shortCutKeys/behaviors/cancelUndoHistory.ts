/**
 * 取消撤销历史
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import engine from "@/engine";

export function cancelUndoHistory() {
  const { data } = engine.history.goForward() || {};
  if (data) {
    // 保持当前menu查看，避免撤销时影响menu切换，导致使用习惯不顺畅
    data.config.currentMenu = engine.config.getConfig().currentMenu;
    engine.loadJSON(data as any);
  }
}
