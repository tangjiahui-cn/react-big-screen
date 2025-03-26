/**
 * 放大编辑器比例
 *
 * @author tangjiahui
 * @date 2025/3/26
 */
import engine from "@/engine";

export function zoomEditorLarger() {
  const config = engine.config.getConfig();
  const scale = config.scale;
  if (scale >= config.scaleMaxZoom) {
    return;
  }
  engine.config.setConfig({
    scale: Math.min(config.scaleMaxZoom, scale + config.scaleStep),
  });
}
