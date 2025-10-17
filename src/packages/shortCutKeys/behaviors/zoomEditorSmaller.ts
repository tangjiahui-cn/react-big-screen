/**
 * 缩小编辑器比例
 *
 * @author tangjiahui
 * @date 2025/3/26
 */
import { RbsEngine } from "@/export";

export function zoomEditorSmaller(times: number = 1) {
  const engine = RbsEngine.getActiveEngine();
  if (!engine) return;
  const config = engine.config.getConfig();
  const scale = config.scale;
  if (scale <= config.scaleMinZoom) {
    return;
  }
  engine.config.setConfig({
    scale: parseFloat(Math.max(config.scaleMinZoom, scale - config.scaleStep * times).toFixed(2)),
  });
}
