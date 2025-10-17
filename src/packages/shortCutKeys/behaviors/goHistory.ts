/**
 * 前往指定历史
 *
 * @author tangjiahui
 * @date 2025/3/4
 */
import { RbsEngine } from "@/export";

export function goHistory(stepId: string) {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const { data } = engine.history.go(stepId) || {};
  if (data) {
    // 保持当前menu查看，避免撤销时影响menu切换，导致使用习惯不顺畅
    data.config.currentMenu = engine.config.getConfig().currentMenu;
    engine.instance.unselectAll();
    engine.loadJSON(data as any);
  }
}
